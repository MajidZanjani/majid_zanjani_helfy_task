import express from "express";
import validateTask from "../middleware/validateTask.js";

const router = express.Router();

let tasks = [];
let nextId = 1;

// get all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// post new task
router.post("/", validateTask, (req, res) => {
  const { title, description, priority } = req.body;

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
router.put("/:id", validateTask, (req, res) => {
  const id = Number(req.params.id);
  const { title, description, priority, completed } = req.body;

  const task = tasks.find((task) => task.id === id);
  if (!task) {
    return res.status(400).json({ message: "Task not found!" });
  }

  task.title = title.trim();
  task.description = description ? description.trim() : "";
  task.priority = priority;
  task.completed = Boolean(completed);
  res.status(200).json(task);
});

// delete task
router.delete("/:id", (req, res) => {
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

// patch toggle
router.patch("/:id/toggle", (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res
      .status(404)
      .json({ message: `There's no task with this ID: ${id}.` });
  }

  task.completed = !task.completed;
  res.status(200).json({ message: "Completion toggled." });
});

export default router;
