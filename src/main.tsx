import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from "./auth/auth.tsx";
import { ToastProvider } from "./components/context/ToastNotifcation.tsx";
import { UtilsProvider } from "./components/context/Utils.tsx";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GoogleOAuthProvider clientId="177356393773-5uaija61i27op2j2o88efdhjgv00dod2.apps.googleusercontent.com">
            <UtilsProvider>
              <ToastProvider>
                <App />
              </ToastProvider>
            </UtilsProvider>
          </GoogleOAuthProvider>
        </AuthProvider>
      </QueryClientProvider >
    </BrowserRouter>
  </React.StrictMode>
);
