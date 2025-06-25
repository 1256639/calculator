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
        return "Error: division by zero"
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

// Variables for caculator operation
let firstNumber = null;
let operator = null;
let secondNumber = null;

let displayValue = "0";

const display = document.getElementById("display");
const digitButtons = document.querySelectorAll(".digit");

// Updates display
function updateDisplay(){
    display.textContent = displayValue;
}

// Button clicks
function appendDigit(digit){
    if (displayValue === "0"){
        displayValue = digit;
    } else {
        displayValue += digit;
    }
    updateDisplay();
}

// Click listener for all buttons
function handleDigitClick(event) {
    const digit = event.target.getAttribute("data-digit");
    appendDigit(digit);
}

digitButtons.forEach(function(btn) {
    btn.addEventListener("click", handleDigitClick);
});

// Clear all
function handleAllClearClick() {
    displayValue = "0";
    updateDisplay();
}

document.getElementById("all-clear").addEventListener("click", handleAllClearClick);

// Backspace
function handleClearClick() {
    if (displayValue.length > 1) {
        displayValue = displayValue.slice(0, -1);
    } else {
        displayValue = "0";
    }
    updateDisplay();
}

document.getElementById("clear").addEventListener("click", handleClearClick);


updateDisplay();