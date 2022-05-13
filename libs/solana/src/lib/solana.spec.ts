import { TransactionType } from '@kin-tools/kin-memo';
import { Keypair } from '@mogami/keypair';
import { PublicKey } from '@solana/web3.js';
import { Solana } from './solana';

describe('Solana', () => {
  it('should work', () => {
    const { ALICE_KEY: aliceKey } = process.env

    if(!aliceKey) throw 'Set Alice Key'

    console.log(Buffer.from('test') instanceof Uint8Array)
    const solana = new Solana()
    expect(solana).toBeDefined()
    solana.initTransaction(
      new PublicKey('BobQoPqWy5cpFioy1dMTYqNH9WpC39mkAEDJWXECoJ9y'),
      '10',
      Keypair.fromByteArray(JSON.parse(aliceKey)),
      TransactionType.None)
  });
});
