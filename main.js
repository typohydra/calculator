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
    if( inputValue !== undefined && inputValue !== null &&
        ((inputValue.includes('.') && inputValue.length > 14) || 
        ( !inputValue.includes('.') && inputValue.length >= 14))) {
        alert("Can't enter more than 14 digits");
        return currentInputDisplay.innerText;
    }
    else {
        currentInputDisplay.innerText += value;
        return currentInputDisplay.innerText;
    }
}

function listenToNumbers() {
    const numbers = document.querySelectorAll('.number');
    numbers.forEach( number => {
        number.addEventListener('click', () => {
            if(answer === "quick mafs?") {
                clearCalc()
            }
            else if(inputValue === undefined || inputValue === null) {
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
            if(inputValue === undefined || inputValue == "") {
                //pass(operator won't show up if number is not entered)
                //checked against the empty string because of the backspace
            }
            else if(answer === "quick mafs?") {
                clearCalc()
            }
            else if(answer === undefined || answer === null) { //first ever input
                answer = inputValue;
            }
            else if (inputValue !== undefined && inputValue !== null){ //chained inputs
                answer = operate(operatorValue, answer, inputValue);
                currentInputDisplay.innerText = answer;
            }

            if((inputValue !== undefined && inputValue !== "") || (inputValue === "" && currentEquationDisplay.innerText !== ""))
            {
                operatorValue = operator.innerText;
                inputValue = null;
                currentEquationDisplay.innerText =  answer + " " + operatorValue;
            }
        })
    })
}

function listenToEqual() {
    const equals = document.querySelector('.equals');
    equals.addEventListener('click', () => {
        if(answer === "quick mafs?") {
            clearCalc()
        }
        else if(inputValue !== undefined && inputValue !== null && answer !== undefined && answer !== null) {
            answer = operate(operatorValue, answer, inputValue);
            currentInputDisplay.innerText = answer;
            currentEquationDisplay.innerText = answer;
            inputValue = null; 
        }
    })
}

function clearCalc() {
    inputValue = undefined;
    answer = null;
    operatorValue = null;
    currentInputDisplay.innerText = '';
    currentEquationDisplay.innerText = '';
}

function listenToClear() {
    const clear = document.querySelector('.clear');
    clear.addEventListener('click', () => {
        clearCalc()
    })
}

function listenToPoint() {
    const point = document.querySelector('.point');
    point.addEventListener('click', () => {
        if(answer === "quick mafs?") {
            clearCalc()
        }
        else if(currentInputDisplay.innerText === '') {
            displayToScreen('0.');
            inputValue += 0.0;
        }
        else if(!(currentInputDisplay.innerText).includes('.')) {
            displayToScreen('.');
        }
    })
}

function listenToBackspace() {
    const backspace = document.querySelector('.backspace');
    backspace.addEventListener('click', () => {
        if(answer === "quick mafs?") {
            clearCalc()
        }
        else {
            currentInputDisplay.innerText = (currentInputDisplay.innerText).slice(0, -1); //removes last character
        }
        inputValue = currentInputDisplay.innerText;
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

    //floating point
    listenToPoint();

    //backspace
    listenToBackspace();
}

calculator();