import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import todoReducer from "./todoReducer";
import * as actions from "./todoActions";
import { AuthContext } from "./AuthContext";
import {
  fetchTodosFromFirestore,
  removeTodoFromFirestore,
  updateTodoToFirestore,
  addSubtaskToFirestore,
  updateSubtaskToFirestore,
  removeSubtaskFromFirestore,
  addTodotoFirestore,
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
        await addTodotoFirestore(user.uid, todo);
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
        await updateTodoToFirestore(user.uid, id, data);
        dispatch({ type: actions.EDIT_TODO, payload: { id, data } });
      } catch (e) {
        console.log(e.message);
      }
    } else dispatch({ type: actions.EDIT_TODO, payload: { id, data } });
  };

  const finishTodo = async (todoId) => {
    if (user) {
      try {
        await updateTodoToFirestore(user.uid, todoId, null);
        dispatch({ type: actions.FINISH_TODO, payload: todoId });
      } catch (e) {
        console.log(e.message);
      }
    } else dispatch({ type: actions.FINISH_TODO, payload: todoId });
  };

  const addSubtask = async (parentId, subtask) => {
    if (user) {
      try {
        await addSubtaskToFirestore(user.uid, parentId, subtask);
        dispatch({ type: actions.ADD_SUBTASK, payload: { parentId, subtask } });
      } catch (e) {
        console.log(e.message);
      }
    } else
      dispatch({ type: actions.ADD_SUBTASK, payload: { parentId, subtask } });
  };

  const removeSubtask = async (parentId, subtaskId) => {
    if (user) {
      try {
        await removeSubtaskFromFirestore(user.uid, parentId, subtaskId);
        dispatch({
          type: actions.REMOVE_SUBTASK,
          payload: { parentId, subtaskId },
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      dispatch({
        type: actions.REMOVE_SUBTASK,
        payload: { parentId, subtaskId },
      });
    }
  };
  const editSubtask = async (parentId, subtaskId, data) => {
    if (user) {
      try {
        await updateSubtaskToFirestore(user.uid, parentId, subtaskId, data);
        dispatch({
          type: actions.EDIT_SUBTASK,
          payload: { parentId, subtaskId },
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      dispatch({
        type: actions.EDIT_SUBTASK,
        payload: { parentId, subtaskId },
      });
    }
  };
  const finishSubtask = async (parentId, subtaskId) => {
    if (user) {
      try {
        await updateSubtaskToFirestore(user.uid, parentId, subtaskId, null);
        dispatch({
          type: actions.FINISH_SUBTASK,
          payload: { parentId, subtaskId },
        });
      } catch (e) {
        console.log(e.message);
      }
    } else {
      dispatch({
        type: actions.FINISH_SUBTASK,
        payload: { parentId, subtaskId },
      });
    }
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
