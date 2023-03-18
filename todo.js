// let listArray = [];

// let inp = document.getElementById("inp");
// let ulTodo = document.getElementById("todo-list");
// let btn = document.getElementById("add");

// //

// btn.addEventListener("click", function () {
//   for (let i = 0; i < listArray.length; i++) {
//     listArray[i].unshift(inp.value);
//   }
//   //   listArray.unshift(inp.value);
//   showList();
// });

// function showList() {
//   let list = document.createElement("li");
//   list.classList.add("list-item");
//   ulTodo.appendChild(list);
//   //   list.innerText = " ";
//   localStorage.setItem("li", inp.value);
//   list.innerText = localStorage.getItem("li");
// }

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

//Rendering todo
function renderTodos() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <div class='list'>
    <span>${todo}</span>
    <div className="btn">
    <button class="edit-btn" data-index="${index}">Edit</button>
    <button class="delete-btn" data-index="${index}">Delete</button>
    </div>
    </div>
          `;
    todoList.appendChild(li);
  });
}

//Adding todo
function addTodo() {
  const todo = todoInput.value.trim();
  if (!todo) return;
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
  todoInput.value = "";
}

//Editing todo
function editTodo() {
  const index = parseInt(this.dataset.index);
  const todo = prompt("Enter the updated todo:", todos[index]);
  if (todo !== null) {
    todos[index] = todo.trim();
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
  }
}

//Deleting todo
function deleteTodo() {
  const index = parseInt(this.dataset.index);
  todos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
  renderTodos();
}

//Adding todos on submit
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

//Allowing user call edit or delete
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    editTodo.call(e.target);
  } else if (e.target.classList.contains("delete-btn")) {
    deleteTodo.call(e.target);
  }
});

renderTodos();
