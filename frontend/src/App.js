import { useEffect, useState } from "react";
import "./styles/App.css";
import { createTask, getTasks } from "./services/api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  });

  async function handleAddTask(taskData) {
    try {
      const newTask = await createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      setError("");
      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  }

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <TaskForm onAddTask={handleAddTask} />

      {loading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <TaskList tasks={tasks} />}
    </div>
  );
}

export default App;
