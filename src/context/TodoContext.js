import { createContext, useReducer } from "react";
import todoReducer from "./todoReducer";
import * as actions from "./todoActions";
const initialState = {
  todos: [],
};
export const TodoContext = createContext();
const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const addTodo = (todo) => {
    dispatch({ type: actions.ADD_TODO, payload: todo });
  };
  const removeTodo = (id) => {
    dispatch({ type: actions.REMOVE_TODO, payload: id });
  };
  const editTodo = (id, data) => {
    dispatch({ type: actions.EDIT_TODO, payload: { id, data } });
  };
  const starTodo = (id) => {
    dispatch({ type: actions.STAR_TODO, payload: id });
  };
  const addSubtask = (taskId, subtask) => {
    dispatch({ type: actions.ADD_SUBTASK, payload: { taskId, subtask } });
  };
  const removeSubtask = (taskId, subtaskId) => {
    dispatch({ type: actions.REMOVE_SUBTASK, payload: { taskId, subtaskId } });
  };
  const editSubtask = (taskId, subtaskId, data) => {
    dispatch({
      type: actions.EDIT_SUBTASK,
      payload: { taskId, subtaskId, data },
    });
  };
  const todoCtx = {
    todos: state.todos,
    addTodo,
    removeTodo,
    editTodo,
    starTodo,
    addSubtask,
    removeSubtask,
    editSubtask,
  };

  return (
    <TodoContext.Provider value={todoCtx}>{children}</TodoContext.Provider>
  );
};

export default TodoProvider;
