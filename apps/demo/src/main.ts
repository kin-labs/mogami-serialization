import { TransactionType } from "@kin-tools/kin-transaction";
import { Solana } from "@mogami-serialize/solana";
import { Keypair } from "@mogami/keypair";
import { PublicKey } from "@solana/web3.js";

const solana = new Solana()

const { ALICE_KEY: aliceKey } = process.env

if(!aliceKey) throw 'Set Alice Key'


;(async function(){
  const tx = await solana.initTransaction(
    new PublicKey('BobQoPqWy5cpFioy1dMTYqNH9WpC39mkAEDJWXECoJ9y'),
    '10',
    Keypair.fromByteArray(JSON.parse(aliceKey)),
    TransactionType.None
  )

  const res = await solana.submitTransaction(
    tx,
    Keypair.fromByteArray(JSON.parse(aliceKey))
  )
  console.log(res)
}())
