// -------------------- PACKAGE IMPORT FILES -------------------- //
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider, useQuery, } from '@tanstack/react-query'

// -------------------- OTHER IMPORT FILES -------------------- //
import "./index.css";
import App from "./app/App";

const queryClient = new QueryClient()
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer
        draggable
        pauseOnHover />
    </QueryClientProvider>
  </StrictMode>,
);
