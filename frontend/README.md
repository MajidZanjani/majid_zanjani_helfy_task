# Task Manager App

A full-stack Task Manager application built with **React**, **Express.js**, and **Node.js**. This project allows users to create, view, update, delete, and manage tasks through an interface featuring an **endless animated carousel**.

## Backend Setup

1. cd backend
2. npm install
3. npm start (runs on port 4000)

## Frontend Setup

1. cd frontend
2. npm install
3. npm start (runs on port 3000)

## API Endpoints

- GET /api/tasks
- POST /api/tasks
- PUT /api/tasks/:id
- DELETE /api/tasks/:id
- PATCH /api/tasks/:id/toggle

### Backend (Express.js & Node.js)

- RESTful API with proper HTTP methods
- In-memory data storage (no database required)
- Input validation using middleware
- Error handling with meaningful status codes
- CORS support for frontend-backend communication

### Frontend (React)

- Endless animated carousel with smooth transitions
- Create, edit, delete, and toggle tasks
- Filter tasks by **All**, **Completed**, and **Pending**
- Auto-sliding carousel with pause-on-hover
- Responsive design using pure CSS
- Seamless integration with backend APIs
- Loading states and error handling

## Task Model

Each task follows the structure:

```json
{
  "id": 1,
  "title": "Complete Assignment",
  "description": "Build Task Manager App",
  "completed": false,
  "createdAt": "2026-01-01T12:00:00.000Z",
  "priority": "high"
}
```

**Priority Options:**

- `low`
- `medium`
- `high`

## Testing the API with Postman

- Create new task:
  **POST** `/api/tasks`

```json
{
  "title": "Learn React",
  "description": "Study hooks and state management",
  "priority": "high"
}
```

- Toggle task completion:
  **PATCH** `/api/tasks/1/toggle`

- Update task:
  **PUT** `/api/tasks/1`

```json
{
  "title": "Learn React in Depth",
  "description": "Study advanced hooks",
  "priority": "medium",
  "completed": false
}
```

- Delete a task:
  **DELETE** `/api/tasks/1`

## Concepts Demonstrated

- React Hooks (`useState`, `useEffect`, `useMemo`)
- Component-based architecture
- RESTful API design
- Express middleware usage
- Asynchronous JavaScript (`async/await`)
- State management and props
- Infinite carousel logic
- Error handling and validation

## Time Allocation (approximate)

| Task                   | Estimated Time |
| ---------------------- | -------------- |
| Backend API            | 120 minutes    |
| Frontend Core Features | 120 minutes    |
| Styling & Carousel     | 30 minutes     |
| Testing & Debugging    | 90 minutes     |

## Author

**Majid Zanjani**

- GitHub: https://github.com/MajidZanjani
- LinkedIn: https://www.linkedin.com/
