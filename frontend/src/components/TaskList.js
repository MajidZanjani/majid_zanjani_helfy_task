import { useEffect, useMemo, useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggle, onEdit }) {
  const extendedTasks = useMemo(() => {
    if (tasks.length === 0) return [];
    if (tasks.length === 1) return [...tasks];
    return [tasks[tasks.length - 1], ...tasks, tasks[0]];
  }, [tasks]);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (tasks.length > 1) {
      setCurrentIndex(1);
    } else {
      setCurrentIndex(0);
    }
  }, [tasks.length]);

  useEffect(() => {
    if (!isTransitionEnabled) {
      const timeout = setTimeout(() => {
        setIsTransitionEnabled(true);
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [isTransitionEnabled]);

  useEffect(() => {
    if (tasks.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [tasks.length, isPaused]);

  function handleNext() {
    if (tasks.length <= 1) return;
    setCurrentIndex((prev) => prev + 1);
  }

  function handlePrev() {
    if (tasks.length <= 1) return;
    setCurrentIndex((prev) => prev - 1);
  }

  function handleTransitionEnd() {
    if (tasks.length <= 1) return;
    if (currentIndex === extendedTasks.length - 1) {
      setIsTransitionEnabled(false);
      setCurrentIndex(1);
    } else if (currentIndex === 0) {
      setIsTransitionEnabled(false);
      setCurrentIndex(tasks.length);
    }
  }

  if (tasks.length === 0) {
    return <p>There's no tasks to do.</p>;
  }

  return (
    <div
      className="carousel-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <button
        className="carousel-btn"
        onClick={handlePrev}
        disabled={tasks.length <= 1}
      >
        Prev
      </button>

      <div className="carousel-viewport">
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitionEnabled ? "transform 0.4s ease" : "none",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedTasks.map((task, index) => (
            <div className="carousel-slide" key={`${task.id}-${index}`}>
              <TaskItem
                task={task}
                onDelete={onDelete}
                onToggle={onToggle}
                onEdit={onEdit}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="carousel-btn"
        onClick={handleNext}
        disabled={tasks.length <= 1}
      >
        Next
      </button>
    </div>
  );
}
