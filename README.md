# InstaAudit Pro

**InstaAudit Pro** is a privacy-focused, lightweight Chrome Extension designed to help you analyze your Instagram connection loops. It automates the process of scanning your followers and following lists locally in your browser to instantly identify accounts that do not follow you back. 

To bypass aggressive platform security systems, the extension utilizes an anti-rate-limit scrolling engine that mimics human behavior with variable pacing and cooldown breaks.

---

## Features

* **Automated Sync Engine:** Hands-free scrolling and data aggregation for both Followers and Following lists.
* **Anti-Action-Block Pacing:** Implements humanized variable delays (1.5s–3.5s) and automatic cooling breaks to prevent temporary platform blocks.
* **Real-Time Progress Tracking:** Dynamically transforms the action button into an active progress bar indicating the exact execution step.
* **Local & Secure:** No passwords required. All data processing occurs entirely within your local browser sandbox; no tracking data is sent to external servers.
* **Sleek Dark Mode HUD:** Delivers a modern, native-feeling dark user interface summary layout complete with direct profile hyperlink lookups.

---

## Repository Structure

Your project directory should look like this:

```text
├── manifest.json      # Extension metadata, rules, and entry points
├── content.js         # Core automation engine, logic, and UI rendering code
└── icon.svg           # Store-safe profile tracking brand vector icon

Manual Installation (Developer Mode)
Until the extension is published officially to the Chrome Web Store, anyone can install and run it locally by following these steps:

Download the Code: Clone this repository or download the project files as a .zip archive and extract them into a local folder.

Open Extensions Page: Open Google Chrome and navigate to chrome://extensions/ by typing it directly into the address bar.

Enable Developer Mode: Locate the Developer mode toggle switch in the upper right-hand corner of the page and turn it ON.

Load the Project: Click the Load unpacked button in the top-left corner.

Select Folder: Select the main folder containing your manifest.json, content.js, and icon.svg files.

Verify: You will now see InstaAudit Pro active in your extensions list with its custom brand icon!

How To Use It
Open Google Chrome and navigate to your Instagram profile page (e.g., https://www.instagram.com/your_username/).

Look at the bottom-right corner of your viewport—you will see a sleek, transparent floating action button labeled Find who unfollowed.

Click the button to launch the audit script.

Important: The button will transition into a progress bar (e.g., [1/4] Scanning Followers...). Do not click anywhere on the page, change tabs, or close the browser window while the audit runs.

Once complete, the automated screens will close, and a premium dark summary layout overlay will pop up displaying your metrics and a clean list of all accounts not following you back.

Privacy & Data Security
InstaAudit Pro respects your privacy:

It does not require or store your account password.

It operates strictly on the active tab utilizing your current login session cookies.

It does not make any third-party network requests. All list cross-referencing happens directly inside your active browser runtime environment.

Disclaimer
Legal Disclaimer: This extension is an independent developer project and is not affiliated with, authorized, maintained, sponsored, or endorsed by Instagram, Meta Platforms, Inc., or any of its affiliates or subsidiaries.

Usage Note: Use this tool responsibly. Scraping or automating web actions at excessive speeds can conflict with Instagram's Terms of Service and trigger temporary profile rate limits (action blocks). The built-in protection logic significantly reduces this risk, but users assume all responsibility for its operational implementation.

License
Distributed under the MIT License. See LICENSE for more information.
