const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// In-memory database to store todos
let todos = [];

// Middleware
app.use(cors()); // Allows API access from different domains (front-end)
app.use(express.json()); // Parses JSON request bodies

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Create a new todo
app.post('/api/todos', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  const newTodo = {
    id: uuidv4(),
    title: title,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Toggle completion status
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(todo => todo.id === id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  todo.completed = !todo.completed;
  res.status(200).json(todo);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(todo => todo.id !== req.params.id);
  res.status(200).json({ message: 'Todo deleted' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
