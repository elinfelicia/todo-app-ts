const addBtn: HTMLButtonElement | null = document.querySelector("#add-btn");
const removeBtn: HTMLButtonElement | null = document.querySelector("#remove-btn");
const todoList: HTMLElement | null = document.querySelector("#todo-list");
let todoIdCounter: number = 0;

addBtn?.addEventListener("click", function() {
    if (todoList) {
        const todoText: string | null = prompt("Please enter a todo");
        
        function addTodoFn() {
            if (todoList && todoText) {
                const todoId = ++todoIdCounter; 
                const todoDiv = document.createElement('div');
                todoDiv.classList.add('todo-item'); 
                todoDiv.dataset.todoId = String(todoId); 
                todoDiv.innerHTML = `
                    ID: ${todoId}
                    <p>${todoText}</p>
                    <button class="edit-btn">Edit</button>
                    <button class="remove-btn">Remove</button>
                `;
                todoList.appendChild(todoDiv);
                
                const editBtn = todoDiv.querySelector('.edit-btn');
                const removeBtn = todoDiv.querySelector('.remove-btn');
                if (editBtn) {
                    editBtn.addEventListener('click', function() {
                        const newText = prompt("Update ToDo");
                        if (newText) {
                            todoDiv.querySelector('p')!.textContent = newText;
                        }
                    });
                }
                if (removeBtn) {
                    removeBtn.addEventListener('click', function() {
                        todoList.removeChild(todoDiv);
                    });
                }
            }
        }

        addTodoFn();
    }
});
