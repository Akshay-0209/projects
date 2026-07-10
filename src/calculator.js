// src/calculator.js
function isValidNumber(n) {
  return typeof n === 'number' && isFinite(n);
}

function add(a, b) {
  if (!isValidNumber(a) || !isValidNumber(b)) throw new TypeError('Invalid number input');
  return a + b;
}

function subtract(a, b) {
  if (!isValidNumber(a) || !isValidNumber(b)) throw new TypeError('Invalid number input');
  return a - b;
}

function multiply(a, b) {
  if (!isValidNumber(a) || !isValidNumber(b)) throw new TypeError('Invalid number input');
  return a * b;
}

function divide(a, b) {
  if (!isValidNumber(a) || !isValidNumber(b)) throw new TypeError('Invalid number input');
  if (b === 0) throw new Error('Divide by zero');
  return a / b;
}

module.exports = { add, subtract, multiply, divide };