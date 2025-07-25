import * as actions from "./todoActions";
const todoReducer = (state, action) => {
  switch (action.type) {
    case actions.LOAD_TODOS: {
      return {
        ...state,
        todos: action.payload,
      };
    }
    case actions.ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }
    case actions.REMOVE_TODO: {
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return { ...state, todos: filteredTodos };
    }
    case actions.EDIT_TODO: {
      const editedTodos = state.todos.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.data }
          : item
      );
      return { ...state, todos: editedTodos };
    }
    case actions.FINISH_TODO: {
      const updatedTodos = state.todos.map((item) =>
        item.id === action.payload
          ? { ...item, isCompleted: !item.isCompleted }
          : item
      );
      return { ...state, todos: updatedTodos };
    }
    case actions.ADD_SUBTASK: {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.parentId
          ? { ...todo, subtasks: [...todo.subtasks, action.payload.subtask] }
          : todo
      );
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case actions.REMOVE_SUBTASK: {
      const updatedTodos = state.todos.map((item) =>
        item.id === action.payload.parentId
          ? {
              ...item,
              subtasks: item.subtasks.filter(
                (subtask) => subtask.id !== action.payload.subtaskId
              ),
            }
          : item
      );
      return { ...state, todos: updatedTodos };
    }
    case actions.EDIT_SUBTASK: {
      const updatedTodos = state.todos.map((item) =>
        item.id === action.payload.parentId
          ? {
              ...item,
              subtasks: item.subtasks.map((subtask) =>
                subtask.id === action.payload.subtaskId
                  ? { ...subtask, ...action.payload.data }
                  : subtask
              ),
            }
          : item
      );

      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case actions.FINISH_SUBTASK: {
      const updatedTodos = state.todos.map((item) =>
        item.id === action.payload.parentId
          ? {
              ...item,
              subtasks: item.subtasks.map((subtask) =>
                subtask.id === action.payload.subtaskId
                  ? { ...subtask, isCompleted: !subtask.isCompleted }
                  : subtask
              ),
            }
          : item
      );
      return { ...state, todos: updatedTodos };
    }

    default:
      return state;
  }
};

export default todoReducer;
