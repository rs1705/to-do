import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Main";
import { Toaster } from "react-hot-toast";
const App = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="md:hidden p-4 flex justify-between items-center bg-slate-900 dark:bg-slate-900">
        <h1 className="text-xl font-bold text-slate-100 dark:text-white">
          Task Master
        </h1>
        <button
          className="text-2xl text-slate-100 dark:text-white"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          ☰
        </button>
      </div>
      <div className="flex">
        <Sidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
        <Home />
      </div>
    </>
  );
};
export default App;
