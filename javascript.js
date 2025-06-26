// ==========================
// JavaScript calculator
// ==========================
// A simple calculator with basic operations, decimal input, and error handling for divide by zero.

// Error message when trying to divide by zero
const DIVIDE_BY_ZERO = "Diving by zero...really?"

// Variables for calculator operation
let firstNumber = null;
let operator = null;
let secondNumber = null;
let displayValue = "0";
let waitingForSecondNumber = false;
let justEvaluated = false; // True after pressing equals, next digit starts a new input
let operationHistory = "";

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
        // Prevents division by zero
        return DIVIDE_BY_ZERO;
    }
    return a / b;
}

// Apply operator to two numbers
function operate(operator, a, b){
    switch(operator){
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return b;
    }
}

// Round result to at most 7 decimals
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

// DOM elements
const display = document.getElementById("display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
const allClearButton = document.getElementById("all-clear");
const clearButton = document.getElementById("clear");
const history = document.getElementById("history");
const decimalButton = document.getElementById("decimal");

// Updates display and history
function updateDisplay(){
    display.textContent = displayValue;
    history.textContent = operationHistory;
}

// Reset calculator to default state
function resetCalculator(newDisplay = "0", resetHistory = false){
    displayValue = newDisplay;
    firstNumber = null;
    operator = null;
    secondNumber = null;
    waitingForSecondNumber = false;
    justEvaluated = false;
    if(resetHistory){
        operationHistory = "";
    }
    updateDisplay();
}

// Handle clicking a button (0-9)
function handleDigitClick(event){
    const digit = event.target.getAttribute("data-digit");

    // Reset after error or evaluation
    if (displayValue === DIVIDE_BY_ZERO){
        resetCalculator(digit);
        return;
    } 

    // If calculation was performed, reset input
    if (justEvaluated){
        resetCalculator(digit);
        return;
    }

    // Start a new number after operator pressed
    if (waitingForSecondNumber){
        displayValue = digit;
        waitingForSecondNumber = false;
        updateDisplay();
        return;
    }

    // Replace leading zero, otherwise append
    if (displayValue === "0"){
        displayValue = digit;
    } else {
        displayValue += digit;
    }
    updateDisplay();
}

// Handle clicking an operator (+, -, *, /)
function handleOperatorClick(event){
    const nextOperator = event.target.getAttribute("data-operator");
    if (displayValue === DIVIDE_BY_ZERO){
        return;
    }

    // Change operator if user presses operator twice
    if (operator && waitingForSecondNumber){
        operator = nextOperator;
        operationHistory = firstNumber + " " + operator;
        updateDisplay();
        return;
    }

    // Store first operand and operator
    if (firstNumber === null){
        firstNumber = Number(displayValue);
        operator = nextOperator;
        waitingForSecondNumber = true;
        justEvaluated = false;
        operationHistory = firstNumber + " " + operator;
        updateDisplay();
        return;
    }

    // Perform operation if previous operator and operand exist
    if (!waitingForSecondNumber){
        secondNumber = Number(displayValue);
        let result = operate(operator, firstNumber, secondNumber);
        if (result === DIVIDE_BY_ZERO){
            resetCalculator(result);
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

// Handle clicking equal (=)
function handleEqualsClick() {
    if (displayValue === DIVIDE_BY_ZERO){
        return;
    }

    // Only if operator and first number exist, not waiting for second number
    if (operator && firstNumber !== null && !waitingForSecondNumber){
        secondNumber = Number(displayValue);
        let result = operate(operator, firstNumber, secondNumber);

        if (result === DIVIDE_BY_ZERO){
            resetCalculator(result);
            return;
        }
        result = roundResult(result);
        operationHistory = firstNumber + " " + operator + " " + secondNumber + " =";
        displayValue = result.toString();
        updateDisplay();

        // Reset
        firstNumber = null;
        operator = null;
        secondNumber = null;
        waitingForSecondNumber = false;
        justEvaluated = true;
    }
}

// Handle clicking decimal (.)
function handleDecimalClick() {
    
    // New decimal after error or evaluation
    if (displayValue === DIVIDE_BY_ZERO){
        resetCalculator("0.");
        return;
    }

    // If calculation was performed, reset input
    if (justEvaluated){
        resetCalculator("0.");
        return;
    }

    // Start decimal number after operator
    if (waitingForSecondNumber) {
        displayValue = "0.";
        waitingForSecondNumber = false;
        updateDisplay();
        return;
    }
    // Prevent multiple decimals in the same number
    if (!displayValue.includes(".")) {
        displayValue += ".";
        updateDisplay();
    }
}

// Handle clicking Clear All - reset calculator
function handleAllClearClick() {
    resetCalculator("0", true);
}

// Handle clicking Backspace - remove last digit, or reset to 0 if clearing the last number
function handleClearClick() {
    if (displayValue === DIVIDE_BY_ZERO){
        resetCalculator();
        return;
    }

    // If calculation was performed, reset input
    if (justEvaluated){
        resetCalculator();
        return;
    }

    // Removes last character if empty, reset to 0
    if (displayValue.length > 1){
        displayValue = displayValue.slice(0, -1);
        if (displayValue === "" || displayValue === "-"){
            displayValue = "0";
        }
    } else {
        displayValue = "0";
    }
    updateDisplay();
}

// Event listeners binding
digitButtons.forEach(function(btn) {
    btn.addEventListener("click", handleDigitClick);
});
operatorButtons.forEach(function(btn) {
    btn.addEventListener("click", handleOperatorClick);
});
equalsButton.addEventListener("click", handleEqualsClick);
allClearButton.addEventListener("click", handleAllClearClick);
clearButton.addEventListener("click", handleClearClick);
decimalButton.addEventListener("click", handleDecimalClick);

// Initialize display
updateDisplay();