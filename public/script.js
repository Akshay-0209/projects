const display = document.getElementById('display');
let current = '0';
let operand = null;
let operator = null;
let waitingForOperand = false;

function updateDisplay() {
  display.textContent = current;
}

function inputDigit(digit) {
  if (waitingForOperand) {
    current = digit;
    waitingForOperand = false;
  } else {
    if (current === '0') {
      current = digit;
    } else {
      current += digit;
    }
  }
}

function inputDecimal() {
  if (waitingForOperand) {
    current = '0.';
    waitingForOperand = false;
    return;
  }
  if (!current.includes('.')) {
    current += '.';
  }
}

function clearCalculator() {
  current = '0';
  operand = null;
  operator = null;
  waitingForOperand = false;
}

function backspace() {
  if (waitingForOperand || current.length === 1) {
    current = '0';
    waitingForOperand = false;
  } else {
    current = current.slice(0, -1);
  }
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(current);
  if (operator && waitingForOperand) {
    operator = nextOperator;
    return;
  }
  if (operand == null && !isNaN(inputValue)) {
    operand = inputValue;
  } else if (operator) {
    try {
      operand = operate(operator, operand, inputValue);
      current = String(operand);
    } catch (e) {
      current = 'Error';
      operand = null;
      operator = null;
      waitingForOperand = false;
      updateDisplay();
      return;
    }
  }
  operator = nextOperator;
  waitingForOperand = true;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return window.calculator.add(a, b);
    case '-':
      return window.calculator.subtract(a, b);
    case '×':
      return window.calculator.multiply(a, b);
    case '÷':
      return window.calculator.divide(a, b);
    default:
      return b;
  }
}

function handleEquals() {
  if (operator && operand != null && !waitingForOperand) {
    const inputValue = parseFloat(current);
    try {
      current = String(operate(operator, operand, inputValue));
    } catch (e) {
      current = 'Error';
    }
    operand = null;
    operator = null;
    waitingForOperand = false;
  }
}

document.querySelector('.calculator-buttons').addEventListener('click', (e) => {
  if (!e.target.matches('button')) return;
  const action = e.target.dataset.action;
  if (action >= '0' && action <= '9') {
    inputDigit(action);
    updateDisplay();
    return;
  }
  switch (action) {
    case 'decimal':
      inputDecimal();
      break;
    case 'clear':
      clearCalculator();
      break;
    case 'backspace':
      backspace();
      break;
    case 'add':
      handleOperator('+');
      break;
    case 'subtract':
      handleOperator('-');
      break;
    case 'multiply':
      handleOperator('×');
      break;
    case 'divide':
      handleOperator('÷');
      break;
    case 'equals':
      handleEquals();
      break;
    default:
      break;
  }
  updateDisplay();
});

// Calculator logic
window.calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error('Invalid number');
    if (b === 0) throw new Error('Divide by zero');
    return a / b;
  }
};

// Replace window.calculator methods with server-tested ones if loaded
updateDisplay();