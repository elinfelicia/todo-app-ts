const addBtn: HTMLButtonElement | null = document.querySelector("#add-btn");
const removeBtn: HTMLButtonElement | null = document.querySelector(".remove-btn");
const clearBtn: HTMLButtonElement | null = document.querySelector("#remove-all-btn")
const todoList: HTMLUListElement | null = document.querySelector("#todo-list");
const todoInput: HTMLInputElement | null = document.querySelector("#todo-input");

const savedTodos = localStorage.getItem('todos');
const todos: { id: number; text: string; }[] = savedTodos ? JSON.parse(savedTodos) : [];

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');
        todoDiv.dataset.todoId = String(todo.id);
        todoDiv.innerHTML = `
            <input type="checkbox" class="done-box">
            <p>${todo.text}</p>
            <div class="item-btns">
                <button class="item-btn" id="edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button class="item-btn remove-btn" id="remove-btn"><i class="fa-solid fa-trash-can"></i></button>
            </div>
        `;
        todoList.appendChild(todoDiv);
        
        const editBtn = todoDiv.querySelector('#edit-btn');
        const removeBtn = todoDiv.querySelector('#remove-btn');
        const doneBox = todoDiv.querySelector(".done-box") as HTMLInputElement;

        doneBox.addEventListener('change', function() {
            if (doneBox.checked) {
                todoDiv.classList.add('completed');
            } else {
                todoDiv.classList.remove('completed');
            }
 
            updateTodoState(todo.id, doneBox.checked);
        });

        if (editBtn) {
            editBtn.addEventListener('click', function() {
                const newText = prompt("Please enter the updated todo text");
                if (newText) {
                    todoDiv.querySelector('p')!.textContent = newText;
                    const updatedTodo = todos.find(t => t.id === todo.id);
                    if (updatedTodo) updatedTodo.text = newText;
                    localStorage.setItem('todos', JSON.stringify(todos));
                }
            });
        }
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                todoList.removeChild(todoDiv);
                const index = todos.findIndex(t => t.id === todo.id);
                if (index !== -1) {
                    todos.splice(index, 1);
                    localStorage.setItem('todos', JSON.stringify(todos));
                    updateTodoState(todo.id, doneBox.checked=false);
                }
            });
        }

        const savedState = localStorage.getItem(`todo_${todo.id}_state`);
        if (savedState) {
            doneBox.checked = savedState === 'true';
            if (doneBox.checked) {
                todoDiv.classList.add('completed');
            }
        }
    });
}

function updateTodoState(todoId: number, isChecked: boolean) {
    localStorage.setItem(`todo_${todoId}_state`, String(isChecked));
};


addBtn?.addEventListener("click", function() {
    if (todoInput && todoInput.value.trim() !== '') {
        const todoId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
        const todoText = todoInput.value.trim();
        todos.push({ id: todoId, text: todoText });
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
