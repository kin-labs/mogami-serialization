import { Transaction } from '@solana/web3.js'
import { serializeTransaction } from './serialize-transaction'

describe.skip('serializeTransaction', () => {
  it('should work', () => {
    const transaction = new Transaction()
    const result = serializeTransaction(transaction)
    expect(result).toBeTruthy()
  });
});
