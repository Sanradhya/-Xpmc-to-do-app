document.addEventListener('DOMContentLoaded', () => {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  const addBtn = document.getElementById('add-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const themeBtn = document.getElementById('theme-btn');
  const totalTasksCount = document.getElementById('total-tasks');
  const completedTasksCount = document.getElementById('completed-tasks');
  const dueDateInput = document.getElementById('due-date');

  let filter = 'all';

  // Render To-Do List
  const renderTodos = () => {
    todoList.innerHTML = '';
    let filteredTodos = todos;

    if (filter === 'completed') {
      filteredTodos = todos.filter(todo => todo.completed);
    } else if (filter === 'pending') {
      filteredTodos = todos.filter(todo => !todo.completed);
    }

    filteredTodos.forEach(todo => {
      const li = document.createElement('li');
      li.className = todo.completed ? 'completed' : '';
      li.innerHTML = `
        <span>${todo.title} - Due: ${todo.dueDate || 'No Due Date'}</span>
        <div>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      todoList.appendChild(li);

      // Edit Todo
      li.querySelector('.edit-btn').addEventListener('click', () => {
        const newTitle = prompt('Edit Task:', todo.title);
        if (newTitle !== null && newTitle.trim()) {
          todo.title = newTitle.trim();
          updateTodos();
        }
      });

      // Delete Todo
      li.querySelector('.delete-btn').addEventListener('click', () => {
        todos = todos.filter(t => t !== todo);
        updateTodos();
      });

      // Toggle Complete
      li.addEventListener('click', () => {
        todo.completed = !todo.completed;
        updateTodos();
      });
    });

    updateTaskCount();
  };

  const updateTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  };

  const updateTaskCount = () => {
    totalTasksCount.textContent = todos.length;
    completedTasksCount.textContent = todos.filter(todo => todo.completed).length;
  };

  // Add New Todo
  addBtn.addEventListener('click', () => {
    const title = todoInput.value.trim();
    const dueDate = dueDateInput.value;

    if (title) {
      todos.push({ title, completed: false, dueDate });
      updateTodos();
      todoInput.value = '';
      dueDateInput.value = '';
    }
  });

  // Filter Todos
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filter = btn.dataset.filter;
      renderTodos();
    });
  });

  // Theme Toggle
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  renderTodos();
});

