import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./EducationPG1.css"; // Global styles - dark gradient background
import Render from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Render />
  </StrictMode>
);
