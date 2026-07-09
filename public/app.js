const display = document.getElementById('display');
let current = '';
let operand = null;
let operator = null;
let waitingForOperand = false;

function updateDisplay(value) {
  display.textContent = value;
}

function safeEval(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (!isFinite(a) || !isFinite(b)) return 'Error';
  switch(op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/':
      if (b === 0) return 'Error';
      return a / b;
    default: return b;
  }
}

function inputNumber(num) {
  if (waitingForOperand) {
    current = num === '.' ? '0.' : num;
    waitingForOperand = false;
  } else {
    if (num === '.' && current.includes('.')) return;
    if (current === '0' && num !== '.') {
      current = num;
    } else {
      current += num;
    }
  }
  updateDisplay(current);
}

function inputOperator(op) {
  if (operator && !waitingForOperand) {
    const result = safeEval(operand, current, operator);
    if (result === 'Error') {
      updateDisplay('Error');
      reset();
      return;
    }
    operand = result;
    updateDisplay(String(result));
  } else {
    operand = current;
  }
  operator = op;
  waitingForOperand = true;
}

function inputEquals() {
  if (operator && !waitingForOperand) {
    const result = safeEval(operand, current, operator);
    updateDisplay(result === 'Error' ? 'Error' : String(result));
    if (result === 'Error') {
      reset();
    } else {
      current = String(result);
      operand = null;
      operator = null;
      waitingForOperand = false;
    }
  }
}

function clearAll() {
  current = '';
  operand = null;
  operator = null;
  waitingForOperand = false;
  updateDisplay('0');
}

function backspace() {
  if (waitingForOperand || display.textContent === 'Error') return;
  if (current.length > 1) {
    current = current.slice(0, -1);
    updateDisplay(current);
  } else {
    current = '0';
    updateDisplay('0');
  }
}

// Event delegation for buttons
document.querySelector('.buttons').addEventListener('click', (e) => {
  const t = e.target;
  if (t.classList.contains('btn')) {
    if (t.dataset.num !== undefined) {
      inputNumber(t.dataset.num);
    } else if (t.classList.contains('operator')) {
      inputOperator(t.dataset.op);
    } else if (t.classList.contains('equals')) {
      inputEquals();
    } else if (t.id === 'clear') {
      clearAll();
    } else if (t.id === 'backspace') {
      backspace();
    }
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') inputNumber(e.key);
  if (e.key === '.') inputNumber('.');
  if (['+', '-', '*', '/'].includes(e.key)) inputOperator(e.key);
  if (e.key === 'Enter' || e.key === '=') inputEquals();
  if (e.key === 'Backspace') backspace();
  if (e.key.toLowerCase() === 'c') clearAll();
});

clearAll(); // Initialize
