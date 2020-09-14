import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Calculator from "./components/Calculator";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        Calculator React
        <img src={logo} alt="" className="App-logo" />
      </div>
      <Calculator />
    </div>
  );
}

export default App;
