import os
import subprocess
import time
from playwright.sync_api import sync_playwright

def run_server():
    return subprocess.Popen(["python3", "-m", "http.server", "8000"])

def verify_frontend():
    server_process = run_server()
    time.sleep(2)  # Wait for server to start

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page()

            # Go to the page
            page.goto("http://localhost:8000/index1.html")

            # Wait for the app to be visible (it has a transition)
            # isAppVisible becomes true after 1s + 0.5s
            # App fade in takes 0.5s
            print("Waiting for app to load and transition...")
            time.sleep(5)

            # Take a screenshot
            os.makedirs("verification", exist_ok=True)
            screenshot_path = "verification/final_frontend_check_v2.png"
            page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to {screenshot_path}")

            # Check for the title
            title_text = "계획은 가볍게"
            if page.locator(f"text={title_text}").is_visible():
                print(f"SUCCESS: Found title '{title_text}'")
            else:
                print(f"FAILURE: Title '{title_text}' not found")

            # Check if loading screen is gone
            if page.locator("#loading-screen").count() == 0:
                print("SUCCESS: Loading screen removed")
            else:
                print("FAILURE: Loading screen still exists")

            browser.close()
    finally:
        server_process.terminate()

if __name__ == "__main__":
    verify_frontend()
