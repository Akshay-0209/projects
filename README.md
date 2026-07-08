# Calculator

A Node.js/TypeScript calculator project for Akshay-0209.

## Description

This repository is a starter template for a calculator application using Node.js and TypeScript.

## Getting Started

1. Clone the repository
2. Install dependencies: npm install
3. Run the app or tests as you develop

## Calculator Module

This project exposes a simple calculator module with the following operations:

- `add(a: number, b: number): number`
- `subtract(a: number, b: number): number`
- `multiply(a: number, b: number): number`
- `divide(a: number, b: number): number` (throws if dividing by zero)

### Usage Example

```typescript
import { add, subtract, multiply, divide } from './src/calculator';

console.log(add(2, 3));        // 5
console.log(subtract(5, 2));   // 3
console.log(multiply(4, 6));   // 24
console.log(divide(10, 2));    // 5

try {
  divide(5, 0);
} catch (e) {
  console.error(e.message);     // Cannot divide by zero
}
```

## License

MIT
