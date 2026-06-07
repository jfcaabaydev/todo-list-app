const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.querySelector(".task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
})


function renderTask() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    li.addEventListener("click", function () {
      completeTask(li);
    })

    const span = document.createElement("span");
    span.textContent = task;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function (event) {
      event.stopPropagation();
      deleteTask(index);
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  tasks.push(taskText);
  taskInput.value = "";
  saveTasks();
  renderTask();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTask();
}

function completeTask(li) {
  li.classList.toggle("completed");
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
 
renderTask();