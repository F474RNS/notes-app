class NoteForm extends HTMLElement {
  connectedCallback() {
    this.innerHTML = \`
      <form id="note-form" novalidate>
        <input type="text" id="title" placeholder="Judul catatan" required />
        <small class="error" id="title-error"></small>
        
        <textarea id="body" placeholder="Isi catatan" required></textarea>
        <small class="error" id="body-error"></small>

        <button type="submit">Tambah Catatan</button>
      </form>
    \`;

    const form = this.querySelector('#note-form');
    const titleInput = this.querySelector('#title');
    const bodyInput = this.querySelector('#body');
    const titleError = this.querySelector('#title-error');
    const bodyError = this.querySelector('#body-error');

    const validate = () => {
      let valid = true;

      if (titleInput.value.trim() === '') {
        titleError.textContent = 'Judul tidak boleh kosong';
        titleInput.style.borderColor = 'red';
        valid = false;
      } else {
        titleError.textContent = '';
        titleInput.style.borderColor = '#ccc';
      }

      if (bodyInput.value.trim() === '') {
        bodyError.textContent = 'Isi catatan tidak boleh kosong';
        bodyInput.style.borderColor = 'red';
        valid = false;
      } else {
        bodyError.textContent = '';
        bodyInput.style.borderColor = '#ccc';
      }

      return valid;
    };

    titleInput.addEventListener('input', validate);
    bodyInput.addEventListener('input', validate);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validate()) return;

      const title = titleInput.value;
      const body = bodyInput.value;

      this.dispatchEvent(new CustomEvent('add-note', {
        detail: { title, body },
        bubbles: true
      }));

      form.reset();
      titleError.textContent = '';
      bodyError.textContent = '';
    });
  }
}
customElements.define('note-form', NoteForm);