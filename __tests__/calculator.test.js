const { add, subtract, multiply, divide } = require('../src/calculator');

describe('Calculator functions', () => {
  describe('add', () => {
    it('adds two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });
    it('adds negative and positive', () => {
      expect(add(-2, 5)).toBe(3);
    });
    it('adds two negative floats', () => {
      expect(add(-2.5, -3.1)).toBeCloseTo(-5.6);
    });
    it('throws on non-number', () => {
      expect(() => add('a', 2)).toThrow();
    });
    it('throws on Infinity', () => {
      expect(() => add(Infinity, 2)).toThrow();
    });
  });

  describe('subtract', () => {
    it('subtracts two numbers', () => {
      expect(subtract(5, 3)).toBe(2);
    });
    it('subtracts negative', () => {
      expect(subtract(-3, -7)).toBe(4);
    });
    it('subtracts floats', () => {
      expect(subtract(2.5, 1.2)).toBeCloseTo(1.3);
    });
    it('throws on NaN', () => {
      expect(() => subtract(NaN, 1)).toThrow();
    });
  });

  describe('multiply', () => {
    it('multiplies numbers', () => {
      expect(multiply(4, 3)).toBe(12);
    });
    it('multiplies by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });
    it('multiplies floats', () => {
      expect(multiply(1.2, 0.5)).toBeCloseTo(0.6);
    });
    it('throws on non-finite', () => {
      expect(() => multiply(1, Infinity)).toThrow();
    });
  });

  describe('divide', () => {
    it('divides numbers', () => {
      expect(divide(6, 3)).toBe(2);
    });
    it('divides floats', () => {
      expect(divide(5.5, 2.2)).toBeCloseTo(2.5);
    });
    it('throws on divide by zero', () => {
      expect(() => divide(1, 0)).toThrow('Divide by zero');
    });
    it('throws on non-number', () => {
      expect(() => divide('a', 1)).toThrow();
    });
    it('throws on Infinity', () => {
      expect(() => divide(Infinity, 1)).toThrow();
    });
  });
});
