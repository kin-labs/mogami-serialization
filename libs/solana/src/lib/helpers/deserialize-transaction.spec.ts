import { deserializeTransaction } from './deserialize-transaction'

describe.skip('deserializeTransaction', () => {
  it('should work', () => {
    const result = deserializeTransaction(Buffer.from(''))
    expect(result).toBeTruthy()
  });
});
