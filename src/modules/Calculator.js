import React from "react";

const { Component } = require("react");

class Calculator extends Component {
  constructor() {
    super();
    this.state = { ans: "_", operand1: "", operand2: "", operator: "" };
  }

  //==================================== METHODS

  isNumber = (value) => {
    var result = false;

    if (
      value === "1" ||
      value === "2" ||
      value === "3" ||
      value === "4" ||
      value === "5" ||
      value === "6" ||
      value === "7" ||
      value === "8" ||
      value === "9" ||
      value === "0"
    )
      result = true;

    return result;
  };

  isOperator = (value) => {
    var result = false;

    if (value === "+" || value === "-" || value === "*" || value === "/")
      result = true;

    return result;
  };

  isDot = (value, operand1) => {
    var result = false;

    if (value === "." && operand1.indexOf(".") === -1) {
      result = true;
    }

    return result;
  };

  sum = (a, b) => {
    return a + b;
  };
  res = (a, b) => {
    return a - b;
  };
  mul = (a, b) => {
    return a * b;
  };
  div = (a, b) => {
    return a / b;
  };

  executeOperation = (operand1, operand2, operator) => {
    var result = 0;

    switch (operator) {
      case "+":
        result = this.sum(Number(operand1), Number(operand2));
        break;
      case "-":
        result = this.res(Number(operand1), Number(operand2));
        break;
      case "*":
        result = this.mul(Number(operand1), Number(operand2));
        break;
      case "/":
        result = this.div(Number(operand1), Number(operand2));
        break;
      default:
        break;
    }

    return result;
  };

  saveNumber = (item, operand1) => {
    let temp = operand1 + item;
    this.setState({ operand1: temp, ans: temp });
  };

  saveOperand2 = (operand1, operator) => {
    this.setState({
      operand2: operand1,
      operand1: "",
      operator: operator,
      ans: "_",
    });
  };
  //==================================== HANDLERS
  buttonHandler = (item) => {
    var { operand1, operand2, operator } = this.state;

    if (this.isNumber(item) || this.isDot(item, operand1)) {
      // * Save the number typed
      this.saveNumber(item, operand1);
    } else if (this.isOperator(item)) {
      // * Pass value operand1 to operand2
      if (operand1 !== "" && operand2 === "" && operator === "") {
        this.saveOperand2(operand1, operator);
        // * Execure pre-operation
      } else if (operand1 !== "" && operand2 !== "" && operator !== "") {
        this.setState({
          operand1: "",
          operand2: this.executeOperation(
            operand1,
            operand2,
            operator
          ).toString(),
          operator: item,
          ans: "_",
        });
      }
    } else if (item === "=") {
      // * Calculate answer
      if (operand1 !== "" && operand2 !== "" && operator !== "") {
        var temp = this.executeOperation(
          operand1,
          operand2,
          operator
        ).toString();

        this.setState({
          operand1: "",
          operand2: temp,
          operator: "",
          ans: temp,
        });
      }
    }
  };

  render() {
    return (
      <div id="container">
        <div>
          <textarea
            id="display"
            rows="2"
            cols="20"
            value={this.state.ans}
            readOnly
          />
        </div>
        <div>
          <div>
            <button onClick={this.buttonHandler.bind(this, "CE")}>CE</button>
            <button onClick={this.buttonHandler.bind(this, "C")}>C</button>
            <button onClick={this.buttonHandler.bind(this, "Del")}>Del</button>
            <button onClick={this.buttonHandler.bind(this, "/")}>/</button>
          </div>
          <div>
            <button onClick={this.buttonHandler.bind(this, "7")}>7</button>
            <button onClick={this.buttonHandler.bind(this, "8")}>8</button>
            <button onClick={this.buttonHandler.bind(this, "9")}>9</button>
            <button onClick={this.buttonHandler.bind(this, "*")}>*</button>
          </div>
          <div>
            <button onClick={this.buttonHandler.bind(this, "4")}>4</button>
            <button onClick={this.buttonHandler.bind(this, "5")}>5</button>
            <button onClick={this.buttonHandler.bind(this, "6")}>6</button>
            <button onClick={this.buttonHandler.bind(this, "-")}>-</button>
          </div>
          <div>
            <button onClick={this.buttonHandler.bind(this, "1")}>1</button>
            <button onClick={this.buttonHandler.bind(this, "2")}>2</button>
            <button onClick={this.buttonHandler.bind(this, "3")}>3</button>
            <button onClick={this.buttonHandler.bind(this, "+")}> +</button>
          </div>
          <div>
            <button onClick={this.buttonHandler.bind(this, "0")}>0</button>
            <button onClick={this.buttonHandler.bind(this, "+/-")}>+/-</button>
            <button onClick={this.buttonHandler.bind(this, ".")}>.</button>
            <button onClick={this.buttonHandler.bind(this, "=")}>=</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
