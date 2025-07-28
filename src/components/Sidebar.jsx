import Button from "../UI/Button";
import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";
import userLogo from "../assets/userLogo.png";
import { AuthContext } from "../context/AuthContext";
import Input from "../UI/Input";
import { closeIfSmallScreen } from "../Utils";

const Sidebar = ({ isOpen, onClose }) => {
  const todos = useContext(TodoContext).filteredTodos;
  const { setSelectedId, selectedId, setSearchTerm } = useContext(TodoContext);
  const { user, logOut, userLoggedIn } = useContext(AuthContext);

  const selectTodoHandler = (id) => {
    setSelectedId(id);
    closeIfSmallScreen(onClose);
  };

  const addTaskClickHandler = () => {
    setSelectedId("add");
    closeIfSmallScreen(onClose);
  };

  const loginClickHandler = () => {
    setSelectedId("signin");
    closeIfSmallScreen(onClose);
  };

  const logoutClickHandler = () => {
    logOut();
    setSelectedId(null);
    closeIfSmallScreen(onClose);
  };

  const onAboutClick = () => {
    setSelectedId("about");
    closeIfSmallScreen(onClose);
  };
  return (
    <div
      className={`
        fixed top-0 left-0 h-[100vh] z-50 text-slate-100
        bg-slate-900 shadow-md
        w-[60%]
        sm:w-[320px]
        md:w-[380px]
        lg:w-[300px]
        
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:shadow-none md:w-[280px]
      `}
    >
      <div className="flex flex-row-reverse mx-1 my-1">
        <Button
          title={!userLoggedIn ? "Login" : "Logout"}
          onClick={!userLoggedIn ? loginClickHandler : logoutClickHandler}
          style="mx-1"
          aria-label="login-btn"
        />
        <Button
          title="About"
          onClick={onAboutClick}
          style="bg-transparent text-slate-100 hover:bg-transparent hover:text-slate-400"
          aria-label="about-btn"
        />
      </div>
      <div className="mt-16  text-center">
        <h1 className="text-3xl font-bold">Task Master</h1>
        <div className="flex flex-col items-center">
          <p className="font-semibold mb-2 text-slate-50">
            Welcome{" "}
            {!userLoggedIn
              ? "Guest"
              : user.displayName
              ? user.displayName
              : user.email}
            !
          </p>
          <img
            src={
              userLoggedIn
                ? user.photoURL
                  ? user.photoURL
                  : userLogo
                : userLogo
            }
            alt="user-image"
            className="w-[80px] h-[80px] rounded-full bg-slate-200"
          />
        </div>
      </div>
      <div className="mt-5 text-center flex flex-col items-center">
        <Button
          className="bg-slate-300 hover:bg-slate-400 hover:cursor-pointer py-1 px-2 rounded text-slate-900"
          title="+ Add task"
          onClick={addTaskClickHandler}
        />
      </div>
      <div className="mt-2">
        {todos.length === 0 && (
          <p className="text-slate-100 text-sm text-center">
            Click add button to add a new task
          </p>
        )}
        {todos.length > 0 && (
          <div className="flex flex-col items-center w-full">
            <div className="w-full justify-center">
              <p className="text-center">
                <span>My tasks {`(${todos.length})`}</span>
              </p>
              <Input
                title="Search task..."
                type="text"
                style="text-slate-50 bg-slate-600 text-center my-1 mx-4"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <br />
              <ol>
                {todos.map((todo) => (
                  <li
                    aria-label="task-item"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
