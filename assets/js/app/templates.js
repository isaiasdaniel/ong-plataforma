// assets/js/app/templates.js
export const templates = {
  home: () => `
    <section class="page-head">
      <h1>Conectamos pessoas, recursos e propósitos</h1>
      <p>Transparência, impacto real e oportunidades de voluntariado em um só lugar.</p>
      <div class="hero__actions">
        <a class="btn btn--primary" href="#/projetos">Conhecer projetos</a>
        <a class="btn btn--ghost" href="#/cadastro">Quero ser voluntário</a>
      </div>
      <ul class="stats">
        <li><strong>120+</strong><span>Voluntários ativos</span></li>
        <li><strong>35</strong><span>Projetos em andamento</span></li>
        <li><strong>R$ 280k</strong><span>Doações auditadas</span></li>
      </ul>
    </section>

    <section class="projetos">
      <div class="section-head">
        <h2>Projetos em destaque</h2>
        <a class="link" href="#/projetos">Ver todos →</a>
      </div>
      <div class="cards">
        ${card(
          "assets/images/projeto-1.jpg",
          "Alimentação Solidária",
          "Distribuição de cestas básicas e refeições para famílias em situação de vulnerabilidade.",
          ["Segurança alimentar", "Urgente"]
        )}
        ${card(
          "assets/images/projeto-2.jpg",
          "Educa +",
          "Reforço escolar e inclusão digital para crianças e adolescentes da rede pública.",
          ["Educação", "Voluntários"]
        )}
        ${card(
          "assets/images/projeto-3.jpg",
          "Laços de Pata",
          "Resgate, castração e adoção responsável de animais em situação de rua.",
          ["Causa animal", "Doações"]
        )}
      </div>
    </section>
  `,

  projetos: () => `
    <header class="page-head">
      <h1>Projetos sociais</h1>
      <p>Conheça iniciativas que você pode apoiar como voluntário(a) ou doador(a).</p>
    </header>
    <section class="cards">
      ${card(
        "assets/images/projeto1.jpg",
        "Reforço Escolar",
        "Aulas gratuitas de português e matemática para estudantes do ensino fundamental.",
        ["Educação", "120 crianças/mês"]
      )}
      ${card(
        "assets/images/projeto2.jpg",
        "Primeiro Emprego",
        "Capacitação em tecnologia, atendimento e empreendedorismo para jovens.",
        ["Jovens", "Parcerias"]
      )}
    </section>

    <section class="cta">
      <h2>Como doar</h2>
      <p>PIX, cartão e boleto via parceiros de pagamento.</p>
      <details>
        <summary><strong>Dados para PIX</strong></summary>
        <p>Chave (e-mail): doacoes@ongesperanca.org</p>
      </details>
      <a class="btn btn--secondary" href="#/cadastro">Receber recibo e relatórios</a>
    </section>
  `,

  cadastro: () => `
    <header class="page-head">
      <h1>Cadastro</h1>
      <p>Preencha seus dados para se voluntariar, doar ou receber novidades.</p>
    </header>

    <form id="form-cadastro" class="form" novalidate aria-describedby="ajuda">
      <p id="ajuda" class="muted">Os campos marcados com * são obrigatórios.</p>

      <fieldset class="fieldset">
        <legend>Dados pessoais</legend>

        ${fieldText("nome", "Nome completo *", {
          required: true,
          minlength: 3,
          autocomplete: "name",
        })}
        ${fieldEmail("email", "E-mail *", { required: true })}
        ${fieldMask("cpf", "CPF *", "000.000.000-00", {
          required: true,
          maxlength: 14,
          pattern: "^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$",
          help: "Formato: 000.000.000-00",
        })}
        ${fieldMask("telefone", "Telefone *", "(11) 99999-9999", {
          required: true,
          maxlength: 15,
          pattern: "^\\(\\d{2}\\)\\s?\\d{4,5}-\\d{4}$",
          help: "Formato: (11) 99999-9999",
        })}
        ${fieldDate("nascimento", "Data de nascimento *", { required: true })}
      </fieldset>

      <fieldset class="fieldset">
        <legend>Endereço</legend>
        <div class="grid-12">
          <div class="col-8 col-sm-12">
            ${fieldText("endereco", "Endereço *", {
              required: true,
              autocomplete: "street-address",
            })}
          </div>
          <div class="col-4 col-sm-12">
            ${fieldMask("cep", "CEP *", "00000-000", {
              required: true,
              maxlength: 9,
              pattern: "^\\d{5}-\\d{3}$",
              help: "Formato: 00000-000",
            })}
          </div>
          <div class="col-8 col-sm-12">
            ${fieldText("cidade", "Cidade *", { required: true })}
          </div>
          <div class="col-4 col-sm-12">
            ${fieldText("estado", "Estado (UF) *", {
              required: true,
              maxlength: 2,
              pattern: "^[A-Za-z]{2}$",
              placeholder: "SP",
            })}
          </div>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend>Interesse</legend>
        <div class="field">
          <label for="tipo">Quero:</label>
          <select id="tipo" name="tipo">
            <option value="voluntariado">Ser voluntário(a)</option>
            <option value="doacoes">Doar</option>
            <option value="novidades">Receber novidades</option>
          </select>
        </div>
        <div class="field">
          <label for="mensagem">Mensagem (opcional)</label>
          <textarea id="mensagem" name="mensagem" rows="4" maxlength="500"
            placeholder="Conte um pouco sobre você ou sua disponibilidade."></textarea>
        </div>
      </fieldset>

      <div class="actions">
        <button class="btn btn--primary" type="submit">Enviar cadastro</button>
        <button class="btn btn--ghost" type="reset">Limpar</button>
      </div>
      <div id="form-feedback" role="status" class="alert" hidden></div>
    </form>
  `,
};

// ——— Componentes auxiliares (mini “design system” para templates) ———
const card = (img, title, desc, tags = []) => `
  <article class="card">
    <figure class="card__media">
      <img src="${img}" alt="${title}" loading="lazy" />
    </figure>
    <div class="card__body">
      <h3>${title}</h3>
      <p>${desc}</p>
      <div class="tags">
        ${tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>
    </div>
    <div class="card__footer">
      <a class="btn btn--secondary" href="#/cadastro">Apoiar projeto</a>
    </div>
  </article>
`;

const fieldWrap = (inner) => `<div class="field">${inner}</div>`;
const attrs = (o = {}) =>
  Object.entries(o)
    .map(([k, v]) => (v === true ? k : `${k}="${String(v)}"`))
    .join(" ");

const fieldText = (id, label, opt = {}) =>
  fieldWrap(`
  <label for="${id}">${label}</label>
  <input id="${id}" name="${id}" type="text" ${attrs(opt)} />
  <small class="error-msg" id="${id}-error" hidden></small>
`);

const fieldEmail = (id, label, opt = {}) =>
  fieldWrap(`
  <label for="${id}">${label}</label>
  <input id="${id}" name="${id}" type="email" ${attrs(opt)} />
  <small class="error-msg" id="${id}-error" hidden></small>
`);

const fieldDate = (id, label, opt = {}) =>
  fieldWrap(`
  <label for="${id}">${label}</label>
  <input id="${id}" name="${id}" type="date" ${attrs(opt)} />
  <small class="error-msg" id="${id}-error" hidden></small>
`);

const fieldMask = (id, label, placeholder, opt = {}) =>
  fieldWrap(`
  <label for="${id}">${label}</label>
  <input id="${id}" name="${id}" type="text" placeholder="${placeholder}" ${attrs(
    opt
  )} />
  ${opt.help ? `<small class="help">${opt.help}</small>` : ""}
  <small class="error-msg" id="${id}-error" hidden></small>
`);
