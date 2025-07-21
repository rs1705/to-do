import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TodoProvider from "./context/TodoContext";
import AuthProvider from "./context/AuthContext";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </AuthProvider>
  </StrictMode>
);
