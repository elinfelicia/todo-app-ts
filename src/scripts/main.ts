const addBtn: HTMLButtonElement | null = document.querySelector("#add-btn");
const removeBtn: HTMLButtonElement | null = document.querySelector("#remove-btn");
const todoList: HTMLElement | null = document.querySelector("#todo-list");
let h1: HTMLHeadingElement | null = document.querySelector("h1");

let newTodo: HTMLLIElement;

addBtn?.addEventListener("click", function() {
    if (todoList) {
        const todoText: string | null = prompt("Please enter a todo");

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

removeBtn?.addEventListener("click", function() {
    if (todoList) {
        const lastElement = todoList.lastElementChild;
        if (lastElement) {
            todoList.removeChild(lastElement);
        }
    }
});

