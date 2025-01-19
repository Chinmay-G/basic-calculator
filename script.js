'use strict';

const mainDisplay = document.querySelector('.mainDisplay');
const backDisplay = document.querySelector('.backDisplay');

const btn = document.querySelectorAll('.btn');
const btnNumber = document.querySelectorAll('.btn_number');
const btnOperator = document.querySelectorAll('.btn_operator');
const equals = document.querySelector('.btn_equals');
const allClear = document.querySelector('#allClear');
const backspace = document.querySelector('#backspace');
const signChange = document.querySelector('#signChange');

const one = document.querySelector('#one');
const two = document.querySelector('#two');
const three = document.querySelector('#three');
const four = document.querySelector('#four');
const five = document.querySelector('#five');
const six = document.querySelector('#six');
const seven = document.querySelector('#seven');
const eight = document.querySelector('#eight');
const nine = document.querySelector('#nine');
const zero = document.querySelector('#zero');
const point = document.querySelector('#point');

const add = document.querySelector('#add');
const subtract = document.querySelector('#subtract');
const multiply = document.querySelector('#multiply');
const divide = document.querySelector('#divide');
const remainer = document.querySelector('#remainer');

let acc = ''; // accumalator
let operator = '';
let number2 = '';

let opSwitch = false;
let opSwitch2 = false; // for when operator is used more than once
let firstNumSwitch = false;
let equalsPressed = false;
let equalsPressed2 = false;
let allClearPressed = false;
let backspaceSwitch = false;

let result = '';

// FUNCTIONS ///////////////////////////

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

    result = Math.round((result + Number.EPSILON) * 100000) / 100000; // decimal rounded off to 5 places
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

// get Number
const getNum = function (btn) {
    btnNumber.forEach(function (n) {
        // First number a
        if (n.value === btn.value && opSwitch === false) {

            switch (n.value) {
                case '.':
                    if (acc.includes('.')) { }
                    else acc = acc + n.value;
                    break;
                default: acc = acc + n.value;
            }
            firstNumSwitch = true;

            updateDisplay();
        };

        // Second number b
        if (n.value === btn.value && opSwitch === true) {

            switch (n.value) {
                case '.':
                    if (number2.includes('.')) { }
                    else number2 = number2 + n.value;
                    break;
                default: number2 = number2 + n.value;
            }
            firstNumSwitch = false;

            updateDisplay();
        }

        // if equals is pressed right before and user tries to enter number
        if (n.value === btn.value && equalsPressed2) {
            clearAll();
            equalsPressed2 = false;
        };
    });
};

// get Operator
const getOp = function (btn) {
    btnOperator.forEach(function (o) {
        // if equals is pressed right before and user tries to enter operator (it will operate smoothly)
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
};

// get Equals
const getEquals = function () {
    if (firstNumSwitch === false) {
        operate(acc, operator, number2);

        equalsPressed = true;
        equalsPressed2 = true;
        updateDisplay();
        equalsPressed = false;
    }
};

// get Backspace
const getBackspace = function () {
    if (opSwitch === false && equalsPressed2 === false) {
        acc = acc.slice(0, -1);
        updateDisplay();
    }
    if (opSwitch === true && firstNumSwitch === false && equalsPressed2 === false) {
        number2 = number2.slice(0, -1);
        updateDisplay();
    }
};

// change Sign
const changeSign = function () {
    if (opSwitch === false && equalsPressed2 === false) {
        acc = -acc;
        updateDisplay();
    }
    if (opSwitch === true && firstNumSwitch === false && equalsPressed2 === false) {
        number2 = -number2;
        updateDisplay();
    }
    if (equalsPressed2 === true) { }
};


// EVENT HANDLERS ///////////////////

// on Click
// getting Numbers and operators
btn.forEach(btnn => btnn.addEventListener("click", function (e) {
    getNum(btnn);
    getOp(btnn);
}));

// getting Equals
equals.addEventListener('click', getEquals);

// AllClear
allClear.addEventListener('click', clearAll);

// Backspace
backspace.addEventListener('click', getBackspace);

// Sign Change
signChange.addEventListener('click', changeSign);


// on Key
document.addEventListener('keydown', function (k) {
    k.preventDefault();

    if (k.key === '1') getNum(one);
    if (k.key === '2') getNum(two);
    if (k.key === '3') getNum(three);
    if (k.key === '4') getNum(four);
    if (k.key === '5') getNum(five);
    if (k.key === '6') getNum(six);
    if (k.key === '7') getNum(seven);
    if (k.key === '8') getNum(eight);
    if (k.key === '9') getNum(nine);
    if (k.key === '0') getNum(zero);
    if (k.key === '.') getNum(point);

    if (k.key === '+') getOp(add);
    if (k.key === '-') getOp(subtract);
    if (k.key === '*') getOp(multiply);
    if (k.key === '/') getOp(divide);
    if (k.key === '%') getOp(remainer);

    if (k.keyCode === 13 || k.key === '=') getEquals(); // equals

    if (k.code === 'Space') clearAll(); // spacebar

    if (k.keyCode === 8) getBackspace(); // backspace
});
