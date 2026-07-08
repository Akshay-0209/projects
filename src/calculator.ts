export function validateInput(a: any, b: any) {
    if (typeof a !== 'number' || typeof b !== 'number' || !Number.isFinite(a) || !Number.isFinite(b)) {
        throw new Error('Inputs must be finite numbers');
    }
}

export function add(a: number, b: number): number {
    validateInput(a, b);
    return a + b;
}

export function subtract(a: number, b: number): number {
    validateInput(a, b);
    return a - b;
}

export function multiply(a: number, b: number): number {
    validateInput(a, b);
    return a * b;
}

export function divide(a: number, b: number): number {
    validateInput(a, b);
    if (b === 0) throw new Error('Cannot divide by zero');
    return a / b;
}
