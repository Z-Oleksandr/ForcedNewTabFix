chrome.tabs.onCreated.addListener((tab) => {
  if (tab.pendingUrl && !tab.pendingUrl.startsWith("chrome://new-tab-page")) {
    chrome.tabs.update(tab.id, { url: "chrome://new-tab-page" });
  }
});
