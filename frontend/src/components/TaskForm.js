import { useEffect, useState } from "react";

export default function TaskForm({
  onAddTask,
  onUpdateTask,
  editingTask,
  onCancelEdit,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setError("");
    } else {
      setTitle("");
      setDescription("");
      setPriority("low");
      setError("");
    }
  }, [editingTask]);

  async function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") {
      setError("Title is required.");
      return;
    }

    setError("");

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: editingTask ? editingTask.completed : false,
    };

    let success = false;

    if (editingTask) {
      success = await onUpdateTask(editingTask.id, taskData);
    } else {
      success = await onAddTask(taskData);
    }

    if (success && !editingTask) {
      setTitle("");
      setDescription("");
      setPriority("low");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>
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
      <div className="form-actions">
        <button type="submit">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
        {editingTask && (
          <button type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
