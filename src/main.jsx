import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import { ShopProvider } from "./contexts/shopContext.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <StrictMode>
      <ShopProvider>
        <App />
      </ShopProvider>
    </StrictMode>
  </HashRouter>
);
