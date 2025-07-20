import Sidebar from "./components/Sidebar";
import AuthProvider from "./context/AuthContext";
import Home from "./pages/Main";

const App = () => {
  return (
    <AuthProvider>
      <Sidebar />
      <Home />
    </AuthProvider>
  );
};
export default App;
