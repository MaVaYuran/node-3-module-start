document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'remove') {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest('li').remove();
      removeAlertSuccess();
    });
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' });
}

document.addEventListener('click', (event) => {
  if (event.target.dataset.type === 'edit') {
    const id = event.target.dataset.id;
    const noteElement = event.target.closest('li');
    const titleElement = noteElement.querySelector('.note-title');
    const editBtn = noteElement.querySelector('.note-edit');
    const removeBtn = noteElement.querySelector('.note-remove');
    const currentTitle = titleElement.textContent;

    const input = document.createElement('input');
    input.type = 'text';
    input.classList = 'form-control form-control-sm w-25 note-edit-input';
    input.dataset.id = id;
    input.value = currentTitle;

    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.classList = 'btn btn-success';
    confirmBtn.textContent = 'Сохранить';

    const rejectBtn = document.createElement('button');
    rejectBtn.type = 'button';
    rejectBtn.classList = 'btn btn-danger';
    rejectBtn.textContent = 'Отмена';

    titleElement.replaceWith(input);
    editBtn.replaceWith(confirmBtn);
    removeBtn.replaceWith(rejectBtn);
    input.focus();

    confirmBtn.addEventListener('click', () => {
      saveEdit(
        id,
        input.value,
        input,
        titleElement,
        currentTitle,
        editBtn,
        confirmBtn,
        removeBtn,
        rejectBtn,
      );
    });

    rejectBtn.addEventListener('click', () => {
      titleElement.textContent = currentTitle;
      input.replaceWith(titleElement);
      confirmBtn.replaceWith(editBtn);
      rejectBtn.replaceWith(removeBtn);
    });

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        saveEdit(
          id,
          input.value,
          input,
          titleElement,
          currentTitle,
          editBtn,
          confirmBtn,
          removeBtn,
          rejectBtn,
        );
      }
    });
  }
});

async function saveEdit(
  id,
  newTitle,
  input,
  oldElement,
  oldTitle,
  editBtn,
  confirmBtn,
  removeBtn,
  rejectBtn,
) {
  if (!newTitle || newTitle === oldTitle) {
    replaceElementsBack(
      input,
      oldElement,
      confirmBtn,
      editBtn,
      removeBtn,
      rejectBtn,
    );
    return;
  }

  console.log('newTitle', newTitle);

  try {
    const response = await fetch(`/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ title: newTitle }),
    });
    console.log('response', response.ok);

    if (!response.ok) {
      throw new Error('Http error');
    }

    oldElement.textContent = newTitle;
    replaceElementsBack(
      input,
      oldElement,
      confirmBtn,
      editBtn,
      removeBtn,
      rejectBtn,
    );
    removeAlertSuccess();
  } catch (error) {
    console.error('Updating note error');
    alert('Произошла ошибка обновления');
    replaceElementsBack(
      input,
      oldElement,
      confirmBtn,
      editBtn,
      removeBtn,
      rejectBtn,
    );
  }
}

function replaceElementsBack(
  input,
  titleElement,
  confirmBtn,
  editBtn,
  removeBtn,
  rejectBtn,
) {
  input.replaceWith(titleElement);
  confirmBtn.replaceWith(editBtn);
  rejectBtn.replaceWith(removeBtn);
}

function removeAlertSuccess() {
  const alert = document.getElementById('success-alert');
  if (alert) {
    alert.remove();
  }
}
