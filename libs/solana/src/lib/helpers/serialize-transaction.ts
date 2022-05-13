import { Transaction } from '@solana/web3.js'

export function serializeTransaction(transaction: Transaction): Buffer {
  return transaction.serialize({ requireAllSignatures: false, verifySignatures: false })
}
