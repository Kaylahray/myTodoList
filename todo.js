const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
let baseTodos = JSON.parse(localStorage.getItem("todos")) || [];

//Rendering todo
function renderTodos() {
  todoList.innerHTML = '';
  baseTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = 
    `
      <div class='list todo-item' key=${index}>
        <span>${todo}</span>
        <div class="action-buttons">
          <span class="btn-span" data-index=${index}>
            <i class="ri-pencil-fill icons edit-btn" data-index=${index}></i>
          </span>
          
          <span data-index=${index}>
            <i class="ri-delete-bin-6-line icons delete-btn" data-index=${index}></i>
          </span>
        </div>
      </div>
    `;
    todoList.appendChild(li);
  });
};
// placing this function here means it called exactly once on initial render/load and any 
// subsequent call. you were calling it twice after every edit or delete action which
// isn't ideal 
renderTodos();

//Adding todo
function addTodo() {
  const todo = todoInput.value.trim();
  if (!todo) return;
  let newTodos = baseTodos.concat(todo)
  todoInput.value = "";
  localStorage.setItem("todos", JSON.stringify(newTodos));
  baseTodos = JSON.parse(localStorage.getItem("todos"));
  renderTodos()
}

//Editing todo
function editTodo() {
  const index = this.index
  const todo = prompt("Enter the updated todo:", baseTodos[index]);
  if (todo !== null) {
    baseTodos[index] = todo.trim();
    localStorage.setItem("todos", JSON.stringify(baseTodos));
    baseTodos = JSON.parse(localStorage.getItem("todos"));
    renderTodos();
  }
}

//Deleting todo
function deleteTodo() {
  // your former approach was passing in the entire e.target(don't do this) into this function 
  // and specifically extracting index value from the e.target object you passed from "todoList.addEventListener"
  // dataset: {
  //   index: 7 or 8 or 1
  // }
  // this.dataset.index was actually correct and on point!
  // if you console.log(this) "this", it will make a lot sense to you what i changed.
  const index = this.index
  console.log(index)
  baseTodos.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(baseTodos));
  baseTodos = JSON.parse(localStorage.getItem("todos"));
  renderTodos();
}

//Adding todos on submit
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

//Allowing user call edit or delete
todoList.addEventListener("click", ({target}) => {
  // using target.parentNode because depending on what area of the delete or edit box
  // you click you still get the index because it is an attribute of the button as well as 
  // the buttons parent(span). THIS IS THE ORIGIN OF YOUR ERROR
  // another issue i noticed was that the icons were not filling their containers
  // thereby inheriting their action
  const selectedItem = target.parentNode;
  const getElementIndex = selectedItem.getAttribute("data-index");
  const itemIndex = parseInt(getElementIndex)
  // the functions below that recieves index as an arguement is expecting it stored as an object hence
  let itemIndexObject = {index: itemIndex}

  if (target.classList.contains("edit-btn")) {
    editTodo.call(itemIndexObject);
  } else if (target.classList.contains("delete-btn")) {
    deleteTodo.call(itemIndexObject);
  }
});
