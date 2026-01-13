import { getData, setData } from "./storage.js";
import { currentUser } from "./auth.js";

export function showTodoSection() {
  $("#registerSection, #loginSection").addClass("d-none");
  $("#todoSection").removeClass("d-none");
  renderTodos();
}

export function initTodos() {
  $("#todoForm").submit(e => {
    e.preventDefault();

    const todos = getData("todos", {});
    todos[currentUser].push({
      id: Date.now(),
      text: $("#todoInput").val().trim(),
      date: new Date().toLocaleString()
    });

    setData("todos", todos);
    $("#todoInput").val("");
    renderTodos();
  });

  $(document).on("click", ".delete-btn", function () {
    const id = $(this).closest("tr").data("id");
    const todos = getData("todos", {});
    todos[currentUser] = todos[currentUser].filter(t => t.id !== id);
    setData("todos", todos);
    renderTodos();
  });

  $(document).on("click", ".edit-btn", function () {
    const row = $(this).closest("tr");
    row.find(".todo-text").addClass("d-none");
    row.find(".edit-input").removeClass("d-none").focus();
    row.find(".edit-btn").addClass("d-none");
    row.find(".save-btn").removeClass("d-none");
  });

  $(document).on("click", ".save-btn", function () {
    const row = $(this).closest("tr");
    const id = row.data("id");
    const newText = row.find(".edit-input").val().trim();
    if (!newText) return;

    const todos = getData("todos", {});
    const todo = todos[currentUser].find(t => t.id === id);
    todo.text = newText;

    setData("todos", todos);
    renderTodos();
  });
}

export function renderTodos() {
  const todos = getData("todos", {})[currentUser] || [];

  if (!todos.length) {
    $("#todoList").html(`
      <tr>
        <td colspan="4" class="text-center text-muted">No todos</td>
      </tr>
    `);
    return;
  }

  $("#todoList").html(
    todos.map((t, i) => `
      <tr data-id="${t.id}">
        <td>${i + 1}</td>
        <td>${t.date}</td>
        <td>
          <span class="todo-text">${t.text}</span>
          <input class="form-control form-control-sm edit-input d-none" value="${t.text}">
        </td>
        <td>
          <button class="btn btn-warning btn-sm edit-btn">Edit</button>
          <button class="btn btn-success btn-sm save-btn d-none">Save</button>
          <button class="btn btn-danger btn-sm delete-btn">Delete</button>
        </td>
      </tr>
    `).join("")
  );
}
