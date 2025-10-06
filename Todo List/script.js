const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Load saved tasks on page load
window.addEventListener('DOMContentLoaded', loadTasks);

// ---------------- Add Task ----------------
function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const taskObj = { text: taskText, completed: false };
  const li = createTaskElement(taskObj);
  todoList.appendChild(li);

  saveTask(taskObj);
  input.value = "";
}

// ---------------- Create Task Element ----------------
function createTaskElement(taskObj) {
  const li = document.createElement('li');
  li.className = 'todo-item';

  // Task text
  const span = document.createElement('span');
  span.textContent = taskObj.text;
  if (taskObj.completed) span.classList.add('completed');

  // Toggle complete
  span.addEventListener('click', () => {
    span.classList.toggle('completed');
    toggleTaskComplete(taskObj.text);
  });

  // Edit on double click
  span.addEventListener('dblclick', () => {
    editTask(span, taskObj.text);
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    todoList.removeChild(li);
    deleteTask(taskObj.text);
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  return li;
}

// ---------------- Edit Task ----------------
function editTask(span, oldText) {
  const inputEdit = document.createElement('input');
  inputEdit.type = 'text';
  inputEdit.value = span.textContent;
  inputEdit.className = 'edit-input';

  span.replaceWith(inputEdit);
  inputEdit.focus();

  function saveEdit() {
    const newText = inputEdit.value.trim();
    if (newText === "") {
      alert("Task cannot be empty.");
      inputEdit.focus();
      return;
    }
    span.textContent = newText;
    inputEdit.replaceWith(span);
    updateTask(oldText, newText);
  }

  inputEdit.addEventListener('blur', saveEdit);
  inputEdit.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') saveEdit();
  });
}

// ---------------- LocalStorage Helpers ----------------
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function saveTask(taskObj) {
  const tasks = getTasks();
  tasks.push(taskObj);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(taskText) {
  const tasks = getTasks().filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTaskComplete(taskText) {
  const tasks = getTasks();
  tasks.forEach(task => {
    if (task.text === taskText) task.completed = !task.completed;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(oldText, newText) {
  const tasks = getTasks();
  tasks.forEach(task => {
    if (task.text === oldText) task.text = newText;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => {
    const li = createTaskElement(task);
    todoList.appendChild(li);
  });
}

// ---------------- Event Listeners ----------------
addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});
