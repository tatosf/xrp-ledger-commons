import { Client, Payment } from "xrpl"

const client = new Client("wss://s.altnet.rippletest.net:51233")


const main = async () => {
  console.log("lets get started...");
  await client.connect();

  console.log('lets fund 2 accounts...')
  const { wallet: wallet1, balance: balance1 } = await client.fundWallet()
  const { wallet: wallet2, balance: balance2 } = await client.fundWallet()

  console.log('wallet1', wallet1)
  console.log('wallet2', wallet2)

  console.log({ 
        balance1, 
        address1: wallet1.address, //wallet1.seed
        balance2, 
        address2: wallet2.address 
    })

  console.log('lets create a payment channel...')
  const transaction: Payment = {
    TransactionType: 'Payment',
    Account: wallet1.classicAddress,
    Destination: wallet2.classicAddress,
    Amount: '10',
  }

  console.log('submitting the payment transaction... ', transaction)

  const result = await client.submitAndWait(transaction, {
        autofill: true,
        wallet: wallet1,
    }); 

  console.log(result)

  await client.disconnect();
  console.log("all done!");
};

main();

