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