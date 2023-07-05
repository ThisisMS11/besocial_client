import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./auth/auth.tsx";
import { ToastProvider } from "./components/context/ToastNotifcation.tsx";
import { UtilsProvider } from "./components/context/Utils.tsx";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>

        <AuthProvider>

          <UtilsProvider>
            <ToastProvider>
              <App />
              <ReactQueryDevtools />
            </ToastProvider>
          </UtilsProvider>
        </AuthProvider>
      </QueryClientProvider >
    </BrowserRouter>
  </React.StrictMode>
);
