import { Transaction } from '@solana/web3.js'

export function serializeTransaction(transaction: Transaction): boolean {
  console.log('serializeTransaction', transaction)
  return true
}
