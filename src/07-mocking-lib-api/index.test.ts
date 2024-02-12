// Uncomment the code below and write your tests
//import axios from 'axios';
//import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  test('should create instance with provided base url', async () => {
    /*const createSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/todos');
    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });*/
  });

  test('should perform request to correct provided url', async () => {
    //
  });

  test('should return response data', async () => {
    //
  });
});
