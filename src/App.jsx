import Sidebar from "./components/Sidebar";
import Home from "./pages/Main";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Sidebar />
      <Home />
    </>
  );
};
export default App;
