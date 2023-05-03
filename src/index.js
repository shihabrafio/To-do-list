import './index.css';

const container = document.querySelector('.container');
const headtag = document.querySelector('.to-do-title');
const form = document.getElementById('form');
const text = document.getElementById('your-todo');
const addlist = document.getElementById('todo-list');
const threedot = document.querySelector('.bi-three-dots-vertical');
const del = document.getElementById('clear-all');

const tasks = [
  { description: 'Learn React', completed: true, index: 0 },
  { description: 'Finish quiz', completed: false, index: 1 },
  { description: 'Do laundry', completed: true, index: 2 },
  { description: 'Do eating', completed: false, index: 3 },
];

function displayTasks() {
  addlist.innerHTML = '';
  tasks.forEach((task, index, completed) => {
    const item = document.createElement('li');
    item.innerHTML = `
        <div class="see">
          <label class="see-description">
          <input type="checkbox" ${task.completed ? 'checked' : ''}
          data-index="${task.index}">
          <span>${task.description}</span>
          </label>
          <div class="see-icons">
          <i class="bi bi-three-dots-vertical"></i>
          <i class="bi bi-trash"></i>
          </div>
        </div>
        `;
    addlist.appendChild(item);
  });
}

window.onload = displayTasks();