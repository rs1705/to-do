import { useContext, useState } from "react";
import Sidebar from "./components/Sidebar";
import MainContent from "./pages/MainContent";
import { Toaster } from "react-hot-toast";
import Button from "./UI/Button";
import { TodoContext } from "./context/TodoContext";
import { AuthContext } from "./context/AuthContext";
const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { setSelectedId } = useContext(TodoContext);
  const { user, logOut, userLoggedIn } = useContext(AuthContext);

  const loginClickHandler = () => {
    setSelectedId("signin");
  };

  const logoutClickHandler = () => {
    logOut();
    setSelectedId(null);
  };
  return (
    <>
      <Toaster position="top-middle" reverseOrder={false} />

      <div className="md:hidden p-4 flex justify-between items-center bg-slate-900 dark:bg-slate-900">
        <h1 className="text-xl font-bold text-slate-100 dark:text-white">
          Task Master
        </h1>
        <div className="flex">
          {userLoggedIn ? (
            <p className="text-slate-100 mt-1">
              Welcome {user.displayName || user.email}
            </p>
          ) : (
            <p className="text-slate-100 mt-1">Welcome Guest</p>
          )}
          <Button
            title={!userLoggedIn ? "Login" : "Logout"}
            onClick={!userLoggedIn ? loginClickHandler : logoutClickHandler}
            style="bg-slate-50 hover:bg-slate-400 hover:cursor-pointer px-2 rounded text-slate-100 mx-2"
          />
          <button
            className="text-2xl text-slate-100 dark:text-white hover:cursor-pointer"
            onClick={() => setShowSidebar((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </div>
      <div className="flex">
        <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
        <MainContent />
      </div>
    </>
  );
};
export default App;
