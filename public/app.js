// Calculator logic for UI
let display = document.getElementById('display');
let current = '';
let operator = null;
let operand = null;
let justEvaluated = false;

function updateDisplay(val) {
  display.textContent = val;
}

function inputDigit(digit) {
  if (justEvaluated) {
    current = '';
    justEvaluated = false;
  }
  if (digit === '.' && current.includes('.')) return;
  if (digit === '.' && current === '') current = '0';
  current += digit;
  if (current.length > 16) current = current.slice(0, 16);
  updateDisplay(current);
}

function clearAll() {
  current = '';
  operator = null;
  operand = null;
  justEvaluated = false;
  updateDisplay('0');
}

function backspace() {
  if (justEvaluated) return;
  current = current.slice(0, -1);
  updateDisplay(current || '0');
}

function inputOperator(op) {
  if (current === '' && operand != null) { operator = op; return; }
  if (current === '') return;
  if (operand == null) {
    operand = Number(current);
  } else {
    operand = compute(operand, Number(current), operator);
    updateDisplay((operand === Infinity || isNaN(operand)) ? 'Error' : operand);
  }
  operator = op;
  current = '';
}

function compute(a, b, op) {
  if (op === '+') return window.Calculator.add(a, b);
  if (op === '-') return window.Calculator.subtract(a, b);
  if (op === '×') return window.Calculator.multiply(a, b);
  if (op === '÷') {
    if (b === 0) return Infinity;
    return window.Calculator.divide(a, b);
  }
  return b;
}

function equals() {
  if (operator && current !== '') {
    let a = operand;
    let b = Number(current);
    let result = compute(a, b, operator);
    if (result === Infinity || isNaN(result)) {
      updateDisplay('Error');
    } else {
      updateDisplay(result);
    }
    current = result === Infinity || isNaN(result) ? '' : result.toString();
    operand = null;
    operator = null;
    justEvaluated = true;
  } else if (current !== '') {
    updateDisplay(current);
    justEvaluated = true;
  }
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.digit !== undefined) {
      inputDigit(btn.dataset.digit);
    } else if (btn.dataset.action) {
      switch (btn.dataset.action) {
        case 'clear': clearAll(); break;
        case 'backspace': backspace(); break;
        case 'add': inputOperator('+'); break;
        case 'subtract': inputOperator('-'); break;
        case 'multiply': inputOperator('×'); break;
        case 'divide': inputOperator('÷'); break;
        case 'decimal': inputDigit('.'); break;
        case 'equals': equals(); break;
      }
    }
  });
});

// Load calculator logic
window.Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b === 0 ? NaN : a / b
};
