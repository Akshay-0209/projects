// src/calculator.js

function validateNumber(input) {
  if (typeof input !== 'number' || isNaN(input)) {
    throw new Error('Invalid input: input must be a valid number');
  }
}

export function add(a, b) {
  validateNumber(a);
  validateNumber(b);
  return a + b;
}

export function subtract(a, b) {
  validateNumber(a);
  validateNumber(b);
  return a - b;
}

export function multiply(a, b) {
  validateNumber(a);
  validateNumber(b);
  return a * b;
}

export function divide(a, b) {
  validateNumber(a);
  validateNumber(b);
  if (b === 0) {
    throw new Error('Divide by zero error');
  }
  return a / b;
}
