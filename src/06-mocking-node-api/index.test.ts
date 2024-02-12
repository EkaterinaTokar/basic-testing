// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';
import * as fsPromises from 'fs/promises';
import fs from 'fs';
jest.mock('fs/promises');
jest.mock('fs/promises');

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('test.txt');
    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), 'test.txt');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const result = await readFileAsynchronously('nonExistentFile.txt');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const existsSpy = jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const readSpy = jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue(Buffer.from('test'));
    const joinSpy = jest.spyOn(path, 'join').mockReturnValue('test.txt');

    const result = await readFileAsynchronously('test.txt');

    expect(result).toEqual('test');

    expect(joinSpy).toHaveBeenCalledWith(expect.any(String), 'test.txt');
    expect(existsSpy).toHaveBeenCalledWith('test.txt');
    expect(readSpy).toHaveBeenCalledWith('test.txt');
  });
});
