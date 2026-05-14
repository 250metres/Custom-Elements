(function() {
  const estilo = document.createElement('style');
  estilo.textContent = `
    ce { visibility: hidden; }
    ce.listo { visibility: visible; }
  `;
  document.head.appendChild(estilo);
})();

class CustomElementBlogger extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const codigoId = this.textContent.trim();
    if (window.misDatosBlogger) {
      this.render(codigoId);
    } else {
      document.addEventListener('datosListos', () => this.render(codigoId));
    }
  }

  render(codigoId) {
    if (window.misDatosBlogger && window.misDatosBlogger[codigoId]) {
      this.textContent = window.misDatosBlogger[codigoId];
      this.classList.add('listo');
    } else {
      this.classList.add('listo');
    }
  }
}

customElements.define('ce', CustomElementBlogger);

const urlDatos = 'https://cdn.jsdelivr.net/gh/250metres/Custom-Elements@main/custom-elements.json';

fetch(urlDatos)
  .then(response => response.json())
  .then(data => {
    window.misDatosBlogger = data;
    document.dispatchEvent(new Event('datosListos'));
  })
  .catch(err => {});