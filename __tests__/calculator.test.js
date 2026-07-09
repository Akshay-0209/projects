const calc = require('../src/calculator');

describe('Calculator', () => {
  describe('add()', () => {
    it('adds two positive numbers', () => {
      expect(calc.add(2, 3)).toBe(5);
    });
    it('adds negative and positive', () => {
      expect(calc.add(-2, 5)).toBe(3);
    });
    it('throws on NaN', () => {
      expect(() => calc.add(NaN, 3)).toThrow();
    });
  });

  describe('subtract()', () => {
    it('subtracts numbers', () => {
      expect(calc.subtract(7, 3)).toBe(4);
    });
    it('throws on infinite input', () => {
      expect(() => calc.subtract(Infinity, 1)).toThrow();
    });
  });

  describe('multiply()', () => {
    it('multiplies numbers', () => {
      expect(calc.multiply(4, 2)).toBe(8);
    });
    it('throws if input is not a number', () => {
      expect(() => calc.multiply('foo', 1)).toThrow();
    });
  });

  describe('divide()', () => {
    it('divides numbers', () => {
      expect(calc.divide(10, 2)).toBe(5);
    });
    it('throws on division by zero', () => {
      expect(() => calc.divide(1, 0)).toThrow('Cannot divide by zero');
    });
    it('throws on NaN', () => {
      expect(() => calc.divide(NaN, 2)).toThrow();
    });
  });
});
