import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializeMixPanel } from "./trackEvent";

const ele = document.getElementById("root") as HTMLElement;

initializeMixPanel()
const root = ReactDOM.createRoot(ele);
root.render(
    <App />
);
