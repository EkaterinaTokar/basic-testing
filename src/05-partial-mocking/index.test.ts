// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: jest.fn(() => 'mocked foo'),
    mockTwo: jest.fn(() => 'mocked bar'),
    mockThree: jest.fn(() => 'mocked baz'),
    unmockedFunction: jest.fn(() => console.log('I am not mocked')),
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    expect(mockOne).toHaveBeenCalled();

    mockTwo();
    expect(mockTwo).toHaveBeenCalled();

    mockThree();
    expect(mockThree).toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
    expect(unmockedFunction).toHaveBeenCalled();
  });
});
