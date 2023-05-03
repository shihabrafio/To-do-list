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
  { description: 'Do eating', completed: true, index: 3 },
];

function displayTasks() {
  // set to local storage here
  localStorage.setItem('todolist',JSON.stringify(tasks));
    addlist.innerHTML = '';
  tasks.forEach((task, index, completed) => {
    const item = document.createElement('li');
    item.innerHTML = `
        <div class="see">
          <div>
          <input type="checkbox" ${task.completed ? 'checked' : ''}
          data-index="${task.index}">
          <span>${task.description}</span>
          </div>
          <div>
          <i class="bi bi-three-dots-vertical" data-id=${task.index}></i>
          <i class="bi bi-trash"></i>
          </div>
        </div>
        `;
    addlist.appendChild(item);
  });
  setEventListener()
}

//const {id} = dataId;

function edit(e){
  const number = parseInt(e.target.getAttribute('data-id'));
  const editTask = tasks.filter(task => task.index == number)[0]
  const newDescription = 'this will be the input'
  editTask.description = newDescription;
  displayTasks();
}

function setEventListener(){
  const editIcons = document.querySelectorAll('.bi-three-dots-vertical');
  editIcons.forEach(icon=> icon.addEventListener('click', edit))
 // console.log(editIcons)
}

window.onload = displayTasks();

