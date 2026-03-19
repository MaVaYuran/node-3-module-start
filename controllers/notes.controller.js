const chalk = require('chalk');
const Note = require('../model/Note.js');

async function addNote(title, owner) {
  await Note.create({ title, owner });

  console.log(chalk.bgGreen('Note was added'));
}

async function getNotes() {
  const notes = await Note.find();
  return notes ? notes : [];
}

async function removeNote(id, owner) {
  await Note.deleteOne({ _id: id, owner });
  console.log(chalk.bgCyan('Note is removed'));
}

async function updateNote(id, newTitle, owner) {
  const result = await Note.updateOne({ _id: id, owner }, { title: newTitle });
  if (result.matchedCount === 0) {
    throw new Error('No note to edit');
  }
  console.log(result);
  console.log(chalk.cyan('Note has been updated'));
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  updateNote,
};
