import React from "react";
import ReactDOM from "react-dom/client";

//? Component
import App from "./App";

//? Router
import { BrowserRouter } from "react-router-dom";

//? Styles
import "./assets/scss/index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
