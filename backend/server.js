import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

let tasks = [];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Task manager API is running");
});

app.get("/api/tasks", (req, res) => {
  res.status(200).json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
