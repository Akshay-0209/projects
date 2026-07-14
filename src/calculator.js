// src/calculator.js - Pure calculator logic with validation
function isNumber(n) {
  return typeof n === 'number' && !isNaN(n) && isFinite(n);
}

function add(a, b) {
  if (!isNumber(a) || !isNumber(b)) throw new TypeError('Inputs must be valid numbers');
  return a + b;
}

function subtract(a, b) {
  if (!isNumber(a) || !isNumber(b)) throw new TypeError('Inputs must be valid numbers');
  return a - b;
}

function multiply(a, b) {
  if (!isNumber(a) || !isNumber(b)) throw new TypeError('Inputs must be valid numbers');
  return a * b;
}

function divide(a, b) {
  if (!isNumber(a) || !isNumber(b)) throw new TypeError('Inputs must be valid numbers');
  if (b === 0) throw new Error('Divide by zero');
  return a / b;
}

module.exports = { add, subtract, multiply, divide };
