import { useEffect, useState } from "react";
import "./styles/App.css";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
} from "./services/api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState("light");

  function handleToggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  // load initial tasks from localstorage / updates from backend
  useEffect(() => {
    async function loadTasks() {
      try {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
          setLoading(false);
        }
        const data = await getTasks();
        setTasks(data);
        localStorage.setItem("tasks", JSON.stringify(data));
      } catch (error) {
        setError("Couldn't load tasks. Please check your connection.");
      } finally {
        setLoading(false);
      }
    }
    loadTasks();
  }, []);

  // add new or update tasks to localstorage whenever dependency changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  async function handleAddTask(taskData) {
    try {
      const newTask = await createTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setError("");
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  }

  async function handleUpdateTask(id, taskData) {
    try {
      const updatedTask = await updateTask(id, taskData);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task)),
      );
      setEditingTask(null);
      setError("");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      if (editingTask && editingTask.id === id) {
        setEditingTask(null);
      }
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle(id) {
    try {
      await toggleTask(id);
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEditTask(task) {
    setEditingTask(task);
    setError("");
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }
    if (filter === "pending") {
      return !task.completed;
    }
    return true;
  });

  return (
    <div className={`app ${theme}-theme`}>
      <div className="top-bar">
        <h1>Task Manager</h1>
        <button className="theme-toggle-btn" onClick={handleToggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>

      <TaskForm
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        editingTask={editingTask}
        onCancelEdit={handleCancelEdit}
      />
      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

      {loading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <TaskList
          tasks={filteredTasks}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEditTask}
        />
      )}
    </div>
  );
}

export default App;
