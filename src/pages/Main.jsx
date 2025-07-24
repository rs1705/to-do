import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import NewTodo from "../components/NewTodo";
import TodoItem from "../components/todoItem";
import AuthPage from "./Auth";
import Signup from "../components/Signup";
const Home = () => {
  const todos = useContext(TodoContext).todos;
  const selectedId = useContext(TodoContext).selectedId;
  const selectedTodo = todos.find((todo) => todo.id === selectedId);
  let content;

  if (selectedId === null) {
    content = (
      <div className="text-center my-40">
        <p className="font-semibold text-slate-500">
          {todos.length > 0
            ? "No task is selected currently. Select a task to see details."
            : "There are no tasks currently. Click add button to get started."}
        </p>
      </div>
    );
  } else if (selectedId === "add") {
    content = (
      <div className="mt-40 ml-2 border-2 border-slate-300 rounded-xl py-5 px-2 w-[100%]">
        <h1 className="text-2xl font-semibold text-center">Create New Task</h1>
        <p className="text-sm text-slate-500 text-center mb-2">
          Enter below details to create a new Task
        </p>
        <NewTodo />
      </div>
    );
  } else if (selectedId === "signin") {
    content = <AuthPage />;
  } else if (selectedId === "signup") {
    content = <Signup />;
  } else {
    content = (
      <div className="mt-40">
        {selectedTodo && <TodoItem item={selectedTodo} />}
      </div>
    );
  }
  return <div className="content-container">{content}</div>;
};

export default Home;
