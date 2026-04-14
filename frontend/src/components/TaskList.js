import TaskItem from "./TaskItem";

export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p>There's no tasks to do.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}
