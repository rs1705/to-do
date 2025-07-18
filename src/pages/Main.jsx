import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItem from "../components/todoItem";
const Home = ({ selectedId }) => {
  const todos = useContext(TodoContext).todos;
  const selectedTodo = todos.find((todo) => todo.id === selectedId);
  let content =
    selectedId === null ? (
      <div className="mt-50 text-center">
        <p className="font-semibold">
          There are no tasks yet. Click add button to get started
        </p>
      </div>
    ) : (
      <div className="mt-50">
        <TodoItem item={selectedTodo} />
      </div>
    );

  return <div className="content-container w-[50%]">{content}</div>;
};

export default Home;
