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
      // if the displayed number is 0 or the previos key was and operator we want to replace it with the new number clicked
      if (displayedNum === '0' || previousKeyType === 'operator') {
        display.textContent = keyContent
      // if it not a 0 append clicked keys
      } else {
        display.textContent = displayedNum + keyContent
      }
    }

    // check if its an operator button and if its pressed add class to show its been pressed
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      key.classList.add('is-depressed')
      // add custome attribute to tell if previous pressed button was an operator
      calculator.dataset.previousKeyType = 'operator';
      // first number added to the calculator
      calculator.dataset.firstValue = displayedNum;
      // the operator being used
      calculator.dataset.operator = action
    }

    // check if its the decimal button and add decimal to displayed number
    if (action === 'decimal') {
      display.textContent = displayedNum + '.'
    }

    // check if its the clear button
    if (action === 'clear') {
      console.log('clear key!')
    }

    // check if its the calculate button and do calculation
    if (action === 'calculate') {
      var firstValue = calculator.dataset.firstValue;
      var operator = calculator.dataset.operator;
      var secondValue = displayedNum;
      // display calculation
      display.textContent = calculate(firstValue, operator, secondValue);
    }
  }
})
