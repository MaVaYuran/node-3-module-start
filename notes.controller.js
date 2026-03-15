const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen('Note was added'));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, 'utf-8');
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgMagenta('Here is List of notes:'));
  if (notes.length === 0) {
    console.log(chalk.yellow('No notes found'));
  }
  notes.forEach((note) => {
    console.log(chalk.magenta(note.id, note.title));
  });
}

async function removeNote(id) {
  const notes = await getNotes();

  const newNotes = notes.filter((note) => note.id !== id);
  await fs.writeFile(notesPath, JSON.stringify(newNotes));
  console.log(chalk.bgCyan('Note is removed'));
}

async function updateNote(id, newTitle) {
  const notes = await getNotes();

  const updatedNotes = notes.map((note) =>
    note.id === id ? { ...note, title: newTitle } : note,
  );
  await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
  console.log(chalk.cyan('Note was updated'));
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  updateNote,
};
