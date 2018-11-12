const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')

// Add event listeners for key presses
keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    // Do something
  }
})
