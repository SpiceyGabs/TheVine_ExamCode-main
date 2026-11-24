(function () {
  function getPreference(key, fallback) {
    try {
      return localStorage.getItem(key) || fallback;
    } catch {
      return fallback;
    }
  }

  function savePreference(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      console.warn("Preference could not be saved.");
    }
  }

  const root = document.documentElement;

  root.dataset.theme = getPreference("theme", "light");
  root.dataset.dyslexia = getPreference("dyslexia", "false");

  document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("themeToggle");
    const dyslexiaToggle = document.getElementById("dyslexiaToggle");

    function updateButtons() {
      const isDark = root.dataset.theme === "dark";
      const isDyslexia = root.dataset.dyslexia === "true";

      if (themeToggle) {
        themeToggle.textContent = isDark ? "Light Mode" : "Dark Mode";
        themeToggle.setAttribute("aria-pressed", String(isDark));
      }

      if (dyslexiaToggle) {
        dyslexiaToggle.textContent = isDyslexia ? "Standard Text" : "Dyslexia Text";
        dyslexiaToggle.setAttribute("aria-pressed", String(isDyslexia));
      }
    }

    themeToggle?.addEventListener("click", function () {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";

      savePreference("theme", root.dataset.theme);
      updateButtons();
    });

    dyslexiaToggle?.addEventListener("click", function () {
      root.dataset.dyslexia = String(root.dataset.dyslexia !== "true");

      savePreference("dyslexia", root.dataset.dyslexia);
      updateButtons();
    });

    updateButtons();
  });
})();