// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 6, b: 3, action: Action.Subtract, expected: 3 },
  { a: 4, b: 3, action: Action.Multiply, expected: 12 },
  { a: 9, b: 3, action: Action.Divide, expected: 3 },
  { a: 2, b: 2, action: Action.Exponentiate, expected: 4 },
  { a: 4, b: 3, action: 'invalidAction', expected: null },
  { a: 'h', b: 3, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  it.each(testCases)(
    'should %action, %a and %b to equal %expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
