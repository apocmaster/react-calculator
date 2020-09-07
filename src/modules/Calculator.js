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

  saveAnswer = (operand1, operand2, operator) => {
    var temp = this.executeOperation(operand2, operand1, operator).toString();

    this.setState({
      operand1: "",
      operand2: "",
      operator: "",
      ans: temp,
    });
  };

  savePreAnswer = (operand1, operand2, operator, item) => {
    var temp = this.executeOperation(operand2, operand1, operator).toString();

    this.setState({
      operand1: "",
      operand2: temp,
      operator: item,
      ans: "_",
    });
  };

  saveOperator = (operator, operand1, clear = false) => {
    if (clear) {
      this.setState({
        operator: operator,
        operand2: operand1,
        operand1: "",
        ans: "_",
      });
    } else {
      this.setState({ operator: operator, operand2: operand1, operand1: "" });
    }
  };

  syntasisError = () => {
    this.setState({
      operand1: "",
      operand2: "",
      operator: "",
      ans: "Syn Error",
    });
  };

  clearAll = () => {
    this.setState({
      operand1: "",
      operand2: "",
      operator: "",
      ans: "_",
    });
  };

  clearNumber = () => {
    this.setState({ operand1: "", ans: "_" });
  };

  changeSign = (operand1) => {
    var temp = (-1 * Number(operand1)).toString();

    this.setState({ operand1: temp, ans: temp });
  };

  removeNumber = (operand1) => {
    if (operand1.length !== 0) {
      operand1 = operand1.substring(0, operand1.length - 1);

      if (operand1.length === 0) {
        this.setState({ operand1: operand1, ans: "_" });
      } else {
        this.setState({ operand1: operand1, ans: operand1 });
      }
    }
  };

  //==================================== HANDLERS
  buttonHandler = (item) => {
    var { operand1, operand2, operator } = this.state;

    if (this.isNumber(item) || this.isDot(item, operand1)) {
      // * Save the number typed
      this.saveNumber(item, operand1);
    } else if (this.isOperator(item)) {
      if (operand1 !== "" && operator === "") {
        // * Save operator
        this.saveOperator(item, operand1);
      } else if (operand1 === "" && operand2 === "" && operator === "") {
        this.saveOperator(item, operand1);
      } else if (operator !== "") {
        // * Pre calculate
        this.savePreAnswer(operand1, operand2, operator, item);
      }
    } else if (item === "=") {
      // * Nothing
      if (operand1 === "" && operand2 === "" && operator === "") {
      }
      // * Syntasis Err
      else if (
        (operand1 === "" && operand2 === "" && operator !== "") ||
        (operand1 === "" && operand2 !== "" && operator !== "") ||
        (operand1 !== "" && operand2 === "" && operator === "*") ||
        (operand1 !== "" && operand2 === "" && operator === "/")
      ) {
        this.syntasisError();
      }
      // * sum or rest grant
      else if (
        (operand1 !== "" && operand2 === "" && operator === "+") ||
        (operand1 !== "" && operand2 === "" && operator === "-")
      ) {
        this.saveAnswer(operand1, "0", operator);
      }
      // * Calculate answer
      else if (operand1 !== "" && operand2 !== "" && operator !== "") {
        this.saveAnswer(operand1, operand2, operator);
      }
    } else if (item === "CE") {
      this.clearAll();
    } else if (item === "Del") {
      this.removeNumber(operand1);
    } else if (item === "C") {
      this.clearNumber();
    } else if (item === "+/-" && operand1 !== "") {
      this.changeSign(operand1);
    }
  };

  render() {
    return (
      <div id="container">
        <div>
          <input type="text" id="display" value={this.state.ans} readOnly />
        </div>
        <div>
          <div>
            <button
              className="control"
              onClick={this.buttonHandler.bind(this, "CE")}
            >
              CE
            </button>
            <button
              className="control"
              onClick={this.buttonHandler.bind(this, "C")}
            >
              C
            </button>
            <button
              className="control"
              onClick={this.buttonHandler.bind(this, "Del")}
            >
              Del
            </button>
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
            <button
              className="answer"
              onClick={this.buttonHandler.bind(this, "=")}
            >
              =
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
