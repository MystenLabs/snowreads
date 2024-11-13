import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import * as amplitude from "@amplitude/analytics-browser";

amplitude.init("b9c388dd082e3727ee05f3d4b79e0edc", { autocapture: true });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
