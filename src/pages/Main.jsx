import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import NewTodo from "../components/NewTodo";
import TodoItem from "../components/todoItem";
const Home = () => {
  const todos = useContext(TodoContext).todos;
  const selectedId = useContext(TodoContext).selectedId;
  const selectedTodo = todos.find((todo) => todo.id === selectedId);
  console.log(selectedId);
  let content;

  if (selectedId === null) {
    content = (
      <div className="mx-2 my-40">
        <p className="font-semibold text-amber-500">
          {todos.length > 0
            ? "No task is selected currently. Select a task to see details."
            : "There are no tasks currently. Click add button to get started."}
        </p>
      </div>
    );
  } else if (selectedId === "add") {
    content = (
      <div className="mt-40 ml-2 border-2 rounded-lg py-10 px-2 w-[100%]">
        <h1 className="text-center text-xl">Create new todo</h1>
        <NewTodo />
      </div>
    );
  } else {
    content = (
      <div className="mt-40">
        <TodoItem item={selectedTodo} />
      </div>
    );
  }
  return <div className="content-container">{content}</div>;
};

export default Home;
