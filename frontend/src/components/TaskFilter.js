export default function TaskFilter({ currentFilter, onFilterChange }) {
  return (
    <div className="task-filter">
      <button
        className={currentFilter === "all" ? "active-filter" : ""}
        onClick={() => onFilterChange("all")}
      >
        All
      </button>
      <button
        className={currentFilter === "completed" ? "active-filter" : ""}
        onClick={() => onFilterChange("completed")}
      >
        Completed
      </button>
      <button
        className={currentFilter === "pending" ? "active-filter" : ""}
        onClick={() => onFilterChange("pending")}
      >
        Pending
      </button>
    </div>
  );
}
