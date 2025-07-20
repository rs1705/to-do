import { createContext, useReducer, useState } from "react";
import todoReducer from "./todoReducer";
import * as actions from "./todoActions";
const initialState = {
  todos: [
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
    {
      id: "10",
      title: "Backup Codebase",
      description: "Push all recent changes to GitHub",
      isCompleted: false,
      priority: "low",
      dueDate: "2025-07-18",
      createdAt: "2025-07-17T15:30:00.000Z",
      tags: ["git", "github", "version-control", "backup"],
      subtasks: [
        { id: "10-1", title: "Commit changes", isCompleted: true },
        { id: "10-2", title: "Push to repo", isCompleted: false },
      ],
    },
  ],
};
export const TodoContext = createContext({
  todos: [],
  selectedId: false,
  setSelectedId: () => {},
  addTodo: () => {},
  removeTodo: () => {},
  editTodo: () => {},
  finishTodo: () => {},
  addSubtask: () => {},
  removeSubtask: () => {},
  editSubtask: () => {},
  finishSubtask: () => {},
});
const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [selectedId, setSelectedId] = useState(null);

  const addTodo = (todo) => {
    dispatch({ type: actions.ADD_TODO, payload: todo });
  };
  const removeTodo = (id) => {
    dispatch({ type: actions.REMOVE_TODO, payload: id });
  };
  const editTodo = (id, data) => {
    console.log("called edit function");
    console.log(data);
    dispatch({ type: actions.EDIT_TODO, payload: { id, data } });
  };
  const finishTodo = (id) => {
    dispatch({ type: actions.FINISH_TODO, payload: id });
  };
  const addSubtask = (todoId, subtask) => {
    dispatch({ type: actions.ADD_SUBTASK, payload: { todoId, subtask } });
  };
  const removeSubtask = (todoId, subtaskId) => {
    dispatch({ type: actions.REMOVE_SUBTASK, payload: { todoId, subtaskId } });
  };
  const editSubtask = (todoId, subtaskId, data) => {
    dispatch({
      type: actions.EDIT_SUBTASK,
      payload: { todoId, subtaskId, data },
    });
  };
  const finishSubtask = (parentId, subtaskId) => {
    dispatch({
      type: actions.FINISH_SUBTASK,
      payload: { parentId, subtaskId },
    });
  };

  const todoCtx = {
    todos: state.todos,
    selectedId,
    setSelectedId,
    addTodo,
    removeTodo,
    editTodo,
    finishTodo,
    addSubtask,
    removeSubtask,
    editSubtask,
    finishSubtask,
  };

  return (
    <TodoContext.Provider value={todoCtx}>{children}</TodoContext.Provider>
  );
};

export default TodoProvider;
