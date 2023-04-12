import { v4 as uuidV4 } from 'uuid';

// console.log(uuidV4());
type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};
const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');
// const list = document.querySelector('button');
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input?.value === '' || input === null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  saveTask();

  addListItem(newTask);
  input.value = '';
});

function addListItem(task: Task) {
  const item = document.createElement('li');
  const lable = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.addEventListener('change', (e) => {
    task.completed = !task.completed;
    console.log(tasks);
    saveTask();
  });
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  lable.append(checkbox, task.title);
  item.append(lable);
  list?.append(item);

  console.log(tasks);
}

function saveTask() {
  localStorage.setItem('Tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('Tasks');
  if (taskJSON === null) return [];
  return JSON.parse(taskJSON);
}
loadTasks();
