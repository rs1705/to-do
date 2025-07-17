import { createContext, useReducer } from "react";
import todoReducer from "./todoReducer";
import * as actions from "./todoActions";
const initialState = {
  todos: [],
};
export const TodoContext = createContext({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  editTodo: () => {},
  starTodo: () => {},
  addSubtask: () => {},
  removeSubtask: () => {},
  editSubtask: () => {},
});
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
