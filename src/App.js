import React from "react";
import ReactDOM from "react-dom/client";
import './App.css';
import Main from "./components/Main/Main";

const App = () => {
  return (
    <div className="app-layout">
        <Main/>
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);