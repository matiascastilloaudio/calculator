let firstNumber = '';
let secondNumber = '';
let operator = null;
let isSecondNumber = false;
const maxLength = 7;  // character limit

// get selected number 
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', function () {
        const number = button.textContent;
        handleNumber(number);
    });
});

function handleNumber(number) {
    if (number === ',') {
        number = '.';
    }

    if (!isSecondNumber) {
        if (firstNumber.length < maxLength) {
            firstNumber += number;
        }
    } else if (secondNumber.length < maxLength) {
        secondNumber += number;
    }

    updateDisplay();
}

// get selected operator 
document.querySelectorAll('.op').forEach(button => {
    button.addEventListener('click', function () {
        const op = button.textContent;

        if (op === '%') {
            operatePercentage();
            updateDisplay();
        } else if (op === '+/-') {
            toggleSign();
            updateDisplay();
        } else if (op === '=') {
            if (firstNumber && secondNumber && operator) {
                operate();
                updateDisplay();
            }
        } else {
            operator = (op === 'x') ? '*' : op;
            isSecondNumber = true;
        }
    });
});

function operate() {
    const num1 = parseFloat(firstNumber.slice(0, maxLength));
    const num2 = parseFloat(secondNumber.slice(0, maxLength));

    if (operator === '+') {
        firstNumber = (num1 + num2).toString();
    } else if (operator === '-') {
        firstNumber = (num1 - num2).toString();
    } else if (operator === '*') {
        firstNumber = (num1 * num2).toString();
    } else if (operator === '/') {
        if (num2 == 0) {
            firstNumber = 'Error';
        } else {
            firstNumber = (num1 / num2).toString();
        }
    }

    firstNumber = firstNumber.slice(0, maxLength);

    secondNumber = '';
    operator = null;
    isSecondNumber = false;
}

function operatePercentage() {
    if (!isSecondNumber) {
        firstNumber = (parseFloat(firstNumber) / 100).toString();
    } else {
        secondNumber = (parseFloat(secondNumber) / 100).toString();
    }
}

function toggleSign() {
    if (!isSecondNumber) {
        firstNumber = (parseFloat(firstNumber) * -1).toString();
    } else {
        secondNumber = (parseFloat(secondNumber) * -1).toString();
    }
}

// update display
function updateDisplay() {
    const displayValue = document.querySelector('#display p');

    if (!isSecondNumber) {
        displayValue.textContent = firstNumber.slice(0, maxLength) || '0';
    } else {
        displayValue.textContent = secondNumber.slice(0, maxLength);
    }
    displayValue.textContent = displayText.slice(0, maxLength);
}

// reset display
document.querySelector('.alt').addEventListener('click', function () {
    firstNumber = '';
    secondNumber = '';
    operator = null;
    isSecondNumber = false;
    updateDisplay();
});
