# Who Unfollowed

**Who Unfollowed** is a privacy-focused, lightweight Chrome Extension designed to help you analyze your Instagram connection loops. It automates the process of scanning your followers and following lists locally in your browser to instantly identify accounts that do not follow you back.

To bypass aggressive platform security systems, the extension utilizes an anti-rate-limit scrolling engine that mimics human behavior with variable pacing and cooldown breaks.

---

## Features

### Automated Sync Engine

Hands-free scrolling and data aggregation for both Followers and Following lists.

### Anti-Action-Block Pacing

Implements humanized variable delays (1.5s–3.5s) and automatic cooling breaks to help prevent temporary platform blocks.

### Real-Time Progress Tracking

Dynamically transforms the action button into an active progress bar indicating the exact execution step.

### Local & Secure

No passwords required. All data processing occurs entirely within your local browser sandbox; no tracking data is sent to external servers.

### Sleek Dark Mode HUD

Delivers a modern, native-feeling dark user interface summary layout complete with direct profile hyperlink lookups.

---

## Repository Structure

```text
├── manifest.json      # Extension metadata, rules, and entry points
├── content.js         # Core automation engine, logic, and UI rendering code
└── icon.svg           # Extension icon
```

---

## Manual Installation (Developer Mode)

Until the extension is officially published, you can install and run it locally.

### 1. Download the Code

Clone this repository or download the project files as a ZIP archive and extract them into a local folder.

### 2. Open Extensions Page

Open Google Chrome and navigate to:

```text
chrome://extensions/
```

### 3. Enable Developer Mode

Locate the **Developer mode** toggle in the upper-right corner and enable it.

### 4. Load the Project

Click **Load unpacked**.

### 5. Select Folder

Choose the folder containing:

* `manifest.json`
* `content.js`
* `icon.svg`

### 6. Verify Installation

The extension should now appear in your Chrome extensions list and be ready to use.

---

## How to Use

1. Open Google Chrome and navigate to your Instagram profile.
2. Locate the floating **Find Who Unfollowed** button.
3. Click the button to start the scan.
4. Wait while the extension scans your followers and following lists.

> **Important:** Do not close the tab, switch tabs, or interact with the page while the scan is running.

5. Once completed, a summary overlay will display:

   * Total Followers
   * Total Following
   * Accounts That Don't Follow You Back

---

## Privacy & Security

Who Unfollowed respects your privacy.

* No password collection or storage.
* Uses only your active Instagram session.
* No third-party network requests.
* All processing occurs locally in your browser.
* No account data is transmitted to external servers.

---

## Disclaimer

### Independent Project

This extension is an independent developer project and is not affiliated with, authorized, maintained, sponsored, or endorsed by Instagram, Meta Platforms, Inc., or any of their affiliates.

### Usage Notice

Use this tool responsibly. Excessive automation may conflict with Instagram's Terms of Service and could trigger temporary rate limits or action blocks. The built-in pacing system helps reduce this risk, but users assume responsibility for how the extension is used.

---

## License

Distributed under the MIT License.

See the `LICENSE` file for more information.
