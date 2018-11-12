var calculator = document.querySelector('.calculator');
var keys = calculator.querySelector('.calculator__keys');

// Add event listeners for key presses
keys.addEventListener('click', function (e) {
  if (e.target.matches('button')) {
    // determing the type of key pressed with a data-action attribute
    const key = e.target
    const action = key.dataset.action
    //check what number has been clicked and the currents displayed number
    const keyContent = key.textContent
    const displayedNum = display.textContent

    // for loop to remove .is-depressed class from all keys
    Array.from(key.parentNode.children).
    forEach(function (k) {return k.classList.remove('is-depressed');});

    // check if its a number button
    if (!action) {
      // if the displayed number is 0 we want to replace it with the new number clicked
      if (displayedNum === '0') {
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
    }

    // check if its the decimal button and add decimal to displayed number
    if (action === 'decimal') {
      display.textContent = displayedNum + '.'
    }

    // check if its the clear button
    if (action === 'clear') {
      console.log('clear key!')
    }

    // check if its the calculate button
    if (action === 'calculate') {
      console.log('equal key!')
    }
  }
})
