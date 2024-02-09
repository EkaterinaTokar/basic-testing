// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

const initialBalance = 100;
describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const bankAccount = getBankAccount(initialBalance);
    expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(initialBalance).withdraw(150)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    expect(() =>
      getBankAccount(initialBalance).transfer(150, getBankAccount(300)),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const bankAccount = getBankAccount(initialBalance);
    expect(() => bankAccount.transfer(initialBalance, bankAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    expect(getBankAccount(initialBalance).deposit(20).getBalance()).toBe(120);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(initialBalance).withdraw(50).getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    const bankAccount = getBankAccount(initialBalance);
    const bankAccount2 = getBankAccount(300);
    bankAccount.transfer(50, bankAccount2);
    expect(bankAccount.getBalance()).toBe(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const bankAccount = getBankAccount(initialBalance);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(200);
    const balance = await bankAccount.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const bankAccount = getBankAccount(initialBalance);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(200);
    await bankAccount.synchronizeBalance();
    expect(bankAccount.getBalance()).toBe(200);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const bankAccount = getBankAccount(initialBalance);
    jest.spyOn(bankAccount, 'fetchBalance').mockResolvedValueOnce(null);
    await expect(bankAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
