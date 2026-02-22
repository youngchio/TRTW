from playwright.sync_api import sync_playwright, expect
import http.server
import socketserver
import threading
import time
import os

PORT = 8002

class Handler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

def run_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

def verify():
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    time.sleep(2)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto(f"http://localhost:{PORT}/index1.html")

            # Wait for app to load
            page.wait_for_function("window.appLoaded === true", timeout=20000)

            # Check for key elements
            expect(page.locator("h1")).to_contain_text("계획은 가볍게")

            # Take screenshot
            page.screenshot(path="verification/final_frontend_check.png")
            print("Screenshot saved to verification/final_frontend_check.png")

        except Exception as e:
            print(f"Verification failed: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify()
