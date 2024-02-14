"use strict";
const addBtn = document.querySelector("#add-btn");
const removeBtn = document.querySelector("#remove-btn");
const todoList = document.querySelector("#todo-list");
const todoInput = document.querySelector("#todo-input");
// Load todos from local storage
const savedTodos = localStorage.getItem('todos');
const todos = savedTodos ? JSON.parse(savedTodos) : [];
// Render todos
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');
        todoDiv.dataset.todoId = String(todo.id);
        todoDiv.innerHTML = `
            <p>${todo.text}</p>
            <div class="item-btns">
                <button class="item-btn" id="edit-btn">Edit</button>
                <button class="item-btn" id="remove-btn">Remove</button>
            </div>
        `;
        todoList.appendChild(todoDiv);
        const editBtn = todoDiv.querySelector('#edit-btn');
        const removeBtn = todoDiv.querySelector('#remove-btn');
        if (editBtn) {
            editBtn.addEventListener('click', function () {
                const newText = prompt("Please enter the updated todo text");
                if (newText) {
                    todoDiv.querySelector('p').textContent = newText;
                    // Update the todo text in the array
                    const updatedTodo = todos.find(t => t.id === todo.id);
                    if (updatedTodo)
                        updatedTodo.text = newText;
                    // Update local storage
                    localStorage.setItem('todos', JSON.stringify(todos));
                }
            });
        }
        if (removeBtn) {
            removeBtn.addEventListener('click', function () {
                todoList.removeChild(todoDiv);
                // Remove the todo from the array
                const index = todos.findIndex(t => t.id === todo.id);
                if (index !== -1) {
                    todos.splice(index, 1);
                    // Update local storage
                    localStorage.setItem('todos', JSON.stringify(todos));
                }
            });
        }
    });
}
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", function () {
    if (todoInput && todoInput.value.trim() !== '') {
        const todoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
        const todoText = todoInput.value.trim();
        todos.push({ id: todoId, text: todoText });
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
        todoInput.value = '';
    }
});
removeBtn === null || removeBtn === void 0 ? void 0 : removeBtn.addEventListener("click", function () {
    todoList.innerHTML = '';
    todos.length = 0;
    localStorage.removeItem('todos');
});
// Initial render
renderTodos();
