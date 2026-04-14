const API_URL = "http://localhost:4000/api/tasks";

export async function getTasks() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(
      "Failed to fetch tasks from API. Please check your connection.",
    );
  }
  return response.json();
}

export async function createTask(taskData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create task.");
  }

  return data;
}
