import { StrictMode } from 'react';
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";

const root = document.getElementById('app');
if(!root) {
  throw new Error("Could not find the app root");
}

ReactDOM.createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);

