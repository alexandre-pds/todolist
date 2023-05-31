const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(bodyParser.json());

let tasks = [];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { description } = req.body;
  const newTask = {
    id: Date.now(),
    description,
    completed: false,
  };
  tasks.push(newTask);
  res.json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const updatedTasks = tasks.map((task) => {
    if (task.id === parseInt(id)) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  tasks = updatedTasks;
  res.json(tasks);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.json(tasks);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
