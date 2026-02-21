import React from 'react';
import { Home, Map, Zap, User } from 'lucide-react';

const App = () => {
  const curations = [
    {
      id: 1,
      title: "스린 야시장 먹거리 정복",
      image: "https://images.unsplash.com/photo-1570114185621-218bb40714b2?auto=format&fit=crop&q=80&w=400",
      tag: "예산 약 4만원",
      rating: "4.9",
      reviews: "1.2k"
    },
    {
      id: 2,
      title: "시먼딩 미식 투어",
      image: "https://images.unsplash.com/photo-1552055651-140dec35505e?auto=format&fit=crop&q=80&w=400",
      tag: "현지인 픽",
      rating: "4.7",
      reviews: "850"
    },
    {
      id: 3,
      title: "베이터우 힐링 로드",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400",
      tag: "근교 여행",
      rating: "5.0",
      reviews: "2k+"
    },
    {
      id: 4,
      title: "단수이 일몰 산책",
      image: "https://images.unsplash.com/photo-1563245332-69073708f27a?auto=format&fit=crop&q=80&w=400",
      tag: "연인 추천",
      rating: "4.8",
      reviews: "950"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1508444845599-13d942a00bd3?q=80&w=1200&auto=format&fit=crop"
            alt="Taipei Night View"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-2xl">
            계획은 가볍게,<br /> 타이베이는 깊게
          </h1>
          <p className="mt-4 text-white/90 text-lg md:text-xl font-medium">
            스마트하게 즐기는 타이베이 여행
          </p>
        </div>
      </section>

      {/* Real-time Popular Curation Section */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-slate-900">
            실시간 인기 큐레이션
          </h2>
          <button className="text-sm font-semibold text-blue-600">전체보기</button>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x snap-mandatory">
          {curations.map((item) => (
            <div
              key={item.id}
              className="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 snap-start"
            >
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                  {item.tag}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="flex items-center text-amber-400">
                    <Zap className="w-3 h-3 fill-current" />
                  </span>
                  <span className="text-sm font-bold">{item.rating}</span>
                  <span className="text-xs text-slate-400">({item.reviews})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Another Section for filler */}
      <section className="px-4 max-w-7xl mx-auto mt-6">
        <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">여행 예산 고민 끝!</h3>
            <p className="text-slate-400">AI가 제안하는 최적의 동선과 실시간 지출 관리</p>
          </div>
          <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform whitespace-nowrap">
            지금 시작하기
          </button>
        </div>
      </section>

      {/* Sticky GNB */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 px-6 py-3 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex flex-col items-center gap-1 text-blue-600">
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">홈</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-slate-400">
            <Map className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">코스</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-slate-400">
            <Zap className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">나우</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-slate-400">
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase">마이트립</span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default App;
