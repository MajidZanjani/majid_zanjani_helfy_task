import { useEffect, useMemo, useState } from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onToggle }) {
  const extendedTasks = useMemo(() => {
    if (tasks.length === 0) return [];
    if (tasks.length === 1) return [...tasks];
    return [tasks[tasks.length - 1], ...tasks, tasks[0]];
  }, [tasks]);

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

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

  function handleNext() {
    setCurrentIndex((prev) => prev + 1);
  }

  function handlePrev() {
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
    <div className="carousel-wrapper">
      <button className="carousel-btn" onClick={handlePrev}>
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
              <TaskItem task={task} onDelete={onDelete} onToggle={onToggle} />
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-btn" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
