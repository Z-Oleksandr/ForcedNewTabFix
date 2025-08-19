document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("save");
  const orgUrlInput = document.getElementById("orgUrl");
  const banner_settings_saved = document.getElementById("banner-settings-saved");
  const themeToggle = document.getElementById("theme-toggle");

  chrome.storage.sync.get(
    { mode: "default", orgUrl: "default", theme: "dark" },
    (settings) => {
      document.querySelector(`input[name="mode"][value="${settings.mode}"]`).checked = true;
      if (settings.orgUrl != "default") {
        orgUrlInput.value = settings.orgUrl
      };
      document.body.className = settings.theme;
      updateThemeButton(settings.theme);
    }
  );

  saveBtn.addEventListener("click", () => {
    const mode = document.querySelector("input[name='mode']:checked").value;
    const orgUrl = orgUrlInput.value.trim();

    if (mode == "fallback" && orgUrl == "") {
      alert("Enter url to redirect from");
      return;
    }

    chrome.storage.sync.set({ mode, orgUrl }, () => {
      banner_settings_saved.style.display = "flex";
      setTimeout(() => {
        banner_settings_saved.style.display = "none";
      }, 3000);
    });
  });

  themeToggle.addEventListener('click', () => {
    const current = document.body.classList.contains("dark") ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.body.className = next;
    updateThemeButton(next);
    chrome.storage.sync.set({theme: next})
  });

  function updateThemeButton(theme) {
    if (theme === "dark") {
      themeToggle.textContent = "Switch to Light Mode";
      banner_settings_saved.style.border = "2px solid white";
    } else {
      themeToggle.textContent = "Switch to Dark Mode";
      banner_settings_saved.style.border = "2px solid black";
    }
  }
});
