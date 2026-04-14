import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// routes
app.use("/api/tasks", taskRoutes);

// root route
app.get("/", (req, res) => {
  res.send("Task manager API is running");
});

// error handling middleware
app.use(errorHandler);

// listening to the port 4000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
