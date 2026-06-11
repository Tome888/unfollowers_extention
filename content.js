const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const randomRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function simulateHumanClick(element) {
  const target = element.querySelector("span") || element;
  const events = ["pointerdown", "mousedown", "pointerup", "mouseup", "click"];
  events.forEach((eventName) => {
    target.dispatchEvent(
      new PointerEvent(eventName, {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );
  });
}

function updateProgress(stepText, percentage) {
  const button = document.getElementById("custom-extension-btn");
  if (!button) return;

  button.style.pointerEvents = "none";
  button.style.cursor = "wait";
  button.style.backgroundColor = "rgba(28, 28, 30, 0.95)";
  button.style.borderColor = "rgba(255, 255, 255, 0.25)";

  button.innerHTML = `
    <div style="display: flex; flex-direction: column; width: 160px; text-align: left;">
      <span style="font-size: 12px; font-weight: 600; color: #ffffff; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${stepText}</span>
      <div style="width: 100%; height: 4px; background: rgba(255, 255, 255, 0.1); border-radius: 2px; overflow: hidden;">
        <div id="custom-extension-progress-bar" style="width: ${percentage}%; height: 100%; background: #0a84ff; border-radius: 2px; transition: width 0.4s ease;"></div>
      </div>
    </div>
  `;
}

function resetProgressButton() {
  const button = document.getElementById("custom-extension-btn");
  if (!button) return;

  button.style.pointerEvents = "auto";
  button.style.cursor = "pointer";
  button.style.backgroundColor = "rgba(38, 38, 38, 0.75)";
  button.style.borderColor = "rgba(255, 255, 255, 0.15)";

  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; display: inline-block; vertical-align: middle;"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
    <span style="display: inline-block; vertical-align: middle;">Find who unfollowed</span>
  `;
}

async function autoScrollModal(currentStepText, basePercentage, stepWeight) {
  let scrollDiv = document.querySelector(
    ".x6nl9eh.x1a5l9x9.x7vuprf.x1mg3h75.x1lliihq.x1iyjqo2.xs83m0k.xz65tgg.x1rife3k.x1n2onr6",
  );

  if (!scrollDiv) {
    scrollDiv =
      document.querySelector('div[role="dialog"] .xyb0qn5') ||
      document.querySelector('div[role="dialog"] ul')?.parentElement;
  }

  if (!scrollDiv) {
    console.log("Scrollable container layout missing.");
    return;
  }

  console.log("Starting sturdier auto-scroll sequence...");
  let lastHeight = scrollDiv.scrollHeight;
  let noChangeCount = 0;
  let scrollAttempts = 0;
  const MaxPlateauChecks = 24;

  while (noChangeCount < MaxPlateauChecks) {
    scrollAttempts++;

    scrollDiv.scrollTop = scrollDiv.scrollHeight;

    const scrollProgress = Math.min(
      95,
      (noChangeCount / MaxPlateauChecks) * 100,
    );
    const dynamicPercentage =
      basePercentage + (scrollProgress / 100) * stepWeight;
    updateProgress(currentStepText, dynamicPercentage);

    await delay(randomRange(1200, 2000));

    if (scrollAttempts % 8 === 0) {
      updateProgress("System cooling...", dynamicPercentage);
      await delay(randomRange(2500, 3500));
    }

    scrollDiv.scrollTop = scrollDiv.scrollHeight - randomRange(100, 180);
    await delay(150);
    scrollDiv.scrollTop = scrollDiv.scrollHeight;

    let currentHeight = scrollDiv.scrollHeight;
    if (currentHeight === lastHeight) {
      noChangeCount++;
    } else {
      noChangeCount = 0;
      lastHeight = currentHeight;
    }
  }
  console.log("Finished scrolling container successfully.");
}

function scrapeUsernames() {
  const links = document.querySelectorAll('div[role="dialog"] a[role="link"]');
  const uniqueNames = new Set();

  links.forEach((el) => {
    const href = el.getAttribute("href");
    if (href && href.split("/").filter(Boolean).length === 1) {
      const clone = el.cloneNode(true);

      const svgs = clone.querySelectorAll("svg");
      svgs.forEach((svg) => svg.remove());

      const name = clone.textContent.trim();
      if (name && !name.includes("\n") && name.length > 0) {
        uniqueNames.add(name);
      }
    }
  });

  if (uniqueNames.size === 0) {
    const items = document.querySelectorAll(
      "span._ap3a._aaco._aacw._aacx._aad7._aade",
    );
    items.forEach((el) => {
      const clone = el.cloneNode(true);

      const svgs = clone.querySelectorAll("svg");
      svgs.forEach((svg) => svg.remove());

      const name = clone.textContent.trim();
      if (name) uniqueNames.add(name);
    });
  }

  return Array.from(uniqueNames);
}

function displayStatsModal(notFollowingBack, totalFollowers, totalFollowing) {
  const existing = document.getElementById("extension-results-modal");
  if (existing) existing.remove();

  const modalContainer = document.createElement("div");
  modalContainer.id = "extension-results-modal";

  Object.assign(modalContainer.style, {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "440px",
    maxHeight: "75vh",
    backgroundColor: "#1c1c1e",
    border: "1px solid #2c2c2e",
    boxShadow: "0px 20px 40px rgba(0,0,0,0.5)",
    borderRadius: "25px",
    zIndex: "9999999",
    padding: "24px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    color: "#ffffff",
  });

  let listItems = notFollowingBack
    .map(
      (name) => `
    <li style="padding: 10px 12px; border-bottom: 1px solid #2c2c2e; display:flex; justify-content:space-between; align-items:center; font-size:14px; border-radius: 8px;">
      <span style="font-weight: 500; color: #f2f2f7;">${name}</span>
      <a href="https://www.instagram.com/${name}/" target="_blank" style="color:#30d158; text-decoration:none; font-weight:600; font-size:12px; background: rgba(48, 209, 88, 0.1); padding: 4px 10px; border-radius: 6px;">Profile</a>
    </li>
  `,
    )
    .join("");

  modalContainer.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; border-bottom:1px solid #2c2c2e; padding-bottom:14px;">
      <div style="display:flex; flex-direction:column;">
        <h3 style="margin:0; font-size:18px; font-weight:700; color:#ffffff;">Audit Complete Summary</h3>
        <span style="font-size:12px; color:#8e8e93; margin-top:2px;">Discrepancy target identification mapping</span>
      </div>
      <button id="close-stats-btn" style="background:none; border:none; font-size:22px; cursor:pointer; color:#8e8e93;">&times;</button>
    </div>

    <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 20px;">
      <div style="background: #2c2c2e; padding: 12px; border-radius: 12px; text-align: center;">
        <div style="font-size: 11px; color: #aaaab0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Followers</div>
        <div style="font-size: 20px; font-weight: 700; margin-top: 4px; color: #0a84ff;">${totalFollowers}</div>
      </div>
      <div style="background: #2c2c2e; padding: 12px; border-radius: 12px; text-align: center;">
        <div style="font-size: 11px; color: #aaaab0; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Following</div>
        <div style="font-size: 20px; font-weight: 700; margin-top: 4px; color: #bf5af2;">${totalFollowing}</div>
      </div>
      <div style="background: rgba(255, 69, 58, 0.15); border: 1px solid rgba(255, 69, 58, 0.2); padding: 12px; border-radius: 12px; text-align: center;">
        <div style="font-size: 11px; color: #ff453a; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Not Following Back</div>
        <div style="font-size: 20px; font-weight: 700; margin-top: 4px; color: #ff453a;">${notFollowingBack.length}</div>
      </div>
    </div>

    <div style="overflow-y:auto; flex-grow:1; padding-right:4px; max-height: 300px;">
      ${
        notFollowingBack.length === 0
          ? '<p style="color:#8e8e93; text-align:center; padding: 20px 0;">Everyone is matching your tracking status properly! 🎉</p>'
          : `<ul style="margin:0; padding:0; list-style:none;">${listItems}</ul>`
      }
    </div>
  `;

  document.body.appendChild(modalContainer);

  const closeBtn = document.getElementById("close-stats-btn");
  closeBtn.addEventListener(
    "mouseenter",
    () => (closeBtn.style.color = "#ffffff"),
  );
  closeBtn.addEventListener(
    "mouseleave",
    () => (closeBtn.style.color = "#8e8e93"),
  );
  closeBtn.addEventListener("click", () => modalContainer.remove());
}

async function startScript() {
  console.log("Starting automated sync operation...");

  updateProgress("[1/4] Opening Followers...", 5);

  const followersTab = Array.from(
    document.querySelectorAll('a[role="link"]'),
  ).find((el) => {
    return el.textContent.includes("followers");
  });

  if (!followersTab) {
    alert(
      "Could not locate the followers button connection point. Are you on the profile page?",
    );
    resetProgressButton();
    return;
  }

  simulateHumanClick(followersTab);
  await delay(3000);

  updateProgress("[1/4] Scanning Followers...", 10);
  await autoScrollModal("[1/4] Scanning Followers...", 10, 35);

  updateProgress("[1/4] Compiling List...", 45);
  const arrNameFollowers = scrapeUsernames();
  console.log(`Successfully scraped ${arrNameFollowers.length} followers.`);

  updateProgress("[2/4] Switching Context...", 48);
  const closeButton =
    document
      .querySelector('button svg[aria-label="Close"]')
      ?.closest("button") ||
    document.querySelector('div[role="dialog"] button');
  if (closeButton) {
    simulateHumanClick(closeButton);
    await delay(2000);
  } else {
    const overlay = document.querySelector(
      'div[role="presentation"] .x1cy8zhl',
    );
    if (overlay) simulateHumanClick(overlay);
    await delay(3000);
  }

  updateProgress("[3/4] Opening Following...", 52);
  const followingTab = Array.from(
    document.querySelectorAll('a[role="link"]'),
  ).find((el) => {
    return el.textContent.includes("following");
  });

  if (!followingTab) {
    alert(
      "Followers compiled successfully, but could not resolve following element route properties.",
    );
    resetProgressButton();
    return;
  }

  simulateHumanClick(followingTab);
  await delay(3000);

  updateProgress("[3/4] Scanning Following...", 55);
  await autoScrollModal("[3/4] Scanning Following...", 55, 35);

  updateProgress("[3/4] Compiling List...", 90);
  const arrNameOfFollowing = scrapeUsernames();
  console.log(
    `Successfully scraped ${arrNameOfFollowing.length} following accounts.`,
  );

  updateProgress("[4/4] Finalizing Analysis...", 93);
  const closeButtonFollowing =
    document
      .querySelector('button svg[aria-label="Close"]')
      ?.closest("button") ||
    document.querySelector('div[role="dialog"] button');
  if (closeButtonFollowing) {
    simulateHumanClick(closeButtonFollowing);
    await delay(1000);
  }

  const followersSet = new Set(arrNameFollowers);
  const namesNotInFollowers = arrNameOfFollowing.filter(
    (name) => !followersSet.has(name),
  );

  updateProgress("Done! 🎉", 100);
  await delay(800);

  console.log(
    "Analysis complete. Displaying updated statistics overlay modal.",
  );
  displayStatsModal(
    namesNotInFollowers,
    arrNameFollowers.length,
    arrNameOfFollowing.length,
  );

  resetProgressButton();
}

function injectInteractiveButton() {
  if (document.getElementById("custom-extension-btn")) return;

  const button = document.createElement("button");
  button.id = "custom-extension-btn";
  button.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; display: inline-block; vertical-align: middle;"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
    <span style="display: inline-block; vertical-align: middle;">Find who unfollowed</span>
  `;

  Object.assign(button.style, {
    position: "fixed",
    top: "24px",
    right: "24px",
    width: "auto",
    height: "auto",
    maxHeight: "46px",
    boxSizing: "border-box",
    zIndex: "999999",
    padding: "12px 20px",
    backgroundColor: "rgba(38, 38, 38, 0.75)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "100px",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
    fontSize: "13px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    backdropFilter: "blur(12px)",
    webkitBackdropFilter: "blur(12px)",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  });

  button.addEventListener("mouseenter", () => {
    if (button.style.pointerEvents === "none") return;
    button.style.transform = "translateY(-2px)";
    button.style.backgroundColor = "rgba(54, 54, 54, 0.9)";
    button.style.borderColor = "rgba(255, 255, 255, 0.3)";
    button.style.boxShadow = "0 12px 40px 0 rgba(0, 0, 0, 0.5)";
  });

  button.addEventListener("mouseleave", () => {
    if (button.style.pointerEvents === "none") return;
    button.style.transform = "translateY(0)";
    button.style.backgroundColor = "rgba(38, 38, 38, 0.75)";
    button.style.borderColor = "rgba(255, 255, 255, 0.15)";
    button.style.boxShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.37)";
  });

  button.addEventListener("click", () => startScript());

  document.body.appendChild(button);
}

if (document.readyState === "complete") {
  injectInteractiveButton();
} else {
  window.addEventListener("load", injectInteractiveButton);
}
