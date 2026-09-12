import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { MemoryProvider } from "./context/MemoryContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MemoryProvider>
          <App />
          <Toaster position="top-center" />
        </MemoryProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
