// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./todos.db');

app.use(bodyParser.json());
app.use(cors());

const port = 3000;

// Initialize the database and create the 'todos' table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY,
      description TEXT,
      dueDate TEXT,
      priority INTEGER
    )
  `);
});

// GET all todos
app.get('/todos', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

// POST a new todo
app.post('/todos', (req, res) => {
  const { description, dueDate, priority } = req.body;
  const stmt = db.prepare('INSERT INTO todos (description, dueDate, priority) VALUES (?, ?, ?)');
  stmt.run(description, dueDate, priority, err => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json({ message: 'Todo added successfully' });
    }
  });
  stmt.finalize();
});

// PUT (update) a todo by ID
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { description, dueDate, priority } = req.body;
  const stmt = db.prepare('UPDATE todos SET description=?, dueDate=?, priority=? WHERE id=?');
  stmt.run(description, dueDate, priority, id, err => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Todo updated successfully' });
    }
  });
  stmt.finalize();
});

// DELETE a todo by ID
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM todos WHERE id=?');
  stmt.run(id, err => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json({ message: 'Todo deleted successfully' });
    }
  });
  stmt.finalize();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
