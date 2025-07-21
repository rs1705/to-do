import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import todoReducer from "./todoReducer";
import * as actions from "./todoActions";
import { db } from "../firebase/Firebase";
import { AuthContext } from "./AuthContext";
import { doc, setDoc } from "firebase/firestore";
import {
  fetchTodosFromFirestore,
  removeTodoFromFirestore,
  updateTodoToFireStore,
} from "../firebase/todoService";
import TODOS from "../demo_data/Todos";
const initialState = {
  todos: [],
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
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchTodosFromFirestore(user.uid).then((todos) => {
        loadTodos(todos);
      });
    } else {
      loadTodos(TODOS);
    }
  }, [user]);

  const addTodo = async (todo) => {
    if (user) {
      try {
        await setDoc(
          doc(db, "todoData", user.uid, "userTodos", todo.id),
          todo,
          { merge: true }
        );

        dispatch({ type: actions.ADD_TODO, payload: todo });
      } catch (error) {
        console.log("Error adding todo: ", error.message);
      }
    } else {
      dispatch({ type: actions.ADD_TODO, payload: todo });
    }
  };

  const loadTodos = (todos) => {
    dispatch({ type: actions.L0AD_TODOS, payload: todos });
  };

  const removeTodo = async (id) => {
    if (user) {
      try {
        await removeTodoFromFirestore(user.uid, id);
        dispatch({ type: actions.REMOVE_TODO, payload: id });
      } catch (e) {
        console.log(e.message);
      }
    } else {
      dispatch({ type: actions.REMOVE_TODO, payload: id });
    }
  };
  const editTodo = async (id, data) => {
    if (user) {
      try {
        await updateTodoToFireStore(user.uid, id, data);
        dispatch({ type: actions.EDIT_TODO, payload: { id, data } });
      } catch (e) {
        console.log(e.message);
      }
    } else dispatch({ type: actions.EDIT_TODO, payload: { id, data } });
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
