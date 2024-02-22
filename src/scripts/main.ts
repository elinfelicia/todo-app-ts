type Todo = {
    id: number;
    text: string;
    done: boolean;
}

const addBtn: HTMLButtonElement | null = document.querySelector("#add-btn");
const removeBtn: HTMLButtonElement | null = document.querySelector(".remove-btn");
const clearBtn: HTMLButtonElement | null = document.querySelector("#remove-all-btn")
const todoList: HTMLUListElement | null = document.querySelector("#todo-list");
const todoInput: HTMLInputElement | null = document.querySelector("#todo-input");

const savedTodos = localStorage.getItem('todos');
const todos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');
        todoDiv.dataset.todoId = String(todo.id);
        todoDiv.innerHTML = `
            <input type="checkbox" class="done-box" ${todo.done ? 'checked' : ''}>
            <p>${todo.text}</p>
            <div class="item-btns">
                <button class="item-btn" id="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="item-btn remove-btn" id="remove-btn"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `;
        todoList.appendChild(todoDiv);
        
        const doneBox = todoDiv.querySelector(".done-box") as HTMLInputElement;

        doneBox.addEventListener('change', function() {
            todo.done = doneBox.checked;
            updateTodoState(todo.id, doneBox.checked);
            if (doneBox.checked) {
                todoDiv.classList.add('completed');
            } else {
                todoDiv.classList.remove('completed');
            }
        });
    });
}

function updateTodoState(todoId: number, isChecked: boolean) {
    localStorage.setItem(`todo_${todoId}_state`, String(isChecked));
};

addBtn?.addEventListener("click", function() {
    if (todoInput && todoInput.value.trim() !== '') {
        const todoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
        const todoText = todoInput.value.trim();
        todos.push({ id: todoId, text: todoText, done: false });
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
        todoInput.value = '';
    }
});

removeBtn?.addEventListener("click", function() {
    todoList.innerHTML = '';
    todos.length = 0;
    localStorage.removeItem('todos');
});

clearBtn?.addEventListener("click", function() {
    localStorage.clear()
})

renderTodos();
