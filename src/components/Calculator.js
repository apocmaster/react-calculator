import React, { Component } from "react";
import Button from './Button';

// ---- Utils ----

const isNumber = (value) => {
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

const isOperator = (value) => {
  var result = false;

  if (value === "+" || value === "-" || value === "*" || value === "/")
    result = true;

  return result;
};

const isDot = (value, operand1) => {
  var result = false;

  if (value === "." && operand1.indexOf(".") === -1) {
    result = true;
  }

  return result;
};

const sum = (a, b) => {
  return a + b;
};

const res = (a, b) => {
  return a - b;
};

const mul = (a, b) => {
  return a * b;
};

const div = (a, b) => {
  return a / b;
};

const executeOperation = (operand1, operand2, operator) => {
  var result = 0;

  switch (operator) {
    case "+":
      result = sum(Number(operand1), Number(operand2));
      break;
    case "-":
      result = res(Number(operand1), Number(operand2));
      break;
    case "*":
      result = mul(Number(operand1), Number(operand2));
      break;
    case "/":
      result = div(Number(operand1), Number(operand2));
      break;
    default:
      break;
  }

  return result;
};

class Calculator extends Component {
  constructor() {
    super();
    this.state = { ans: "_", operand1: "", operand2: "", operator: "" };
  }

  // ---- METHODS ----

  saveNumber(item, operand1) {
    let temp = operand1 + item;
    this.setState({ operand1: temp, ans: temp });
  };

  saveOperand2(operand1, operator) {
    this.setState({
      operand2: operand1,
      operand1: "",
      operator: operator,
      ans: "_",
    });
  };

  saveAnswer (operand1, operand2, operator) {
    var temp = executeOperation(operand2, operand1, operator).toString();

    this.setState({
      operand1: "",
      operand2: "",
      operator: "",
      ans: temp,
    });
  };

  savePreAnswer(operand1, operand2, operator, item) {
    var temp = executeOperation(operand2, operand1, operator).toString();

    this.setState({
      operand1: "",
      operand2: temp,
      operator: item,
      ans: "_",
    });
  };

  saveOperator(operator, operand1, clear = false) {
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

  syntacticError() {
    this.setState({
      operand1: "",
      operand2: "",
      operator: "",
      ans: "Syn Error",
    });
  };

  clearAll() {
    this.setState({
      operand1: "",
      operand2: "",
      operator: "",
      ans: "_",
    });
  };

  clearNumber() {
    this.setState({ operand1: "", ans: "_" });
  };

  changeSign(operand1) {
    var temp = (-1 * Number(operand1)).toString();

    this.setState({ operand1: temp, ans: temp });
  };

  removeNumber(operand1) {
    if (operand1.length !== 0) {
      operand1 = operand1.substring(0, operand1.length - 1);

      if (operand1.length === 0) {
        this.setState({ operand1: operand1, ans: "_" });
      } else {
        this.setState({ operand1: operand1, ans: operand1 });
      }
    }
  };

  // ---- HANDLERS ----
  buttonHandler(item) {
    // TODO: Granulate this method
    const { operand1, operand2, operator } = this.state;

    if (isNumber(item) || isDot(item, operand1)) {
      // * Save the number typed
      this.saveNumber(item, operand1);
      return;
    }

    if (isOperator(item)) {
      if (operand1 !== "" && operator === "") {
        // * Save operator
        this.saveOperator(item, operand1);
      } else if (operand1 === "" && operand2 === "" && operator === "") {
        this.saveOperator(item, operand1, true);
      } else if (operator !== "") {
        // * Pre calculate
        this.savePreAnswer(operand1, operand2, operator, item);
      }

      return;
    }

    if (item === "=") {
      // TODO: Simplify this logic it is very complex/obfuscated
      if (operand1 === "" && operand2 === "" && operator === "") {
      }
      else if (!(
        (operand1 === "" && operand2 === "" && operator !== "") ||
        (operand1 === "" && operand2 !== "" && operator !== "") ||
        (operand1 !== "" && operand2 === "" && operator === "*") ||
        (operand1 !== "" && operand2 === "" && operator === "/")
      )) {
        this.syntacticError();
      }

      // sum or rest grant
      if (
        (operand1 !== "" && operand2 === "" && operator === "+") ||
        (operand1 !== "" && operand2 === "" && operator === "-")
      ) {
        this.saveAnswer(operand1, "0", operator);
      }

      // Calculate answer
      if (operand1 !== "" && operand2 !== "" && operator !== "") {
        this.saveAnswer(operand1, operand2, operator);
      }

      return;
    }

    if (item === "CE") {
      this.clearAll();
      return;
    }

    if (item === "Del") {
      this.removeNumber(operand1);
      return;
    }

    if (item === "C") {
      this.clearNumber();
      return;
    }

    if (item === "+/-" && operand1 !== "") {
      this.changeSign(operand1);
      return;
    }
  };

  render() {
    return (
      <div className="container">
        <div>
          <input className="display" type="text"value={this.state.ans} readOnly />
        </div>
        <div>
          <div>
            <Button
              isControl
              onClick={this.buttonHandler.bind(this, "CE")}
            >
              CE
            </Button>
            <Button
              isControl
              onClick={this.buttonHandler.bind(this, "C")}
            >
              C
            </Button>
            <Button
              isControl
              onClick={this.buttonHandler.bind(this, "Del")}
            >
              Del
            </Button>
            <Button onClick={this.buttonHandler.bind(this, "/")}>/</Button>
          </div>
          <div>
            <Button onClick={this.buttonHandler.bind(this, "7")}>7</Button>
            <Button onClick={this.buttonHandler.bind(this, "8")}>8</Button>
            <Button onClick={this.buttonHandler.bind(this, "9")}>9</Button>
            <Button onClick={this.buttonHandler.bind(this, "*")}>*</Button>
          </div>
          <div>
            <Button onClick={this.buttonHandler.bind(this, "4")}>4</Button>
            <Button onClick={this.buttonHandler.bind(this, "5")}>5</Button>
            <Button onClick={this.buttonHandler.bind(this, "6")}>6</Button>
            <Button onClick={this.buttonHandler.bind(this, "-")}>-</Button>
          </div>
          <div>
            <Button onClick={this.buttonHandler.bind(this, "1")}>1</Button>
            <Button onClick={this.buttonHandler.bind(this, "2")}>2</Button>
            <Button onClick={this.buttonHandler.bind(this, "3")}>3</Button>
            <Button onClick={this.buttonHandler.bind(this, "+")}> +</Button>
          </div>
          <div>
            <Button onClick={this.buttonHandler.bind(this, "0")}>0</Button>
            <Button onClick={this.buttonHandler.bind(this, "+/-")}>+/-</Button>
            <Button onClick={this.buttonHandler.bind(this, ".")}>.</Button>
            <Button
              className="answer"
              onClick={this.buttonHandler.bind(this, "=")}
            >
              =
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
