'use strict';

const mainDisplay = document.querySelector('.mainDisplay');
const backDisplay = document.querySelector('.backDisplay');

const btn = document.querySelectorAll('.btn');
const btnNumber = document.querySelectorAll('.btn_number');
const btnOperator = document.querySelectorAll('.btn_operator');
const equals = document.querySelector('.btn_equals');
const allClear = document.querySelector('#allClear');

let acc = ''; // accumalator
let operator = '';
let number2 = '';

let opSwitch = false;
let opSwitch2 = false; // for when operator is used more than once
let firstNumSwitch = false;
let equalsPressed = false;
let equalsPressed2 = false;
let allClearPressed = false;

let result = '';

//FUNCTIONS

// Operations
const operate = function (a, op, b) {
    a = +a;
    b = +b;
    switch (op) {
        case '+': result = a + b;
            break;
        case '-': result = a - b;
            break;
        case '*': result = a * b;
            break;
        case '/': result = a / b;
            break;
        case '%': result = a % b;
            break;
        default: break;
    };
    return result;
};

// Update Display
const updateDisplay = function () {
    // when olny first num is entered
    if (opSwitch === false)
        mainDisplay.textContent = acc + operator;
    // when operator is entered
    if (opSwitch === true) {
        backDisplay.textContent = acc + operator;
        mainDisplay.textContent = number2;
    }
    // when operator is used another time
    // when only operator is entered
    if (opSwitch2 === true && firstNumSwitch === true) {
        backDisplay.textContent = acc;
        mainDisplay.textContent = operator;
    }
    // when operator and number is entered another time
    if (opSwitch2 === true && firstNumSwitch === false) {
        backDisplay.textContent = acc + operator;
        mainDisplay.textContent = number2;
    }
    // when equals is pressed
    if (equalsPressed) {
        backDisplay.textContent = acc + operator + number2 + ' =';
        mainDisplay.textContent = result;
    }
    // when allClear is pressed
    if (allClearPressed) {
        backDisplay.textContent = '0';
        mainDisplay.textContent = '0';
    }
};

// clearAll
const clearAll = function () {
    acc = '';
    operator = '';
    number2 = '';
    result = '';
    opSwitch = false;
    opSwitch2 = false;
    firstNumSwitch = false;
    equalsPressed = false;
    equalsPressed2 = false;

    allClearPressed = true;
    updateDisplay();
    allClearPressed = false;
};

// EVENT HANDLERS

btn.forEach(btn => btn.addEventListener("click", function (e) {

    // All number buttons
    btnNumber.forEach(function (n) {
        // First number a
        if (n.value === btn.value && opSwitch === false) {
            acc = acc + n.value;
            firstNumSwitch = true;

            updateDisplay();
        };

        // Second number b
        if (n.value === btn.value && opSwitch === true) {
            number2 = number2 + n.value;
            firstNumSwitch = false;

            updateDisplay();
        }

        // if equals is pressed right before and user tries to enter number
        if (n.value === btn.value && equalsPressed2) {
            clearAll();
            equalsPressed2 = false;
        };
    });

    // All operator buttons
    btnOperator.forEach(function (o) {
        // if equals is pressed right before and user tries to enter number (it will operate smoothly)
        if (o.value === btn.value && equalsPressed2) equalsPressed2 = false;

        // operator used first time
        if (o.value === btn.value && firstNumSwitch === true) {
            operator = o.value;

            updateDisplay();
            opSwitch = true;
        }

        // operator used second time or more
        if (o.value === btn.value && firstNumSwitch === false) {
            acc = operate(acc, operator, number2);
            operator = o.value;
            number2 = '';

            opSwitch2 = true;
            firstNumSwitch = true;

            updateDisplay();
        }
    });

}));

// Equals
equals.addEventListener('click', function (e) {
    if (firstNumSwitch === false) {
        operate(acc, operator, number2);

        equalsPressed = true;
        equalsPressed2 = true;
        updateDisplay();
        equalsPressed = false;
    }
});

// AllClear
allClear.addEventListener('click', clearAll);

