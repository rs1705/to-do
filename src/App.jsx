import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Main";

const App = () => {
  const [selectedId, setSelectedId] = useState(null);
  return (
    <>
      <Sidebar onSelectId={setSelectedId} />
      <Home selectedId={selectedId} />
    </>
  );
};
export default App;
