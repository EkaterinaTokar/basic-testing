// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const linkedList = [1, '2', 3];
    const expectedLinkedList = {
      value: 1,
      next: {
        value: '2',
        next: {
          value: 3,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    expect(generateLinkedList(linkedList)).toStrictEqual(expectedLinkedList);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = [1, '2', 3];
    const generatedList = generateLinkedList(linkedList);
    expect(generatedList).toMatchSnapshot();
  });
});
