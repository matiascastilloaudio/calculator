let firstNumber = '';
let secondNumber = '';
let operator = null;
let isSecondNumber = false;
const maxLength = 7;  // Definir el límite de caracteres

// Obtener los botones de números
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', function () {
        const number = button.textContent;
        handleNumber(number);
    });
});

function handleNumber(number) {
    if (number === ',') {
        number = '.';  // Reemplaza la coma por un punto decimal
    }

    if (!isSecondNumber) {
        if (firstNumber.length < maxLength) {  // Limitar la longitud del primer número
            firstNumber += number;
        }
    } else {
        if (secondNumber.length < maxLength) {  // Limitar la longitud del segundo número
            secondNumber += number;
        }
    }
    updateDisplay();
}

// Obtener los botones de operadores
document.querySelectorAll('.op').forEach(button => {
    button.addEventListener('click', function () {
        const op = button.textContent;

        // Si el operador es porcentaje o cambiar signo
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
            operator = (op === 'x') ? '*' : op;  // Reemplazar la "x" por "*"
            isSecondNumber = true;  // Ahora ingresamos el segundo número
        }
    });
});

// Realizar el cálculo principal
function operate() {
    const num1 = parseFloat(firstNumber.slice(0, maxLength));  // Limitar longitud antes del cálculo
    const num2 = parseFloat(secondNumber.slice(0, maxLength));  // Limitar longitud antes del cálculo

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

    // Limitar el resultado a la longitud máxima
    firstNumber = firstNumber.slice(0, maxLength);

    // Resetear el segundo número y el operador para la siguiente operación
    secondNumber = '';
    operator = null;
    isSecondNumber = false;
}

// Operar el porcentaje
function operatePercentage() {
    if (!isSecondNumber) {
        firstNumber = (parseFloat(firstNumber) / 100).toString();
    } else {
        secondNumber = (parseFloat(secondNumber) / 100).toString();
    }
}

// Cambiar el signo de un número
function toggleSign() {
    if (!isSecondNumber) {
        firstNumber = (parseFloat(firstNumber) * -1).toString();
    } else {
        secondNumber = (parseFloat(secondNumber) * -1).toString();
    }
}

// Actualizar la pantalla
function updateDisplay() {
    const displayValue = document.querySelector('#display p');
    // let displayText = firstNumber || '0';

    if (!isSecondNumber) {
        displayValue.textContent = firstNumber.slice(0, maxLength) || '0';
    } else {
        displayValue.textContent = secondNumber.slice(0, maxLength);
    }
    displayValue.textContent = displayText.slice(0, maxLength);
}

// Limpiar pantalla
document.querySelector('.alt').addEventListener('click', function () {
    firstNumber = '';
    secondNumber = '';
    operator = null;
    isSecondNumber = false;
    updateDisplay();
});
