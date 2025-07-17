class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'body'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  set note(data) {
    this.setAttribute('title', data.title);
    this.setAttribute('body', data.body);
  }

  render() {
    const title = this.getAttribute('title') || 'Tanpa Judul';
    const body = this.getAttribute('body') || 'Tanpa Isi';

    this.shadowRoot.innerHTML = \`
      <style>
        div {
          background: white;
          border-radius: 8px;
          padding: 1.25rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          transition: transform 0.2s;
        }
        div:hover {
          transform: translateY(-3px);
        }
        h3 {
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
          color: #3A3D98;
        }
        p {
          margin: 0;
          line-height: 1.5;
        }
      </style>
      <div>
        <h3>\${title}</h3>
        <p>\${body}</p>
      </div>
    \`;
  }

  connectedCallback() {
    this.render();
  }
}
customElements.define('note-item', NoteItem);