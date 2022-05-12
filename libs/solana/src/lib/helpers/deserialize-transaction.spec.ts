import { deserializeTransaction } from './deserialize-transaction'

describe('deserializeTransaction', () => {
  it('should work', () => {
    const result = deserializeTransaction(true)
    expect(result).toBeTruthy()
  });
});
