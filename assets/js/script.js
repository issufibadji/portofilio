'use strict';

/* ------------------------------------------------------------------
 * Função utilitária para alternar a classe "active" em um elemento
 * ------------------------------------------------------------------ */
const elementToggleFunc = function(elem) { elem.classList.toggle("active"); };

/* ------------------------------------------------------------------
 * Sidebar (mobile): abre/fecha a área de contatos
 * ------------------------------------------------------------------ */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", function() {
        elementToggleFunc(sidebar);
    });
}

/* ==================================================================
 * [REMOVIDO] Tudo relacionado à modal de "Testimonials"
 * - Variáveis de testimonials e modal
 * - Funções e event listeners
 * ================================================================== */
// (Não há mais código de testimonials aqui.)

/* ------------------------------------------------------------------
 * Select customizado + Filtro de projetos do Portfólio
 * ------------------------------------------------------------------ */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]"); // manter igual ao HTML
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Normalizador simples para aceitar "all" ou "todos"
const normalizeSelection = (txt) => {
    const v = (txt || "").toLowerCase().trim();
    if (v === "todos") return "all";
    return v;
};

if (select) {
    select.addEventListener("click", function() { elementToggleFunc(this); });
}

// Função de filtro
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function(selectedValueRaw) {
    const selectedValue = normalizeSelection(selectedValueRaw);

    for (let i = 0; i < filterItems.length; i++) {
        const item = filterItems[i];
        const cat = (item.dataset.category || "").toLowerCase();

        if (selectedValue === "all" || selectedValue === cat) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    }
};

// Eventos dos itens do select
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function() {
        const selectedText = this.innerText;
        if (selectValue) selectValue.innerText = selectedText;
        elementToggleFunc(select);
        filterFunc(selectedText);
    });
}

// Eventos dos botões de filtro (telas grandes)
let lastClickedBtn = filterBtn[0] || null;

for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function() {
        const selectedText = this.innerText;
        if (selectValue) selectValue.innerText = selectedText;
        filterFunc(selectedText);

        if (lastClickedBtn) lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    });
}

/* ------------------------------------------------------------------
 * Formulário de contato: habilita botão quando o form é válido
 * ------------------------------------------------------------------ */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
    for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener("input", function() {
            if (form.checkValidity()) {
                formBtn.removeAttribute("disabled");
            } else {
                formBtn.setAttribute("disabled", "");
            }
        });
    }
}

/* ------------------------------------------------------------------
 * Navegação entre páginas (tabs): About, Resume, Portfolio, Blog, Contact
 * OBS: Esse código depende do texto dos botões bater com data-page
 *      (ex.: "About" -> data-page="about"). Se traduzir os rótulos,
 *      é melhor trocarmos para um mapeamento por data-atributo.
 * ------------------------------------------------------------------ */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function() {

        for (let j = 0; j < pages.length; j++) {
            if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
                pages[j].classList.add("active");
                navigationLinks[j].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                pages[j].classList.remove("active");
                navigationLinks[j].classList.remove("active");
            }
        }

    });
}