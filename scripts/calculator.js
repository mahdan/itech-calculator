const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')

// Add event listeners for key presses
keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    // determing the type of key pressed with a data-action attribute
    const key = e.target
    const action = key.dataset.action

    // check if it doesnt have data-action attribute
    if (!action) {
      console.log('number key!')
    }

    // check if it does have data-action attribute
    if (
      action === 'add' ||
      action === 'subtract' ||
      action === 'multiply' ||
      action === 'divide'
    ) {
      console.log('operator key!')
    }
  }
})
