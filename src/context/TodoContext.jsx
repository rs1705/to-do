import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import toast from "react-hot-toast";
import todoReducer from "./todoReducer";
import * as actions from "./todoActions";
import { AuthContext } from "./AuthContext";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  removeTodoFromFirestore,
  updateTodoToFirestore,
  addSubtaskToFirestore,
  updateSubtaskToFirestore,
  removeSubtaskFromFirestore,
  addTodotoFirestore,
} from "../firebase/todoService";

const todos = [];
export const TodoContext = createContext({
  todos: [],
  selectedId: null,
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
  const [state, dispatch] = useReducer(todoReducer, { todos });
  const [selectedId, setSelectedId] = useState(null);
  const [hasLoadedGuestTodos, setHasLoadedGuestTodos] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    let unsubscribe;
    if (user) {
      const todosRef = collection(db, "todoData", user.uid, "userTodos");
      unsubscribe = onSnapshot(todosRef, (snapshot) => {
        const todos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        loadTodos(todos);
      });
    } else {
      const guestTodos = JSON.parse(localStorage.getItem("guestTodos"));
      if (guestTodos) loadTodos(guestTodos);
      setHasLoadedGuestTodos(true);
    }

    return () => unsubscribe && unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user && hasLoadedGuestTodos) {
      localStorage.setItem("guestTodos", JSON.stringify(state.todos));
    }
  }, [user, state.todos, hasLoadedGuestTodos]);

  const handleTodoAction = async ({
    firestoreFn,
    localAction,
    successMessage,
    errorMessage,
  }) => {
    if (user) {
      try {
        await firestoreFn();
        toast.success(successMessage);
      } catch (e) {
        toast.error(e.message);
        if (errorMessage) toast.success(errorMessage);
      }
    } else {
      dispatch(localAction);
      if (successMessage) toast.success(successMessage);
    }
  };

  const addTodo = async (todo) => {
    await handleTodoAction({
      firestoreFn: () => addTodotoFirestore(user.uid, todo),
      localAction: { type: actions.ADD_TODO, payload: todo },
      successMessage: "Task added!",
      errorMessage: "Failed to add task!",
    });
  };

  const loadTodos = (todos) => {
    dispatch({ type: actions.LOAD_TODOS, payload: todos });
  };

  const removeTodo = async (id) => {
    await handleTodoAction({
      firestoreFn: () => removeTodoFromFirestore(user.uid, id),
      localAction: { type: actions.REMOVE_TODO, payload: id },
      successMessage: "Task removed!",
      errorMessage: "Failed to remove task!",
    });
  };

  const editTodo = async (id, data) => {
    await handleTodoAction({
      firestoreFn: () => updateTodoToFirestore(user.uid, id, data),
      localAction: { type: actions.EDIT_TODO, payload: { id, data } },
      successMessage: "Task edited successfully!",
      errorMessage: "Couldn't edit the task",
    });
  };

  const finishTodo = async (todoId) => {
    const todo = state.todos.find((t) => t.id === todoId);
    const newStatus = !todo?.isCompleted;
    await handleTodoAction({
      firestoreFn: () => updateTodoToFirestore(user.uid, todoId, null),
      localAction: { type: actions.FINISH_TODO, payload: todoId },
      successMessage: newStatus
        ? "Task marked as completed!"
        : "Task marked as incomplete!",
      errorMessage: "Failed to complete the task!",
    });
  };

  const addSubtask = async (parentId, subtask) => {
    await handleTodoAction({
      firestoreFn: () => addSubtaskToFirestore(user.uid, parentId, subtask),
      localAction: {
        type: actions.ADD_SUBTASK,
        payload: { parentId, subtask },
      },
      successMessage: "Subtask added!",
      errorMessage: "Failed to add subtask!",
    });
  };

  const removeSubtask = async (parentId, subtaskId) => {
    await handleTodoAction({
      firestoreFn: () =>
        removeSubtaskFromFirestore(user.uid, parentId, subtaskId),
      localAction: {
        type: actions.REMOVE_SUBTASK,
        payload: { parentId, subtaskId },
      },
      successMessage: "Subtask deleted!",
      errorMessage: "Failed to delete subtask!",
    });
  };
  const editSubtask = async (parentId, subtaskId, data) => {
    await handleTodoAction({
      firestoreFn: () =>
        updateSubtaskToFirestore(user.uid, parentId, subtaskId, data),
      localAction: {
        type: actions.EDIT_SUBTASK,
        payload: { parentId, subtaskId },
      },
      successMessage: "Subtask updated!",
      errorMessage: "Failed to update subtask title",
    });
  };
  const finishSubtask = async (parentId, subtaskId) => {
    const parentTask = state.todos.find((todo) => todo.id === parentId);
    const subtask = parentTask.subtasks.find((task) => task.id === subtaskId);
    const newStatus = !subtask?.isCompleted;
    await handleTodoAction({
      firestoreFn: () =>
        updateSubtaskToFirestore(user.uid, parentId, subtaskId, null),
      localAction: {
        type: actions.FINISH_SUBTASK,
        payload: { parentId, subtaskId },
      },
      successMessage: newStatus
        ? "Subtask completed!"
        : "Subtask marked as incomplete!",
      errorMessage: "Failed to complete subtask",
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
