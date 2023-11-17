import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const ele = document.getElementById("root") as HTMLElement;

const root = ReactDOM.createRoot(ele);
root.render(
    <App />
);
