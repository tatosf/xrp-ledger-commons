import { Client, Wallet } from "xrpl"
import { enableRippling, createToken, printMoney, createAMM, convertStringToHexPadded } from "./utils.js"

const client = new Client("wss://s.altnet.rippletest.net:51233")

const issuer = Wallet.fromSeed('sEdTcQinPgGDgePJkzphKasoXJRc7M7')
const reciever = Wallet.fromSeed('sEdSzXWW5xih151vJJkFebixyhkMHpr')


const main = async () => {
  console.log("lets get started...");
  await client.connect();

  // First, we need to create and issue the TAT token with the standard 3-character code
  await enableRippling({ wallet: issuer, client });
  await createToken({ issuer, receiver: reciever, client, tokenCode: convertStringToHexPadded('TAT') });

  console.log(reciever, issuer);
  
  // For AMM creation, we need to convert the currency code to hex
  // But use the official XRPL library function which handles the conversion correctly
  await createAMM({ issuer, receiver: reciever, client, tokenCode: convertStringToHexPadded('TAT')});

  console.log({
    'issuer': await client.getBalances(issuer.classicAddress),
    'reciever': await client.getBalances(reciever.classicAddress),
  })
   
  await client.disconnect();
  console.log("all done!");
};

main();

