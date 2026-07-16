document.documentElement.classList.add("menu-ready");

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const mobileQuery = window.matchMedia("(max-width: 680px)");

if (menuToggle && siteNav) {
  const menuLabel = menuToggle.querySelector(".menu-label");

  const setMenuOpen = (isOpen) => {
    siteNav.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );

    if (menuLabel) {
      menuLabel.textContent = isOpen ? "Close" : "Menu";
    }
  };

  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  const resetMenu = () => setMenuOpen(false);

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", resetMenu);
  } else {
    mobileQuery.addListener(resetMenu);
  }
}
