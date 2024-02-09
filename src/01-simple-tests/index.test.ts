// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 4, b: 3, action: Action.Add });
    expect(result).toBe(7);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 4, b: 3, action: Action.Subtract });
    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 4, b: 3, action: Action.Multiply });
    expect(result).toBe(12);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 9, b: 3, action: Action.Divide });
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 4,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(64);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: '4', b: 3, action: 'invalidAction' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 'h', b: 3, action: Action.Add });
    expect(result).toBeNull();
  });
});
