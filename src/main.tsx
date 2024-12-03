import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./lib/styles/index.css";
import "./lib/styles/font.css";
import "./lib/styles/scroll.css";

createRoot(document.getElementById("root")!).render(<App />);
