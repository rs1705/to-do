import { doc, setDoc } from "firebase/firestore";
import { db } from "./Firebase.js";
const todos = [
  {
    id: "1",
    title: "Build Todo App",
    description: "Create a complete todo app using React",
    isCompleted: false,
    priority: "high",
    dueDate: "2025-07-21",
    createdAt: "2025-07-17T10:00:00.000Z",
    tags: ["react", "frontend", "project", "context-api"],
    subtasks: [
      { id: "1-1", title: "Set up project structure", isCompleted: true },
      { id: "1-2", title: "Create context and reducer", isCompleted: false },
    ],
  },
  {
    id: "2",
    title: "Study JavaScript",
    description: "Revise promises, async/await, and ES6 features",
    isCompleted: false,
    priority: "medium",
    dueDate: "2025-07-22",
    createdAt: "2025-07-17T11:15:00.000Z",
    tags: ["javascript", "es6", "promises", "async-await", "learning"],
    subtasks: [
      { id: "2-1", title: "Review closures", isCompleted: true },
      { id: "2-2", title: "Practice arrow functions", isCompleted: false },
    ],
  },
  {
    id: "3",
    title: "Apply for Frontend Jobs",
    description: "Update resume and apply to 5 companies",
    isCompleted: false,
    priority: "high",
    dueDate: "2025-07-19",
    createdAt: "2025-07-17T12:00:00.000Z",
    tags: ["jobs", "frontend", "career", "resume"],
    subtasks: [],
  },
];

try {
  const docRef = doc(db, "todoData", "user_2");
  await setDoc(docRef, { todos });

  console.log(docRef.id);
} catch (e) {
  console.log(e);
}

// Collections are bold, documents are regular.

// **todoData** (Collection)
//   **{userId}** (Document for a specific user, e.g., 'user123')
//     **userTodos** (Subcollection of todos for that user)
//       **{todoId_1}** (Document representing a single todo item, e.g., '1' from your example)
//         id: "1"
//         title: "Build Todo App"
//         description: "Create a complete todo app using React"
//         isCompleted: false
//         priority: "high"
//         dueDate: "2025-07-21"
//         createdAt: "2025-07-17T10:00:00.000Z"
//         tags: ["react", "frontend", "project", "context-api"]
//         subtasks: [  // This array is usually fine within a todo document
//           { id: "1-1", title: "Set up project structure", isCompleted: true },
//           { id: "1-2", title: "Create context and reducer", isCompleted: false },
//         ]
//       **{todoId_2}** (Document representing another todo item, e.g., '2')
//         id: "2"
//         title: "Study JavaScript"
//         description: "Revise promises, async/await, and ES6 features"
//         isCompleted: false
//         priority: "medium"
//         dueDate: "2025-07-22"
//         createdAt: "2025-07-17T11:15:00.000Z"
//         tags: ["javascript", "es6", "promises", "async-await", "learning"]
//         subtasks: [
//           { id: "2-1", title: "Review closures", isCompleted: true },
//           { id: "2-2", title: "Practice arrow functions", isCompleted: false },
//         ]
//       **{todoId_3}** (Document representing the third todo item, e.g., '3')
//         id: "3"
//         title: "Apply for Frontend Jobs"
//         description: "Update resume and apply to 5 companies"
//         isCompleted: false
//         priority: "high"
//         dueDate: "2025-07-19"
//         createdAt: "2025-07-17T12:00:00.000Z"
//         tags: ["jobs", "frontend", "career", "resume"]
//         subtasks: []
