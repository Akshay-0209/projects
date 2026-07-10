function validateNumber(x) {
  if (typeof x !== 'number' || !Number.isFinite(x)) {
    throw new Error('Input must be a finite number');
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
  if (b === 0) throw new Error('Divide by zero');
  return a / b;
}

module.exports = { add, subtract, multiply, divide };
