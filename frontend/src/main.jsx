import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { MemoryProvider } from "./context/MemoryContext.jsx";

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const theme = savedTheme || (prefersDark ? "dark" : "light");
document.documentElement.setAttribute("data-theme", theme);

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
