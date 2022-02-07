const equation = {
    operator: null,
    firstNum: null,
    secondNum: null
}

let displayExpression = "0";
const expression = document.querySelector(".expression");
let displaySolution = "";
const solution = document.querySelector(".solution");


function operate(operator, num1, num2) {
    switch(operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "x":
            return num1 * num2;
        case "÷":
            return num1 / num2;
        case "%":
            return num1 % num2;
        default:
            return;
    }
}

function clear() {
    displayExpression = "0";
    displaySolution =  "";
    equation.operator = null;
    equation.firstNum = null;
    equation.secondNum = null;
    expression.textContent = displayExpression;
    solution.textContent = displaySolution;
}

function backSpace() {
    displayExpression = displayExpression.toString().slice(0, -1);
    if (displayExpression === "") {
        displayExpression = "0";
    }
    solution.textContent = displayExpression;
}

function toNumFit(num) {
    return Math.round(num * 10e6) / 10e6;
}

function display(contentSol, contentExp) {
    expression.textContent = contentExp;
    solution.textContent = contentSol;
}

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let content = e.target.textContent;
        let isNumber = !isNaN(Number(content));
        let isDot = (content === ".");
        let isEquationFull = (equation.firstNum !== null
                            && equation.operator !== null
                            && equation.secondNum !== null);

        if (content === "C") {
            clear();
            return;
        }
        if (isNumber) {
            if(equation.firstNum !== null && equation.operator !== null && equation.secondNum === null) {
                displayExpression = "0";
                equation.secondNum = 0;
            }
            if (displayExpression !== "0") {
                displayExpression += content;
            } else {
                displayExpression = content;
            }
        } else if (isDot) {
            if (displayExpression.toString().includes(content) === false) {
                displayExpression += content;
            }
        } else {
            if (content === "⌫") {
                backSpace();
                return
            }
            if (isEquationFull) {
                equation.secondNum = toNumFit(Number(displayExpression));
                if (equation.secondNum === 0 && equation.operator === "/") {
                    solution.textContent = "Can't divide a number with 0!";
                    return;
                }
                if (content === "=") {
                    displayExpression = toNumFit(operate(equation.operator, equation.firstNum, equation.secondNum));
                    displaySolution = `${equation.firstNum} ${equation.operator} ${equation.secondNum} =`;
                    equation.firstNum = toNumFit(operate(equation.operator, equation.firstNum, equation.secondNum));
                    equation.operator = null;
                    equation.secondNum = null;
                    display(displayExpression, displaySolution);
                    return;
                } else {
                    equation.firstNum = toNumFit(operate(equation.operator, equation.firstNum, equation.secondNum));
                    equation.operator = content;
                    equation.secondNum = null;
                    displayExpression = equation.firstNum;
                    displaySolution = `${equation.firstNum} ${equation.operator}`;
                    display(displayExpression, displaySolution);
                    return;
                }
            }
            if (equation.firstNum === null) {
                equation.firstNum = toNumFit(Number(displayExpression));
            }
            equation.operator = content;
            equation.firstNum = toNumFit(Number(displayExpression));
            displaySolution = `${equation.firstNum} ${equation.operator}`;
        }
        display(displayExpression, displaySolution);
    });
})
