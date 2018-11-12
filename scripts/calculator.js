// calculate function
var calculate = function calculate(n1, operator, n2) {
 var result = '';
 if (operator === 'add') {
   result = parseFloat(n1) + parseFloat(n2);
 } else if (operator === 'subtract') {
   result = parseFloat(n1) - parseFloat(n2);
 } else if (operator === 'multiply') {
   result = parseFloat(n1) * parseFloat(n2);
 } else if (operator === 'divide') {
   result = parseFloat(n1) / parseFloat(n2);
 }

 return result;
};

var calculator = document.querySelector('.calculator');
var display = calculator.querySelector('.calculator__display');
var keys = calculator.querySelector('.calculator__keys');

// Add event listeners for key presses
keys.addEventListener('click', function (e) {
  if (e.target.matches('button')) {
    // determing the type of key pressed with a data-action attribute
    var key = e.target
    var action = key.dataset.action
    // what number has been clicked and the currents displayed number
    var keyContent = key.textContent
    var displayedNum = display.textContent
    // previous pressed key is an operator
    var previousKeyType = calculator.dataset.previousKeyType;

    // for loop to remove .is-depressed class from all keys
    Array.from(key.parentNode.children).
    forEach(function (k) {return k.classList.remove('is-depressed');});

    // check if its a number button
    if (!action) {
      // if the displayed number is 0 or the previos key was and operator we want to replace it with the new number clicked or the complete calculation
      if (displayedNum === '0' ||
      previousKeyType === 'operator' ||
      previousKeyType === 'calculate') {
        display.textContent = keyContent
      // if it not a 0 append clicked keys
      } else {
        display.textContent = displayedNum + keyContent
      }
      // update previous key type after wach click to number
      calculator.dataset.previousKeyType = 'number';
    }

    // check if its the decimal button and add decimal to displayed number
    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.'
      } else if (
        previousKeyType === 'operator' ||
        previousKeyType === 'calculate')
      {
        display.textContent = '0.';
      }
      // update previous key type after wach click to decimal
      calculator.dataset.previousKeyType = 'decimal';
    }

    // check if its an operator button and if its pressed add class to show its been pressed
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      var firstValue = calculator.dataset.firstValue;
      var operator = calculator.dataset.operator;
      var secondValue = displayedNum;
      // if a number, an operator, a number and another operator is hit then the display should be updated to a calculated value.
      if (
      firstValue &&
      operator &&
      previousKeyType !== 'operator' &&
      previousKeyType !== 'calculate')
      {
        var calcValue = calculate(firstValue, operator, secondValue);
        display.textContent = calcValue;
        calculator.dataset.firstValue = calcValue;
      } else {
        calculator.dataset.firstValue = displayedNum;
      }

      key.classList.add('is-depressed')
      // add custome attribute to tell if previous pressed button was an operator
      calculator.dataset.previousKeyType = 'operator';
      // first number added to the calculator
      calculator.dataset.firstValue = displayedNum;
      // the operator being used
      calculator.dataset.operator = action
    }

    // if the action is clear set to 0 or clear entry
    if (action === 'clear') {
      // if Ac is clicked clear all stored values and operators
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = '';
        calculator.dataset.modValue = '';
        calculator.dataset.operator = '';
        calculator.dataset.previousKeyType = '';
      // if CE is pressed set text to AC
      } else {
        key.textContent = 'AC';
      }

      display.textContent = 0;
      calculator.dataset.previousKeyType = 'clear';
    }

    // if the action is not clear changed text to CE
    if (action !== 'clear') {
      var clearButton = calculator.querySelector('[data-action=clear]');
      clearButton.textContent = 'CE';
    }

    // check if its the calculate button and do calculation
    if (action === 'calculate') {
      var _firstValue = calculator.dataset.firstValue;
      var _operator = calculator.dataset.operator;
      var _secondValue = displayedNum;
      // first value is set then calculate
      if (_firstValue) {
        if (previousKeyType === 'calculate') {
          _firstValue = displayedNum;
          _secondValue = calculator.dataset.modValue;
        }
        // display calculation
        display.textContent = calculate(_firstValue, _operator, _secondValue);
      }

      calculator.dataset.modValue = _secondValue;
      calculator.dataset.previousKeyType = 'calculate';
    }
  }
})
