// Calculator logic for client-side JavaScript

// Function to update the display
function updateDisplay(value) {
  const display = document.getElementById('display');
  display.value = value;
}

// Calculator state
let currentInput = '';
let previousInput = '';
let operator = null;
let resetNext = false;

// Function to handle digit and decimal input
function inputDigit(digit) {
  if (resetNext) {
    currentInput = digit;
    resetNext = false;
  } else {
    if (digit === '.' && currentInput.includes('.')) return;
    currentInput += digit;
  }
  updateDisplay(currentInput);
}

// Function to handle operator input
function inputOperator(op) {
  if (operator && !resetNext) {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  resetNext = true;
}

// Function to perform calculation
function calculate() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;

  let result;

  switch (operator) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      if (current === 0) {
        updateDisplay('Error');
        currentInput = '';
        previousInput = '';
        operator = null;
        resetNext = true;
        return;
      }
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  updateDisplay(currentInput);
  operator = null;
  resetNext = true;
}

// Function to clear the calculator
function clearCalculator() {
  currentInput = '';
  previousInput = '';
  operator = null;
  resetNext = false;
  updateDisplay('0');
}

// Attach event listeners to buttons after DOM loads
window.onload = function() {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const { action, value } = button.dataset;
      switch(action) {
        case 'digit':
          inputDigit(value);
          break;
        case 'operator':
          inputOperator(value);
          break;
        case 'equals':
          calculate();
          break;
        case 'clear':
          clearCalculator();
          break;
        default:
          break;
      }
    });
  });
  clearCalculator();
};
