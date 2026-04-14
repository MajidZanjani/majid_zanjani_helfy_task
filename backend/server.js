import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

let tasks = [];
let nextId = 1;

app.use(cors());
app.use(express.json());

// initial get
app.get("/", (req, res) => {
  res.send("Task manager API is running");
});

// get all tasks
app.get("/api/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// post new task
app.post("/api/tasks", (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Task title shouldn't be empty." });
  }

  if (!priority || !["low", "medium", "high"].includes(priority)) {
    return res
      .status(400)
      .json({ message: "Priority should be low, medium or high." });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : "",
    completed: false,
    createdAt: new Date(),
    priority,
  };

  tasks.push(newTask);
  res.status(200).json(newTask);
});

// update task
app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, description, priority, completed } = req.body;

  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res.status(400).json({ message: "Task not found!" });
  }
  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Task title shouldn't be empty." });
  }
  if (!priority || !["low", "medium", "high"].includes(priority)) {
    return res
      .status(400)
      .json({ message: "Priority should be low, medium or high." });
  }

  task.title = title.trim();
  task.description = description ? description.trim() : "";
  task.priority = priority;
  task.completed = Boolean(completed);
  res.status(200).json(task);
});

// delete task
app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res
      .status(404)
      .json({ message: `There's no task with this ID: ${id}.` });
  }

  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: `Task id: ${id} successfully deleted.` });
});

// listening to the port 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
