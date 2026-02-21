// --- TAILWIND CONFIG ---
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        darkMode: "class",
        theme: {
            extend: {
                colors: {
                    "primary": "#13c8ec",
                    "background-light": "#f6f8f8",
                    "background-dark": "#101f22",
                },
                fontFamily: {
                    "sans": ["Noto Sans KR", "Plus Jakarta Sans", "sans-serif"],
                    "display": ["Noto Sans KR", "Plus Jakarta Sans", "sans-serif"]
                },
                borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
            },
        },
    }
}

// --- STATE MANAGEMENT ---
let tripItems = [
    { id: 1, time: '11:30 - 12:30', title: '공항 픽업 및 호텔 체크인', location: '그랜드 하얏트 타이베이', price: 0, category: 'transport' },
    { id: 2, time: '13:00 - 14:30', title: '딘타이펑 101점 점심 식사', location: '딘타이펑 101', price: 850, category: 'food' },
    { id: 3, time: '15:00 - 16:30', title: '타이베이 101 전망대', location: '타이베이 101', price: 600, category: 'culture' }
];
const exchangeRate = 42.5;
const budgetLimit = 10000; // TWD

// --- DOM ELEMENTS ---
const itineraryList = document.getElementById('itinerary-list');
const totalTwdEl = document.getElementById('total-twd');
const totalKrwEl = document.getElementById('total-krw');
const barFood = document.getElementById('bar-food');
const barTransport = document.getElementById('bar-transport');
const barOther = document.getElementById('bar-other');
const totalBudgetDisplay = document.getElementById('total-budget-display');
const budgetProgressBar = document.getElementById('budget-progress-bar');
const budgetPercentText = document.getElementById('budget-percent-text');
const nextDestinationText = document.getElementById('next-destination-text');

// --- FUNCTIONS ---
function renderItinerary() {
    if (!itineraryList) return;
    itineraryList.innerHTML = '';
    tripItems.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'relative pl-8 transition-all duration-300';
        div.innerHTML = `
            <div class="absolute left-0 top-0 w-6 h-6 ${index === 0 ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'} rounded-full flex items-center justify-center text-white text-[10px] font-bold z-10">${index + 1}</div>
            ${index < tripItems.length - 1 ? '<div class="absolute left-3 top-6 bottom-[-24px] w-0.5 border-l-2 border-dashed border-slate-200 dark:border-slate-800"></div>' : ''}
            <div class="bg-white dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-colors group relative">
                <button class="absolute -right-2 -top-2 size-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg delete-item-btn">
                    <span class="material-symbols-outlined text-xs">close</span>
                </button>
                <div class="flex justify-between mb-1">
                    <span class="text-[10px] font-bold text-primary uppercase">${item.time}</span>
                    <span class="material-symbols-outlined text-slate-400 text-sm">drag_indicator</span>
                </div>
                <h4 class="text-sm font-bold item-title"></h4>
                <p class="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <span class="material-symbols-outlined text-[14px]">map</span> <span class="item-location"></span>
                </p>
                ${item.price > 0 ? `<div class="mt-2 text-[10px] font-bold text-slate-400">비용: <span class="item-price"></span> TWD</div>` : ''}
            </div>
        `;
        div.querySelector('.item-title').textContent = item.title;
        div.querySelector('.item-location').textContent = item.location;
        if (item.price > 0) div.querySelector('.item-price').textContent = item.price.toLocaleString();
        div.querySelector('.delete-item-btn').onclick = () => deleteItem(item.id);

        itineraryList.appendChild(div);
    });
    updateBudget();
}

function updateBudget() {
    const totalTwd = tripItems.reduce((sum, i) => sum + i.price, 0);
    const totalKrw = Math.round(totalTwd * exchangeRate);

    if (totalTwdEl) totalTwdEl.textContent = totalTwd.toLocaleString();
    if (totalKrwEl) totalKrwEl.textContent = totalKrw.toLocaleString();
    if (totalBudgetDisplay) totalBudgetDisplay.textContent = '₩' + totalKrw.toLocaleString();

    const foodTwd = tripItems.filter(i => i.category === 'food').reduce((s, i) => s + i.price, 0);
    const transportTwd = tripItems.filter(i => i.category === 'transport').reduce((s, i) => s + i.price, 0);
    const otherTwd = tripItems.filter(i => !['food', 'transport'].includes(i.category)).reduce((s, i) => s + i.price, 0);

    if (barFood) barFood.style.width = Math.min((foodTwd / (totalTwd || 1)) * 100, 100) + '%';
    if (barTransport) barTransport.style.width = Math.min((transportTwd / (totalTwd || 1)) * 100, 100) + '%';
    if (barOther) barOther.style.width = Math.min((otherTwd / (totalTwd || 1)) * 100, 100) + '%';

    const percent = Math.min((totalTwd / budgetLimit) * 100, 100);
    if (budgetProgressBar) budgetProgressBar.style.width = percent + '%';
    if (budgetPercentText) budgetPercentText.textContent = Math.round(percent) + '% 사용됨';

    if (tripItems.length > 0 && nextDestinationText) {
        nextDestinationText.textContent = tripItems[tripItems.length - 1].title;
    }
}

window.deleteItem = (id) => {
    tripItems = tripItems.filter(i => i.id !== id);
    renderItinerary();
};

// --- EVENT LISTENERS & LOGIC ---
const safeAddEventListener = (id, event, callback) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, callback);
};

document.addEventListener('DOMContentLoaded', () => {
    safeAddEventListener('add-place-btn', 'click', () => {
        const title = prompt('추가할 장소 이름을 입력하세요:');
        if (title) {
            const price = parseInt(prompt('예상 비용(TWD)을 입력하세요:', '0')) || 0;
            tripItems.push({
                id: Date.now(),
                time: '18:00 - 19:30',
                title: title,
                location: '타이베이 시내',
                price: price,
                category: price > 500 ? 'food' : 'shopping'
            });
            renderItinerary();
        }
    });

    const slider = document.getElementById('event-slider');
    const sliderNext = document.getElementById('slider-next');
    const sliderPrev = document.getElementById('slider-prev');
    if (slider) {
        if (sliderNext) sliderNext.onclick = () => slider.scrollBy({ left: 400, behavior: 'smooth' });
        if (sliderPrev) sliderPrev.onclick = () => slider.scrollBy({ left: -400, behavior: 'smooth' });
    }

    safeAddEventListener('global-search', 'input', (e) => {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.curation-card').forEach(card => {
            const title = (card.getAttribute('data-title') || '').toLowerCase();
            card.style.display = title.includes(term) ? 'block' : 'none';
        });
    });

    // ScrollSpy Logic
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
        ['home', 'taipei-now', 'my-trip'].forEach(id => {
            const section = document.getElementById(id);
            if (section && scrollPos >= section.offsetTop - 150) {
                current = id;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary');
            }
        });
    });

    // --- INITIALIZE ---
    if (itineraryList) {
        renderItinerary();
    }
});
