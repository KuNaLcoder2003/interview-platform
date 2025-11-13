import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";

const PUBLISHABLE_KEY = "";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ClerkProvider>
  </React.StrictMode>
);
