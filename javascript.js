// Basic math functions
function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    if (b === 0) {
        return "Nice try"
    }
    return a / b;
}

// Operate functions
function operate(operator, a, b){
    switch(operator){
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return b;
    }
}

// Round to at most 7 decimals
function roundResult(value){
    if (typeof value === "number"){
        const str = value.toString();
        const match = str.match(/\.(\d+)/);
        if (match && match[1].length > 7){
            return Number(value.toFixed(7));
        }
        return value;
    }
    return value;
}

// Variables for caculator operation
let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = "0";
let waitingForSecondNumber = false;
let justEvaluated = false;
let operationHistory = "";

// DOM elements
const display = document.getElementById("display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const allClearButton = document.getElementById("all-clear");
const clearButton = document.getElementById("clear");
const history = document.getElementById("history");

// Updates display
function updateDisplay(){
    display.textContent = displayValue;
    history.textContent = operationHistory;
}

// Digit button handler
function handleDigitClick(event){
    const digit = event.target.getAttribute("data-digit");

    if (displayValue === "Nice try"){
        displayValue = digit;
        firstNumber = null;
        operator = null;
        secondNumber = null;
        waitingForSecondNumber = false;
        justEvaluated = false;
        return;
    }
    if (justEvaluated){
        displayValue = digit;
        firstNumber = null;
        operator = null;
        secondNumber = null;
        waitingForSecondNumber = false;
        justEvaluated = false;
        return;
    }
    if (waitingForSecondNumber){
        displayValue = digit;
        waitingForSecondNumber = false;
        updateDisplay();
        return;
    }
    if (displayValue === "0"){
        displayValue = digit;
    } else {
        displayValue += digit;
    }
    updateDisplay();
}

// Operator button handler
function handleOperatorClick(event){
    const nextOperator = event.target.getAttribute("data-operator");
    if (displayValue === "Nice try"){
        return;
    }
    if (operator && waitingForSecondNumber){
        operator = nextOperator;
        operationHistory = firstNumber + " " + operator;
        updateDisplay();
        return;
    }
    if (firstNumber === null){
        firstNumber = Number(displayValue);
        operator = nextOperator;
        waitingForSecondNumber = true;
        justEvaluated = false;
        operationHistory = firstNumber + " " + operator;
        updateDisplay();
        return;
    }
    if (!waitingForSecondNumber){
        secondNumber = Number(displayValue);
        let result = operate(operator, firstNumber, secondNumber);
        if (result === "Nice try"){
            displayValue = result;
            updateDisplay();
            firstNumber = null;
            operator = null;
            secondNumber = null;
            waitingForSecondNumber = false;
            justEvaluated = false;
            return;
        }
        result = roundResult(result);
        displayValue = result.toString();
        updateDisplay();
        firstNumber = result;
        operator = nextOperator;
        waitingForSecondNumber = true;
        justEvaluated = false;
        operationHistory = firstNumber + " " + operator;
        updateDisplay();
    }
}

// Equal button handler
function handleEqualsClick() {
    if (displayValue === "Nice try"){
        return;
    }

    if (operator && firstNumber !== null && !waitingForSecondNumber){
        secondNumber = Number(displayValue);
        let result = operate(operator, firstNumber, secondNumber);

        if (result === "Nice try"){
            displayValue = result;
            updateDisplay();
            firstNumber = null;
            operator = null;
            secondNumber = null;
            waitingForSecondNumber = false;
            justEvaluated = false;
            return;
        }
        result = roundResult(result);
        operationHistory = firstNumber + " " + operator + " " + secondNumber + " =";
        displayValue = result.toString();
        updateDisplay();
        firstNumber = null;
        operator = null;
        secondNumber = null;
        waitingForSecondNumber = false;
        justEvaluated = true;
    }
}

// Clear (all) button handler
function handleAllClearClick() {
    displayValue = "0";
    firstNumber = null;
    operator = null;
    secondNumber = null;
    waitingForSecondNumber = false;
    justEvaluated = false;
    operationHistory = "";
    updateDisplay();
}

// Clear (backspace) button handler
function handleClearClick() {
    displayValue = "0";
    firstNumber = null;
    operator = null;
    secondNumber = null;
    waitingForSecondNumber = false;
    justEvaluated = false;
    operationHistory = "";
    updateDisplay();
}

// Attach event listeners
digitButtons.forEach(function(btn) {
    btn.addEventListener("click", handleDigitClick);
});
operatorButtons.forEach(function(btn) {
    btn.addEventListener("click", handleOperatorClick);
});
equalsButton.addEventListener("click", handleEqualsClick);
allClearButton.addEventListener("click", handleAllClearClick);
clearButton.addEventListener("click", handleClearClick);

// Initialize display
updateDisplay();