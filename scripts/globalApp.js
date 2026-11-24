function setSectionState(section, state) {
  if (!section) return;

  section.dataset.state = state;
  section.setAttribute("aria-busy", String(state === "loading"));

  section.querySelectorAll("[data-view]").forEach(function (view) {
    view.hidden = view.dataset.view !== state;
  });
}

function getStoredData(key, fallback) {
  try {
    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveStoredData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".mainHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (!header || !menuToggle || !mainNav) return;
  header.classList.add("menuReady");

  function closeMenu() {
    mainNav.classList.remove("isOpen");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  menuToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("isOpen");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll(".navLink").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && mainNav.classList.contains("isOpen")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
});