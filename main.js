function add(a, b) {
    return Math.round((a+ b) * 10**10) / 10**10;
}

function subtract(a, b) {
    return Math.round((a - b) * 10**10) / 10**10; 
}

function multiply(a, b) {
    return Math.round((a * b) * 10**10) / 10**10;
}

function divide(a, b) {
    if(b === 0) return "quick mafs?";
    return Math.round((a / b) * 10**10) / 10**10;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch(operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case 'x':
            return multiply(a, b);
            break;
        case '/':
            return divide(a, b);
            break;
    }
}
        
const currentEquationDisplay = document.querySelector('#currentEquation');
const currentInputDisplay = document.querySelector('#currentInput');
let inputValue; // latest input
let answer; // latest answer
let operatorValue;

function displayToScreen(value) {
    currentInputDisplay.innerText += value;
    return currentInputDisplay.innerText;
}

function listenToNumbers() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach( number => {
        number.addEventListener('click', () => {
            if(inputValue === undefined || inputValue === null) {
                currentInputDisplay.innerText = '';
            }
            inputValue = displayToScreen(number.innerText);            
        })
    })
}

function listenToOperators() {
    const operators = document.querySelectorAll('.operator');
    operators.forEach( operator => {
        operator.addEventListener('click', () => {
            if(answer === undefined || answer === null) { //first ever input
                answer = inputValue;
            }
            else if (inputValue !== undefined && inputValue !== null){ //chained inputs
                answer = operate(operatorValue, answer, inputValue);
                currentInputDisplay.innerText = answer;
            }
            operatorValue = operator.innerText;
            inputValue = null;
            currentEquationDisplay.innerText =  answer + " " + operatorValue;
        })
    })
}

function listenToEqual() {
    const equals = document.querySelector('.equals');
    equals.addEventListener('click', () => {
        if(inputValue !== undefined && inputValue !== null && answer !== undefined && answer !== null) {
            answer = operate(operatorValue, answer, inputValue);
            currentInputDisplay.innerText = answer;
            currentEquationDisplay.innerText = answer;
            inputValue = null; 
        }
    })
}

function listenToClear() {
    const clear = document.querySelector('.clear');
    clear.addEventListener('click', () => {
        inputValue = null;
        answer = null;
        operatorValue = null;
        currentInputDisplay.innerText = '';
        currentEquationDisplay.innerText = '';
    })
}

function calculator() {

    //numbers
    listenToNumbers();

    //operators
    listenToOperators();

    //equals
    listenToEqual();

    //clear
    listenToClear();
}

calculator();