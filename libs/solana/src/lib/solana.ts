import { TransactionType } from '@kin-tools/kin-memo'
import { Keypair } from '@mogami/keypair'
import { Connection, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js'
import { generateKinMemoInstruction, kinToQuarks } from '@kin-tools/kin-transaction'
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { serializeTransaction } from './helpers/serialize-transaction'
export class Solana {
  readonly connection: Connection

  constructor() {
    this.connection = new Connection('https://api.devnet.solana.com')
  }

  async initTransaction(
    destination: PublicKey,
    amount: string,
    owner: Keypair,
    type: TransactionType
  ) {
    const mint = new PublicKey('KinDesK3dYWo3R2wDk6Ucaf31tvQCCSYyL8Fuqp33GX')
    const feePayer = new PublicKey('oWNEYV3aMze3CppdgyFAiEj9xUJXkn85es1KscRHt8m')
    const { blockhash: latestBlockhash } = await this.connection.getLatestBlockhash()
    const quarks = kinToQuarks(amount)

    const tx = await this.addTransactionInstructions(mint, feePayer, destination, owner, quarks.toString(), latestBlockhash, type)

    const txSigned = await this.signTransaction(tx, owner)
    const txSerialized = await this.serializeTransaction(txSigned)
    return txSerialized
  }

  async addTransactionInstructions(
    mintKey: PublicKey,
    feePayerKey: PublicKey,
    destination: PublicKey,
    owner: Keypair,
    quarks: string,
    latestBlockhash: string,
    type: TransactionType
  ) {
    const appIndexMemoInstruction = generateKinMemoInstruction({
      appIndex: 1,
      type
    })

    // Get TokenAccount from Owner and Destination
    const [ownerTokenAccount, destinationTokenAccount] = await Promise.all([
      getAssociatedTokenAddress(mintKey, owner.solanaPublicKey),
      getAssociatedTokenAddress(mintKey, destination),
    ])

    // Create Transaction
    const instructions: TransactionInstruction[] = [
      appIndexMemoInstruction,
      createTransferInstruction(
        ownerTokenAccount,
        destinationTokenAccount,
        owner.solanaPublicKey,
        Number(quarks),
        [],
        TOKEN_PROGRAM_ID,
      ),
    ]

    return new Transaction({
      feePayer: feePayerKey,
      recentBlockhash: latestBlockhash,
      signatures: [{ publicKey: owner.solana.publicKey, signature: null }],
    }).add(...instructions)
  }

  async serializeTransaction(transaction: Transaction) {
    return serializeTransaction(transaction)
  }

  async signTransaction(transaction: Transaction, owner: Keypair) {
    transaction.partialSign(...[owner.solana])
    return transaction
  }

  async submitTransaction(buffer: Buffer, owner: Keypair) {
    return this.makeTransfer(buffer, owner)
  }

  async makeTransfer(buffer: Buffer, owner: Keypair) {
    const tx = Transaction.from(buffer)
    tx.partialSign(...[owner.solana])
    const signature = await this.connection.sendRawTransaction(serializeTransaction(tx))
    return signature
  }
}
