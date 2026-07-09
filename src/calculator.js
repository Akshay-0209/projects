function validateNumber(n) {
  if (typeof n !== 'number' || isNaN(n) || !isFinite(n)) {
    throw new Error('Invalid number input');
  }
}

function add(a, b) {
  validateNumber(a);
  validateNumber(b);
  return a + b;
}

function subtract(a, b) {
  validateNumber(a);
  validateNumber(b);
  return a - b;
}

function multiply(a, b) {
  validateNumber(a);
  validateNumber(b);
  return a * b;
}

function divide(a, b) {
  validateNumber(a);
  validateNumber(b);
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
}

module.exports = { add, subtract, multiply, divide };
