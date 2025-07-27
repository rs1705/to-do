import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import NewTodo from "../components/Todo/NewTodo";
import TodoItem from "../components/Todo/TodoItem";
import AuthPage from "./Auth";
import Signup from "../components/Auth/Signup";
import Button from "../UI/Button";
const MainContent = () => {
  const todos = useContext(TodoContext).todos;
  const { selectedId, setSelectedId } = useContext(TodoContext);
  const selectedTodo = todos.find((todo) => todo.id === selectedId);
  let content;

  if (selectedId === null) {
    content = (
      <div className="text-center my-40 sm:my-32 md:my-40 px-4">
        <p className="font-semibold text-slate-600">
          {todos.length > 0
            ? "No task is selected currently. Select a task to see details."
            : "There are no tasks currently. Click add button to get started."}
        </p>
        <br />
        <Button
          className="bg-slate-600 hover:bg-slate-500 hover:cursor-pointer py-1 px-2 rounded-md text-slate-100"
          title="+ Add task"
          onClick={() => setSelectedId("add")}
        />
      </div>
    );
  } else if (selectedId === "add") {
    content = (
      <div className="sm:mt-20 md:mt-32 ml-2 border-2 border-slate-300 dark:border-slate-600 rounded-xl py-5 px-4 w-full">
        <h1 className="text-xl sm:text-2xl font-semibold text-center text-slate-700 dark:text-slate-100">
          Create New Task
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-2">
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
      <div className="mt-10 sm:mt-20 md:mt-32 px-4">
        {selectedTodo && <TodoItem item={selectedTodo} />}
      </div>
    );
  }
  return (
    <div className="w-full lg:w-[60%] dark:bg-slate-900  min-h-screen px-2 sm:px-2 py-4 transition-all duration-300">
      {content}
    </div>
  );
};

export default MainContent;
