import Button from "../UI/Button";
import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";
import userLogo from "../assets/userLogo.png";
const Sidebar = () => {
  const todos = useContext(TodoContext).todos;
  const { setSelectedId, selectedId } = useContext(TodoContext);
  const selectTodoHandler = (id) => {
    setSelectedId(id);
  };

  const createTodoHandler = () => {
    setSelectedId("add");
  };

  const loginClickHandler = () => {
    setSelectedId("login");
  };
  return (
    <div className="bg-slate-900 text-stone-100 sidebar ">
      <div className="relative top-1 left-55">
        <Button
          className="bg-slate-300 hover:bg-slate-400 hover:cursor-pointer py-1 px-2 rounded text-slate-900"
          title="Login"
          onClick={loginClickHandler}
        />
      </div>
      <div className="mt-16  text-center">
        <h1 className="text-3xl font-bold">Todo Manager</h1>
        <div className="flex flex-col items-center">
          <p className="mb-2">Welcome guest!</p>
          <img
            src={userLogo}
            alt="user-image"
            className="w-[80px] h-[80px] rounded-full bg-amber-50"
          />
        </div>
      </div>
      <div className="mt-5 text-center flex flex-col">
        <Button
          className="bg-slate-300 hover:bg-slate-400 hover:cursor-pointer py-1 px-2 rounded text-slate-900"
          title="+ Add task&nbsp;"
          onClick={createTodoHandler}
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
                  className={`list-disc hover:bg-slate-500 pl-2 p-1 hover:text-slate-200 hover:cursor-pointer text-md ${
                    todo.id === selectedId ? "bg-slate-500 text-white" : ""
                  }`}
                  onClick={() => selectTodoHandler(todo.id)}
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
