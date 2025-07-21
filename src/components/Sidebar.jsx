import Button from "../UI/Button";
import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";
import userLogo from "../assets/userLogo.png";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const todos = useContext(TodoContext).todos;
  const { setSelectedId, selectedId } = useContext(TodoContext);
  const { user, logOut, userLoggedIn } = useContext(AuthContext);

  const selectTodoHandler = (id) => {
    setSelectedId(id);
  };

  const createTodoHandler = () => {
    setSelectedId("add");
  };

  const loginClickHandler = () => {
    setSelectedId("login");
  };

  const logoutClickHandler = () => {
    logOut();
  };
  return (
    <div className="bg-slate-900 text-stone-100 sidebar ">
      <div className="relative top-2 left-52">
        <Button
          className="bg-slate-300 hover:bg-slate-400 hover:cursor-pointer py-1 px-2 rounded text-slate-900"
          title={!userLoggedIn ? "Login" : "Logout"}
          onClick={!userLoggedIn ? loginClickHandler : logoutClickHandler}
        />
      </div>
      <div className="mt-16  text-center">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <div className="flex flex-col items-center">
          <p className="font-semibold mb-2 text-amber-500">
            Welcome {!user ? "Guest" : user.email}!
          </p>
          <img
            src={userLogo}
            alt="user-image"
            className="w-[80px] h-[80px] rounded-full bg-slate-200"
          />
        </div>
      </div>
      <div className="mt-5 text-center flex flex-col">
        <Button
          className="bg-slate-300 hover:bg-slate-400 hover:cursor-pointer py-1 px-2 rounded text-slate-900"
          title="+ Add task"
          onClick={createTodoHandler}
        />
      </div>
      <div className="mt-2">
        {todos && todos.length === 0 && (
          <p className="text-red-400 text-sm text-center">
            Click add button to add a new task
          </p>
        )}
        {todos.length > 0 && (
          <div>
            <p className="text-center">
              <span>My tasks {`(${todos.length})`}</span>
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
