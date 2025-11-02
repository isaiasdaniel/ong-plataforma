// assets/js/app/router.js
import { templates } from "./templates.js";
import { initFormPage } from "./form.js";

const routes = {
  "/": templates.home,
  "/projetos": templates.projetos,
  "/cadastro": templates.cadastro,
};

const pageInits = {
  "/cadastro": initFormPage, // roda scripts específicos após render
};

export function resolveRoute(path) {
  return routes[path] ? path : "/"; // fallback para home
}

export function render(path) {
  const app = document.getElementById("app");
  app.innerHTML = routes[path]();

  // roda init específico da página (se houver)
  if (pageInits[path]) pageInits[path]();
}

export function startRouter() {
  const go = () => {
    const hash = location.hash.replace("#", "") || "/";
    const path = resolveRoute(hash);
    render(path);
    // acessibilidade: foca no main
    document.getElementById("app")?.setAttribute("tabindex", "-1");
    document.getElementById("app")?.focus();
  };

  window.addEventListener("hashchange", go);
  go(); // primeira render
}
