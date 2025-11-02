// assets/js/app/form.js

// Helpers
const qs = (s, el = document) => el.querySelector(s);
const qsa = (s, el = document) => [...el.querySelectorAll(s)];
const onlyNums = (v) => v.replace(/\D/g, "");

// Máscaras simples
function maskCPF(v) {
  let n = onlyNums(v).slice(0, 11);
  if (n.length > 9)
    return n.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
  if (n.length > 6) return n.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
  if (n.length > 3) return n.replace(/(\d{3})(\d{0,3})/, "$1.$2");
  return n;
}
function maskTel(v) {
  let n = onlyNums(v).slice(0, 11);
  if (n.length > 6)
    return n.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
  if (n.length > 2) return n.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  return n;
}
function maskCEP(v) {
  let n = onlyNums(v).slice(0, 8);
  if (n.length > 5) return n.replace(/(\d{5})(\d{0,3})/, "$1-$2");
  return n;
}

// Erros
function showError(input, msg) {
  input.classList.add("is-invalid");
  const err = qs(`#${input.id}-error`);
  if (err) {
    err.textContent = msg;
    err.hidden = false;
  }
}
function clearError(input) {
  input.classList.remove("is-invalid");
  const err = qs(`#${input.id}-error`);
  if (err) {
    err.hidden = true;
    err.textContent = "";
  }
}

// Validação campo a campo
function validateField(input) {
  clearError(input);

  if (input.hasAttribute("required") && !input.value.trim()) {
    showError(input, "Campo obrigatório.");
    return false;
  }
  if (input.hasAttribute("minlength")) {
    const m = Number(input.getAttribute("minlength"));
    if (input.value.trim().length < m) {
      showError(input, `Mínimo de ${m} caracteres.`);
      return false;
    }
  }
  if (input.getAttribute("type") === "email") {
    const ok = /\S+@\S+\.\S+/.test(input.value);
    if (!ok) {
      showError(input, "E-mail inválido.");
      return false;
    }
  }
  if (input.hasAttribute("pattern")) {
    const re = new RegExp(input.getAttribute("pattern"));
    if (!re.test(input.value)) {
      showError(input, "Formato inválido.");
      return false;
    }
  }
  return true;
}

// Autosave no localStorage
const STORAGE_KEY = "ongconecta:cadastro-draft";

function saveDraft(form) {
  const data = {};
  qsa("input, textarea, select", form).forEach((i) => (data[i.id] = i.value));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
function restoreDraft(form) {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    qsa("input, textarea, select", form).forEach((i) => {
      if (data[i.id]) i.value = data[i.id];
    });
  } catch {}
}
function clearDraft() {
  localStorage.removeItem(STORAGE_KEY);
}

// Init da página de cadastro
export function initFormPage() {
  const form = qs("#form-cadastro");
  const feedback = qs("#form-feedback");

  // Máscaras
  const cpf = qs("#cpf");
  const tel = qs("#telefone");
  const cep = qs("#cep");

  if (cpf)
    cpf.addEventListener(
      "input",
      (e) => (e.target.value = maskCPF(e.target.value))
    );
  if (tel)
    tel.addEventListener(
      "input",
      (e) => (e.target.value = maskTel(e.target.value))
    );
  if (cep)
    cep.addEventListener(
      "input",
      (e) => (e.target.value = maskCEP(e.target.value))
    );

  // Validação on-blur
  qsa(
    "input[required], input[minlength], input[pattern], input[type='email']",
    form
  ).forEach((input) =>
    input.addEventListener("blur", () => validateField(input))
  );

  // Autosave
  restoreDraft(form);
  form.addEventListener("input", () => saveDraft(form));
  form.addEventListener("reset", () => {
    setTimeout(() => {
      clearDraft();
      qsa(".is-invalid", form).forEach(clearError);
    }, 0);
  });

  // Submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;
    qsa("input, textarea, select", form).forEach((i) => {
      if (!validateField(i)) ok = false;
    });
    if (!ok) {
      feedback.className = "alert alert--error";
      feedback.textContent = "Revise os campos destacados.";
      feedback.hidden = false;
      return;
    }
    // Simula sucesso
    feedback.className = "alert alert--success";
    feedback.textContent =
      "Cadastro enviado com sucesso! Obrigado por colaborar 💚";
    feedback.hidden = false;
    clearDraft();
    form.reset();
  });
}
