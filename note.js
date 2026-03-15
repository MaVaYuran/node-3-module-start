const yargs = require('yargs');
const pkg = require('./package.json');
const {
  addNote,
  printNotes,
  removeNote,
  updateNote,
} = require('./notes.controller');

yargs.version(pkg.version);

yargs.command({
  command: 'add',
  describe: 'Add new note to list',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: 'list',
  describe: 'List something',
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove note by id',
  builder: {
    id: {
      type: 'string',
      describe: 'Note id',
      demandOption: true,
    },
  },
  async handler({ id }) {
    removeNote(id);
  },
});

yargs.command({
  command: 'update',
  describe: 'Update note by id',
  builder: {
    id: {
      type: 'string',
      describe: 'Note id',
      demandOption: true,
    },
    title: {
      type: 'string',
      describe: ' Note new title',
      demandOption: true,
    },
  },
  async handler({ id, title }) {
    updateNote(id, title);
  },
});

yargs.parse();
