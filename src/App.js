import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Calculator from "./modules/Calculator";

function App() {
  return (
    <div className="App">
      <Calculator />
      <div className="App-header">
        Calculator React
        <img src={logo} alt="" className="App-logo" />
      </div>
    </div>
  );
}

export default App;
