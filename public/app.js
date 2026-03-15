document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest('li').remove();
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}

document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;
    const editedTitle = prompt('Введите новое название');
    if (!editedTitle) return;

    update(id, editedTitle)
      .then(() => {
        const noteElement = event.target.closest('li');
        const titleElement = noteElement.querySelector('.note-title');
        if (titleElement) {
          titleElement.textContent = editedTitle;
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Ошибка при обновлении заметки');
      });
  }
});

async function update(id, editedTitle) {
  await fetch(`/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ title: editedTitle }),
  });
}
