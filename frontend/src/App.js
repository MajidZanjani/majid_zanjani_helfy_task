import { useEffect, useState } from "react";
import "./styles/App.css";
import { getTasks } from "./services/api";
import TaskList from "./components/TaskList";

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

  return (
    <div className="app">
      <h1>Task Manager</h1>
      {loading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <TaskList tasks={tasks} />}
    </div>
  );
}

export default App;
