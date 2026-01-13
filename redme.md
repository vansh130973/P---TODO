# TODO App

A simple **TODO application** built using **HTML, Bootstrap, jQuery, and modern JavaScript (ES Modules)**.  
The app supports **user authentication**, **CRUD operations**, and **localStorage-based persistence** — no backend use.

## Features
### Authentication
- User registration
- User login & logout
- Separate todo lists per user
- Session persistence using `localStorage`

### Todo Management
- Add new todos
- Edit existing todos (inline editing)
- Delete todos
- Auto timestamp for each todo

---

## How to Run the Project

### ▶ Using Live Server
1. Open the project in **VS Code**
2. Install the **Live Server** extension
3. Right-click `myTODO.html`
4. Select **Open with Live Server**

---

## How the App Works

- User credentials are stored in `localStorage`
- Each user has their own todo list
- Data persists even after browser refresh
- Logic is separated using ES Modules
- jQuery handles DOM manipulation and events