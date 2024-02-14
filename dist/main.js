"use strict";
const addBtn = document.querySelector("#add-btn");
const removeBtn = document.querySelector("#remove-btn");
const todoList = document.querySelector("#todo-list");
let h1 = document.querySelector("h1");
let newTodo;
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", function () {
    console.log("clicked");
    if (todoList) {
        const todoText = prompt("Please enter a todo");
        function addTodoFn() {
            if (todoList && todoText) {
                newTodo = document.createElement('li');
                newTodo.innerHTML = todoText;
                todoList.appendChild(newTodo);
            }
        }
        addTodoFn();
    }
});
removeBtn === null || removeBtn === void 0 ? void 0 : removeBtn.addEventListener("click", function () {
    if (todoList) {
        const lastElement = todoList.lastElementChild;
        if (lastElement) {
            todoList.removeChild(lastElement);
        }
    }
});
