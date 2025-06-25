const todoItemsContainer = document.getElementById("todoItemsContainer");
const addTodoButton = document.getElementById("addTodoButton");
const inputElement = document.getElementById("todoUserInput");
const toggleCompletedButton = document.getElementById("toggleCompletedButton");

const emptyMessage = document.createElement("p");
emptyMessage.textContent = "No tasks added yet. Add your first task!";
emptyMessage.className = "empty-message";
todoItemsContainer.parentElement.insertBefore(emptyMessage, todoItemsContainer);

const API_URL = "http://localhost:8005/api/todos";
let allTodos = [];
let showingCompleted = false;

// Fetch Todos on page load
async function fetchTodos() {
  try {
    const res = await fetch(API_URL);
    allTodos = await res.json();
    renderTodos();
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

function renderTodos() {
  todoItemsContainer.innerHTML = "";
  const visibleTodos = showingCompleted ? allTodos.filter(t => t.completed) : allTodos.filter(t => !t.completed);

  visibleTodos.forEach(createTodoElement);
  updateEmptyStateVisibility(visibleTodos);
}

addTodoButton.onclick = async () => {
  const title = inputElement.value.trim();
  if (!title) return alert("Please enter a task.");

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const newTodo = await res.json();
    allTodos.push(newTodo);
    renderTodos();
    inputElement.value = "";
  } catch (err) {
    console.error("Add error:", err);
  }
};

async function deleteTodo(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    allTodos = allTodos.filter(t => t._id !== id);
    renderTodos();
  } catch (err) {
    console.error("Delete error:", err);
  }
}

async function toggleStatus(todo) {
  try {
    const res = await fetch(`${API_URL}/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    });

    const updated = await res.json();
    const index = allTodos.findIndex(t => t._id === updated._id);
    if (index !== -1) allTodos[index] = updated;

    renderTodos();
  } catch (err) {
    console.error("Toggle error:", err);
  }
}

function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.id = `todo${todo._id}`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.onclick = () => toggleStatus(todo);

  const span = document.createElement("span");
  span.className = `todo-text ${todo.completed ? "checked" : ""}`;
  span.id = `label${todo._id}`;
  span.textContent = todo.title;

  const actions = document.createElement("div");
  actions.className = "todo-actions";

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fas fa-trash";
  deleteIcon.onclick = () => deleteTodo(todo._id);

  actions.appendChild(deleteIcon);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(actions);

  todoItemsContainer.appendChild(li);
}

toggleCompletedButton.onclick = () => {
  showingCompleted = !showingCompleted;
  toggleCompletedButton.textContent = showingCompleted ? "Show Pending" : "Show Completed";
  renderTodos();
};

function updateEmptyStateVisibility(todos) {
  emptyMessage.style.display = todos.length === 0 ? "block" : "none";
}

// Initial load
fetchTodos();
