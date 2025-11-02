import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./design/style.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FeatureFlagProvider } from "./components/FeatureFlagContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <FeatureFlagProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FeatureFlagProvider>
    </AuthProvider>
  </React.StrictMode>
);
