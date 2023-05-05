import './index.css';
import updateIndexes from './update.js';

const form = document.getElementById('form');
const text = document.getElementById('your-todo');
const addlist = document.getElementById('todo-list');
const del = document.getElementById('clear-all');
const add = form.lastElementChild;

let tasks = [];
if (localStorage.tasks) {
  tasks = JSON.parse(localStorage.tasks);
}

const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};
const removeTask = (index) => {
  tasks.splice(index, 1);
  displayTasks();
  for (let i = 0; i < tasks.length; i += 1) {
    tasks[i].id = i;
  }
  saveTasks();
};

const getEventListener = () => {
  const editIcons = document.querySelectorAll('.bi-pencil');
  const trashIcons = document.querySelectorAll('.bi-trash');

  editIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      const taskElement = icon.closest('li');
      editTask(index, taskElement);
    });
  });

  trashIcons.forEach((icon, index) => {
    icon.addEventListener('click', () => {
      removeTask(index);
    });
  });

  add.addEventListener('click', addTasks);
  text.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      addTasks();
    }
  });

  del.addEventListener('click', clearAlltask);
};
const displayTasks = () => {
  saveTasks();
  addlist.innerHTML = '';
  tasks.forEach((task, index) => {
    const item = document.createElement('li');
    item.setAttribute('data-id', task.index);
    item.innerHTML = `
        <div class="see" data-id=${task.index}>
          <div>
          <input type="checkbox" id="todo-check+${index}" data-index="${task.index}">
          <span>${task.description}</span>
          </div>
          <div>
          <i class="bi bi-pencil" data-id=${task.index}></i>
          <i class="bi bi-trash" data-id=${task.index}></i>
          </div>
        </div>
        `;
    addlist.appendChild(item);
    const checkboxes = document.getElementById(`todo-check+${index}`);
    if (task.completed) {
      checkboxes.parentElement.classList.toggle('checked');
      checkboxes.setAttribute('checked', '');
    }
    checkboxes.onclick = check;
  });
  getEventListener();
};

const check = (e) => {
  const index = parseInt(e.target.id.split('').filter((x, index) => index >= 11).join(''), 10);
  tasks[index].completed = e.target.checked;
  displayTasks();
};

const addTasks = () => {
  const x = {
    description: text.value.trim(),
    completed: false,
    index: tasks.length,
  };
  if (x.description === '') {
    return;
  }
  tasks.push(x);
  displayTasks();
  text.value = '';
  saveTasks();
};

const editTask = (index, taskElement) => {
  const task = tasks[index];
  const spanElement = taskElement.querySelector('span');
  if (!spanElement) {
    return;
  }
  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.value = task.description;
  spanElement.replaceWith(inputElement);
  inputElement.focus();
  inputElement.addEventListener('blur', () => {
    const newDescription = inputElement.value.trim();
    if (newDescription !== '') {
      task.description = newDescription;
      inputElement.replaceWith(spanElement);
      spanElement.textContent = newDescription;
      taskElement.classList.remove('selected');
      displayTasks();
      getEventListener();
      saveTasks();
    } else {
      removeTask(index);
    }
  });
  inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      inputElement.blur();
    }
  });
  taskElement.classList.add('selected');
};

const clearAlltask = () => {
  tasks = tasks.filter((task) => !task.completed);
  updateIndexes();
  displayTasks();
};

window.onload = displayTasks();
getEventListener();