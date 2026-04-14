const validateTask = (req, res, next) => {
  const { title, priority } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Task title is required" });
  }

  const validPriorities = ["low", "medium", "high"];
  if (!validPriorities.includes(priority)) {
    return res.status(400).json({
      message: "Task priority should be low, medium, or high",
    });
  }

  next();
};

export default validateTask;
