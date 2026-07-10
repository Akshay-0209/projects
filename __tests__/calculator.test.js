const { add, subtract, multiply, divide } = require('../src/calculator');

describe('add', () => {
  test('adds two positive integers', () => {
    expect(add(2, 3)).toBe(5);
  });
  test('adds two negative integers', () => {
    expect(add(-2, -5)).toBe(-7);
  });
  test('adds a positive and a negative number', () => {
    expect(add(7, -2)).toBe(5);
  });
  test('adds zero', () => {
    expect(add(0, 5)).toBe(5);
    expect(add(5, 0)).toBe(5);
  });
  test('adds floating point numbers', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    expect(add(-0.1, -0.2)).toBeCloseTo(-0.3);
  });
  test('throws on NaN input', () => {
    expect(() => add(NaN, 2)).toThrow(TypeError);
    expect(() => add(2, NaN)).toThrow(TypeError);
  });
  test('throws on Infinity input', () => {
    expect(() => add(Infinity, 2)).toThrow(TypeError);
    expect(() => add(2, Infinity)).toThrow(TypeError);
  });
});

describe('subtract', () => {
  test('subtracts two positive integers', () => {
    expect(subtract(10, 3)).toBe(7);
  });
  test('subtracts negatives', () => {
    expect(subtract(-10, -3)).toBe(-7);
  });
  test('subtracts zero', () => {
    expect(subtract(0, 5)).toBe(-5);
    expect(subtract(5, 0)).toBe(5);
  });
  test('subtracts floats', () => {
    expect(subtract(0.3, 0.1)).toBeCloseTo(0.2);
    expect(subtract(-0.3, -0.1)).toBeCloseTo(-0.2);
  });
  test('throws on NaN input', () => {
    expect(() => subtract(NaN, 2)).toThrow(TypeError);
    expect(() => subtract(2, NaN)).toThrow(TypeError);
  });
  test('throws on Infinity input', () => {
    expect(() => subtract(Infinity, 2)).toThrow(TypeError);
    expect(() => subtract(2, Infinity)).toThrow(TypeError);
  });
});

describe('multiply', () => {
  test('multiplies two positive integers', () => {
    expect(multiply(2, 3)).toBe(6);
  });
  test('multiplies by zero', () => {
    expect(multiply(5, 0)).toBe(0);
    expect(multiply(0, 5)).toBe(0);
  });
  test('multiplies two negative numbers', () => {
    expect(multiply(-2, -3)).toBe(6);
  });
  test('multiplies positive and negative', () => {
    expect(multiply(-2, 3)).toBe(-6);
  });
  test('multiplies floats', () => {
    expect(multiply(0.2, 0.3)).toBeCloseTo(0.06);
    expect(multiply(-0.2, -0.3)).toBeCloseTo(0.06);
  });
  test('throws on NaN input', () => {
    expect(() => multiply(NaN, 2)).toThrow(TypeError);
    expect(() => multiply(2, NaN)).toThrow(TypeError);
  });
  test('throws on Infinity input', () => {
    expect(() => multiply(Infinity, 2)).toThrow(TypeError);
    expect(() => multiply(2, Infinity)).toThrow(TypeError);
  });
});

describe('divide', () => {
  test('divides two positive integers', () => {
    expect(divide(6, 2)).toBe(3);
  });
  test('divides negative by positive', () => {
    expect(divide(-6, 2)).toBe(-3);
  });
  test('divides positive by negative', () => {
    expect(divide(6, -2)).toBe(-3);
  });
  test('divides two negative numbers', () => {
    expect(divide(-6, -2)).toBe(3);
  });
  test('divides floats', () => {
    expect(divide(0.3, 0.1)).toBeCloseTo(3);
    expect(divide(-0.3, -0.1)).toBeCloseTo(3);
  });
  test('throws on divide by zero', () => {
    expect(() => divide(1, 0)).toThrow(/zero/);
    expect(() => divide(-1, 0)).toThrow(/zero/);
    expect(() => divide(0, 0)).toThrow(/zero/);
  });
  test('throws on NaN input', () => {
    expect(() => divide(NaN, 2)).toThrow(TypeError);
    expect(() => divide(2, NaN)).toThrow(TypeError);
  });
  test('throws on Infinity input', () => {
    expect(() => divide(Infinity, 2)).toThrow(TypeError);
    expect(() => divide(2, Infinity)).toThrow(TypeError);
  });
});
