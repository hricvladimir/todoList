const todoForm = document.querySelector("#add-form");
const todoList = document.querySelector(".form-list");
const todoSection = document.querySelector(".todo-section");

todoForm.addEventListener("submit", addToDoItem);
todoForm.addEventListener("submit", filterTodos);
getTodosLocal();

function addToDoItem(e) {
  e.preventDefault();
  const addInputBox = document.querySelector(".add-input");
  if (addInputBox.value === "") return null;
  const listItem = createListItem(addInputBox.value);
  todoList.appendChild(listItem);
  saveTodoLocal(addInputBox.value);
  addInputBox.value = "";
}

function createListItem(formInput) {
  // list item
  const listItem = document.createElement("div");
  listItem.classList.add("list-item");
  listItem.id = `item-${todoList.childElementCount + 1}`;

  // todo item text
  const itemText = document.createElement("p");
  itemText.innerText = formInput;

  // list item button container
  const listItemBtnsContainer = document.createElement("div");
  listItemBtnsContainer.classList.add(
    "function-btn",
    "list-item-btns-container"
  );

  // list item buttons
  const greenBtn = document.createElement("button");
  const iconGreen = document.createElement("i");
  greenBtn.classList.add("btn", "green-btn", "check-btn");
  iconGreen.classList.add("fa-solid", "fa-check");
  greenBtn.addEventListener("click", toggleCheckItem);
  greenBtn.addEventListener("click", filterTodos);

  const redBtn = document.createElement("button");
  const iconRed = document.createElement("i");
  redBtn.classList.add("btn", "red-btn", "remove-btn");
  iconRed.classList.add("fa-solid", "fa-trash-can");
  redBtn.addEventListener("click", removeListItem);

  // adding elements together
  listItem.appendChild(itemText);
  greenBtn.appendChild(iconGreen);
  redBtn.appendChild(iconRed);
  listItemBtnsContainer.appendChild(greenBtn);
  listItemBtnsContainer.appendChild(redBtn);
  listItem.appendChild(listItemBtnsContainer);

  return listItem;
}

function removeListItem() {
  let listItemToDelete = this.parentElement.parentElement;
  listItemToDelete.classList.add("removedItem");
  listItemToDelete.addEventListener("transitionend", function (e) {
    if (e.propertyName !== "transform") return;
    let child = listItemToDelete;
    console.log(child);
    console.log("dsajiudsahiudhsai");
    removeTodoLocal(child);
    listItemToDelete.remove();
    let ctr = 0;
    const todoListItems = document.querySelectorAll(".list-item");
    console.log(listItemToDelete);
    for (let listItem of todoListItems) {
      listItem.id = `item-${ctr}`;
      ctr++;
    }
  });
}

function toggleCheckItem() {
  let listItemToCheck = this.parentElement.parentElement;
  listItemToCheck.classList.toggle("checkedList");
  // filter
  const listItems = document.querySelectorAll(".list-item");
  const filteredListItems = Array.from(listItems).filter((item) =>
    item.classList.contains("checkedList")
  );

  console.log(filteredListItems);
  console.log("kasta");
}

function saveTodoLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) todos = [];
  else todos = JSON.parse(localStorage.getItem("todos"));
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  console.log(localStorage);
}

function removeTodoLocal(todo) {
  let todos;
  const todoId = todo.id.slice(5);

  if (localStorage.getItem("todos") === null) todos = [];
  else todos = JSON.parse(localStorage.getItem("todos"));
  todos.splice(todoId - 1, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosLocal() {
  let todos;
  if (localStorage.getItem("todos") === null) todos = [];
  else todos = JSON.parse(localStorage.getItem("todos"));
  for (let todo of todos) {
    const listItem = createListItem(todo);
    todoList.appendChild(listItem);
  }
}

// delete btn
const deleteBtn = document.querySelector("#delete-btn");
deleteBtn.addEventListener("click", function () {
  const listItems = document.querySelectorAll(".list-item");
  localStorage.clear();
  for (let listItem of listItems) {
    listItem.remove();
  }
});

// time greeting
const greeting = document.querySelector("#greeting");

const hoursTime = new Date().getHours();
console.log(hoursTime);
if (hoursTime <= 11) greeting.innerText = "Good morning!";
else if (hoursTime > 11 && hoursTime <= 17)
  greeting.innerText = "Good afternoon!";
else greeting.innerText = "Good evening!";

// filter
const filterTodoSelect = document.querySelector(".filter-todo");
filterTodoSelect.addEventListener("change", filterTodos);

function filterTodos(e) {
  // run on adding fix
  let selectValue = filterTodoSelect.value;

  console.log(selectValue);
  const todos = document.querySelectorAll(".list-item");
  console.log(todos);
  if (selectValue === "all") {
    for (let todo of todos) {
      console.log(todo);
      todo.style.display = "flex";
    }
  } else if (selectValue === "completed") {
    for (let todo of todos) {
      console.log(todo);
      if (todo.classList.contains("checkedList")) {
        todo.style.display = "flex";
      } else {
        todo.style.display = "none";
      }
    }
  } else if (selectValue === "uncompleted") {
    for (let todo of todos) {
      console.log(todo);
      if (todo.classList.contains("checkedList")) {
        todo.style.display = "none";
      } else {
        todo.style.display = "flex";
      }
    }
  }
}
