export default function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Status:</strong> {task.completed ? "Completed" : "Pending"}
      </p>

      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>
          {task.completed ? "Mark as Pending" : "Mark as Completed"}
        </button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
