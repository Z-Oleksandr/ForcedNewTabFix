let settings = {
  mode: "default",
  orgUrl: "default"
};

chrome.storage.sync.get(settings, (stored) => {
  settings = stored;
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync") {
    for (let [key, { newValue }] of Object.entries(changes)) {
      settings[key] = newValue;
    }
  }
});

chrome.tabs.onCreated.addListener((tab) => {
  if(settings.mode == "default") {
    if (tab.pendingUrl && tab.pendingUrl.startsWith("chrome://newtab/")) {
      chrome.tabs.update(tab.id, { url: "chrome://new-tab-page" });
    }
  }
});

chrome.webNavigation.onCommitted.addListener((details) => {
  if (settings.mode == "fallback") {
    if (
      details.frameId === 0 && details.url.startsWith(settings.orgUrl)
    ) {
      chrome.tabs.update(details.tabId, { url: "chrome://new-tab-page" });
    }
  }
});
