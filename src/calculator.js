function checkNumber(x, name) {
  if (typeof x !== 'number' || !Number.isFinite(x)) {
    throw new TypeError(`${name} must be a finite number`);
  }
}

function add(a, b) {
  checkNumber(a, 'a');
  checkNumber(b, 'b');
  return a + b;
}

function subtract(a, b) {
  checkNumber(a, 'a');
  checkNumber(b, 'b');
  return a - b;
}

function multiply(a, b) {
  checkNumber(a, 'a');
  checkNumber(b, 'b');
  return a * b;
}

function divide(a, b) {
  checkNumber(a, 'a');
  checkNumber(b, 'b');
  if (b === 0) {
    throw new Error('Divide by zero');
  }
  return a / b;
}

module.exports = { add, subtract, multiply, divide };
