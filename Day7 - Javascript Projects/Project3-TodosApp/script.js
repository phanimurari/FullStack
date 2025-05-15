console.log(this, "the this")


// Get DOM elements once to avoid repeated DOM calls
const todoItemsContainer = document.getElementById("todoItemsContainer");
const addTodoButton = document.getElementById("addTodoButton");
const saveTodoButton = document.getElementById("saveTodoButton");
const inputElement = document.getElementById("todoUserInput");

// Create a placeholder message element for empty task list
const emptyMessage = document.createElement("p");
emptyMessage.textContent = "No tasks added yet. Add your first task!";
emptyMessage.className = "empty-message";
todoItemsContainer.parentElement.insertBefore(emptyMessage, todoItemsContainer);

// Load tasks from localStorage or return empty array if not found
function getTodoListFromLocalStorage() {
  const storedTodos = localStorage.getItem("todoList");
  return storedTodos ? JSON.parse(storedTodos) : [];
}

// Initialize the todoList from localStorage
let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

// Save current todoList to localStorage on "Save" button click
saveTodoButton.onclick = () => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

// Handle "Add" button click to add new task
addTodoButton.onclick = () => {
  const text = inputElement.value.trim();

  // Prevent adding empty task
  if (!text) {
    alert("Please enter a task.");
    return;
  }

  todosCount++;
  const newTodo = {
    text,
    uniqueNo: todosCount,
    isChecked: false,
  };

  // Add task to array and render it
  todoList.push(newTodo);
  createTodoElement(newTodo);
  inputElement.value = "";

  // Hide empty message when at least one task exists
  updateEmptyStateVisibility();
};

// Toggles the checkbox and updates the checked status in todoList array
function toggleStatus(uniqueNo) {
  const label = document.getElementById(`label${uniqueNo}`);
  label.classList.toggle("checked");

  // Find the task in todoList array and toggle its isChecked flag
  const todo = todoList.find(todo => todo.uniqueNo === uniqueNo);
  if (todo) {
    todo.isChecked = !todo.isChecked;
  }
}

// Deletes the task element and removes it from array
function deleteTodo(uniqueNo) {
  const element = document.getElementById(`todo${uniqueNo}`);
  if (element) {
    todoItemsContainer.removeChild(element);
  }

  // Remove task from the todoList array
  todoList = todoList.filter(todo => todo.uniqueNo !== uniqueNo);

  // Update visibility if list becomes empty
  updateEmptyStateVisibility();
}

// Dynamically creates and appends a task element to the list
function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.id = `todo${todo.uniqueNo}`;

  // Create the checkbox input
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.isChecked;
  checkbox.onclick = () => toggleStatus(todo.uniqueNo);

  // Create the label span showing task text
  const span = document.createElement("span");
  span.className = `todo-text ${todo.isChecked ? "checked" : ""}`;
  span.id = `label${todo.uniqueNo}`;
  span.textContent = todo.text;

  // Create the delete icon container
  const actions = document.createElement("div");
  actions.className = "todo-actions";

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fas fa-trash";
  deleteIcon.onclick = () => deleteTodo(todo.uniqueNo);
  actions.appendChild(deleteIcon);

  // Add all pieces to the task list item
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(actions);

  // Append the complete task to the main list container
  todoItemsContainer.appendChild(li);
}

// Show/hide "No tasks" message depending on task list size
function updateEmptyStateVisibility() {
  emptyMessage.style.display = todoList.length === 0 ? "block" : "none";
}

// Render all tasks on page load
todoList.forEach(createTodoElement);

// Initial check to show/hide the empty message
updateEmptyStateVisibility();
