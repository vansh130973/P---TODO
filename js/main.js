import { initAuth, currentUser } from "./auth.js";
import { initTodos, showTodoSection } from "./todo.js";

$(function () {
  initAuth();
  initTodos();

  if (currentUser) {
    showTodoSection();
  }
});
