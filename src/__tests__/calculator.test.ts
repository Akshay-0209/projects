import { add, subtract, multiply, divide } from '../calculator';

describe('Calculator Functions', () => {
  describe('add', () => {
    it('adds two positive integers', () => {
      expect(add(2, 3)).toBe(5);
    });
    it('adds positive and negative numbers', () => {
      expect(add(-2, 3)).toBe(1);
      expect(add(2, -3)).toBe(-1);
    });
    it('adds two floats', () => {
      expect(add(2.5, 3.1)).toBeCloseTo(5.6);
    });
    it('adds large numbers', () => {
      expect(add(1e10, 1e10)).toBe(2e10);
    });
  });

  describe('subtract', () => {
    it('subtracts two positive integers', () => {
      expect(subtract(5, 3)).toBe(2);
    });
    it('subtracts positive and negative numbers', () => {
      expect(subtract(-2, 3)).toBe(-5);
      expect(subtract(2, -3)).toBe(5);
    });
    it('subtracts two floats', () => {
      expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
    });
    it('subtracts large numbers', () => {
      expect(subtract(1e12, 1e10)).toBe(9.9e11);
    });
  });

  describe('multiply', () => {
    it('multiplies two positive integers', () => {
      expect(multiply(2, 3)).toBe(6);
    });
    it('multiplies positive and negative numbers', () => {
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(2, -3)).toBe(-6);
    });
    it('multiplies two floats', () => {
      expect(multiply(2.5, 3.2)).toBeCloseTo(8.0);
    });
    it('multiplies large numbers', () => {
      expect(multiply(1e6, 1e6)).toBe(1e12);
    });
    it('multiplies by zero', () => {
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 5)).toBe(0);
    });
  });

  describe('divide', () => {
    it('divides two positive integers', () => {
      expect(divide(6, 3)).toBe(2);
    });
    it('divides positive and negative numbers', () => {
      expect(divide(-6, 3)).toBe(-2);
      expect(divide(6, -3)).toBe(-2);
    });
    it('divides two floats', () => {
      expect(divide(5.5, 2.2)).toBeCloseTo(2.5);
    });
    it('divides large numbers', () => {
      expect(divide(1e12, 1e6)).toBe(1e6);
    });
    it('throws error on divide by zero', () => {
      expect(() => divide(5, 0)).toThrowError('Cannot divide by zero');
    });
  });
});
