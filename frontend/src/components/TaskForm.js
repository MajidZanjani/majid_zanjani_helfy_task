import { useState } from "react";

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") {
      setError("Title is required.");
      return;
    }

    setError("");

    const newTask = {
      title: title.trim(),
      description: description.trim(),
      priority,
    };

    const success = await onAddTask(newTask);

    if (success) {
      setTitle("");
      setDescription("");
      setPriority("low");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      {error && <p className="form-error">{error}</p>}

      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <textarea
        placeholder="Task description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <select
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Add Task</button>
    </form>
  );
}
