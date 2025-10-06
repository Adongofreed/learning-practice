
// Step 1: Select important elements from HTML
const noteInput = document.getElementById('note-input');
const addBtn = document.getElementById('add-note-btn');
const notesContainer = document.getElementById('notes-container');

// Step 2: Add note functionality
function addNote() {
  const noteText = noteInput.value.trim();

  if (noteText === "") {
    alert("Please write something before adding a note.");
    return;
  }

  // Create new note element
  const noteDiv = document.createElement('div');
  noteDiv.className = 'note';
  noteDiv.textContent = noteText;

  // Create delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  noteDiv.appendChild(deleteBtn);

  // Add note to container
  notesContainer.appendChild(noteDiv);

  // Clear input
  noteInput.value = "";

  // Save note to localStorage
  saveNoteToLocalStorage(noteText);

  // Delete functionality
  deleteBtn.addEventListener('click', function () {
    notesContainer.removeChild(noteDiv);
    deleteNoteFromLocalStorage(noteText);
  });
}

// Step 3: Event listeners
addBtn.addEventListener('click', addNote);

noteInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addNote();
  }
});

// Step 4: LocalStorage helpers

// Save note
function saveNoteToLocalStorage(noteText) {
  let notes = getNotesFromLocalStorage();
  notes.push(noteText);
  localStorage.setItem('notes', JSON.stringify(notes));
}

// Get all notes
function getNotesFromLocalStorage() {
  const notes = localStorage.getItem('notes');
  return notes ? JSON.parse(notes) : [];
}

// Delete note
function deleteNoteFromLocalStorage(noteText) {
  let notes = getNotesFromLocalStorage();
  const updatedNotes = notes.filter(note => note !== noteText);
  localStorage.setItem('notes', JSON.stringify(updatedNotes));
}

// Load notes when page loads
function loadNotes() {
  let notes = getNotesFromLocalStorage();
  notes.forEach(noteText => {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.textContent = noteText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    noteDiv.appendChild(deleteBtn);

    notesContainer.appendChild(noteDiv);

    deleteBtn.addEventListener('click', function () {
      notesContainer.removeChild(noteDiv);
      deleteNoteFromLocalStorage(noteText);
    });
  });
}

// Step 5: Load saved notes automatically
window.addEventListener('load', loadNotes);
