import './components/app-bar.js';
import './components/note-item.js';
import './components/note-form.js';

const dummyData = [
  { title: "Catatan 1", body: "Isi catatan pertama" },
  { title: "Catatan 2", body: "Isi catatan kedua" },
  { title: "Catatan 3", body: "Isi catatan ketiga" },
];

const notesContainer = document.getElementById('notes-container');

function renderNotes(notes) {
  notesContainer.innerHTML = '';
  notes.forEach(note => {
    const noteEl = document.createElement('note-item');
    noteEl.note = note;
    notesContainer.appendChild(noteEl);
  });
}

renderNotes(dummyData);

document.body.addEventListener('add-note', (e) => {
  dummyData.push(e.detail);
  renderNotes(dummyData);
});