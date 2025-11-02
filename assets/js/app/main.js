// assets/js/app/main.js
import { startRouter } from "./router.js";

(function boot() {
  // Ano no rodapé
  const y = document.getElementById("ano");
  if (y) y.textContent = new Date().getFullYear();

  // Menu mobile
  const header = document.querySelector(".site-header");
  const btn = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  if (btn && nav) {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("active");
    });
  }
  window.addEventListener("scroll", () => {
    header?.classList.toggle("scrolled", window.scrollY > 8);
  });

  // Inicia SPA
  startRouter();
})();
