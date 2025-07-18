import Button from "../UI/Button";
import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";
const Sidebar = ({ onSelectId }) => {
  const todos = useContext(TodoContext).todos;

  const todoClickHandler = (id) => {
    onSelectId(id);
  };

  return (
    <div className="bg-slate-900 text-stone-100 sidebar ">
      <span>
        <Button
          title="login"
          className="bg-slate-300 hover:bg-slate-400 hover: text-slate-500 text-slate-900 py-1 px-2 rounded hover:cursor-pointer"
        />
      </span>
      <div className="mt-16  text-center">
        <h1 className="text-3xl font-bold">Todo Manager</h1>
        <p>Welcome user!</p>
      </div>
      <div className="mt-16  text-center">
        <Button
          className="bg-slate-300 hover:bg-slate-400 hover:cursor-pointer py-1 px-2 rounded text-slate-900"
          title="+ Add task&nbsp;"
        />
      </div>
      <div className="mt-2">
        {!todos.length > 0 && (
          <p className="text-red-400">
            Nothing here. Start by clicking the add task button
          </p>
        )}
        {todos.length > 0 && (
          <div>
            <p className="text-center">
              <span>Your tasks {`(${todos.length})`}</span>
            </p>
            <ol>
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className="list-disc hover:bg-slate-500 pl-2 p-1 hover:text-slate-200 hover:cursor-pointer text-md"
                  onClick={() => todoClickHandler(todo.id)}
                >
                  {todo.title}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
