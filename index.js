const chalk = require('chalk');
const express = require('express');
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require('./notes.controller');
// const { title } = require('process');
const path = require('path');
// const { create } = require('domain');

const port = 3000;

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'pages');
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express app',
    notes: await getNotes(),
    created: false,
  });
});

app.post('/', async (req, res) => {
  await addNote(req.body.title);
  res.render('index', {
    title: 'Express app',
    notes: await getNotes(),
    created: true,
  });
});

app.delete('/:id', async (req, res) => {
  // console.log('id', req.params.id);
  await removeNote(req.params.id);
  res.render('index', {
    title: 'Express app',
    notes: await getNotes(),
    created: false,
  });
});
app.put('/:id', async (req, res) => {
  const { title } = req.body;
  await updateNote(req.params.id, title);
  res.render('index', {
    title: 'Express app',
    notes: await getNotes(),
    created: false,
  });
});

app.listen(port, () => {
  console.log(chalk.cyan(`Server has been started on port ${port}`));
});
