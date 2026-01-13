import { getData, setData } from "./storage.js";
import { showTodoSection } from "./todo.js";

export let currentUser = localStorage.getItem("loggedInUser");

export function initAuth() {

  $("#showLogin").click(e => {
    e.preventDefault();
    $("#registerSection").addClass("d-none");
    $("#loginSection").removeClass("d-none");
  });

  $("#showRegister").click(e => {
    e.preventDefault();
    $("#loginSection").addClass("d-none");
    $("#registerSection").removeClass("d-none");
  });

  $("#registerForm").submit(e => {
    e.preventDefault();

    const username = $("#regUsername").val().trim();
    const password = $("#regPassword").val();
    const confirm = $("#regConfirmPassword").val();

    if (password !== confirm) return alert("Password mismatch");

    const users = getData("users", {});
    if (users[username]) return alert("User exists");

    users[username] = { password };
    setData("users", users);

    const todos = getData("todos", {});
    todos[username] = [];
    setData("todos", todos);

    alert("Registered successfully");
    $("#showLogin").click();
  });

  $("#loginForm").submit(e => {
    e.preventDefault();

    const users = getData("users", {});
    const username = $("#lUsername").val();
    const password = $("#lPassword").val();

    if (!users[username])
      return alert("User not found!");
    if (users[username].password !== password)
      return alert("Invalid Password")

    currentUser = username;
    localStorage.setItem("loggedInUser", username);
    showTodoSection();
  });

  $("#logoutBtn").click(() => {
    localStorage.removeItem("loggedInUser");
    location.reload();
  });
}
