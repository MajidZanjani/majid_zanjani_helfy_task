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

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        setError("Couldn't load tasks. Please check your connection.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

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

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <TaskForm
        onAddTask={handleAddTask}
        onUpdateTask={handleUpdateTask}
        editingTask={editingTask}
        onCancelEdit={handleCancelEdit}
      />

      {loading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <TaskList
          tasks={tasks}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEditTask}
        />
      )}
    </div>
  );
}

export default App;
