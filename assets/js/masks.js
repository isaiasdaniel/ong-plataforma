(function () {
  const onlyDigits = (v) => v.replace(/\D/g, "");

  const cpf = document.getElementById("cpf");
  const tel = document.getElementById("telefone");
  const cep = document.getElementById("cep");

  if (cpf) {
    cpf.addEventListener("input", () => {
      let v = onlyDigits(cpf.value).slice(0, 11);
      if (v.length > 9)
        v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
      else if (v.length > 6)
        v = v.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
      else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/, "$1.$2");
      cpf.value = v;
    });
  }

  if (tel) {
    tel.addEventListener("input", () => {
      let v = onlyDigits(tel.value).slice(0, 11); // 10 ou 11 dígitos
      if (v.length > 10) v = v.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      else if (v.length > 6)
        v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
      else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/, "($1) $2");
      else if (v.length > 0) v = v.replace(/(\d{0,2})/, "($1");
      tel.value = v;
    });
  }

  if (cep) {
    cep.addEventListener("input", () => {
      let v = onlyDigits(cep.value).slice(0, 8);
      if (v.length > 5) v = v.replace(/(\d{5})(\d{0,3})/, "$1-$2");
      cep.value = v;
    });
  }
})();
