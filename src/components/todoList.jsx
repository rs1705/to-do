import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

import TodoItem from "./todoItem";
const TodoList = () => {
  const todoCtx = useContext(TodoContext);
  const todos = todoCtx.todos;
  console.log(todos);
  return (
    <div className="flex flex-col w-full h-full">
      {todos.length > 0 ? (
        todos.map(
          (item, count = 1) => (
            count++, (<TodoItem key={item.id} details={item} count={count} />)
          )
        )
      ) : (
        <div>No items found</div>
      )}
    </div>
  );
};

export default TodoList;
