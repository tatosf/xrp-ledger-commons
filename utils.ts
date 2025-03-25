import xrpl from "xrpl";
import { AccountSet, AccountSetAsfFlags, TrustSet, convertStringToHex, TrustSetFlags } from "xrpl";
import { Payment } from "xrpl/src/models";

export function convertStringToHexPadded(str: string): string {
    // Convert string to hexadecimal
    let hex: string = "";
    for (let i = 0; i < str.length; i++) {
      const hexChar: string = str.charCodeAt(i).toString(16);
      hex += hexChar;
    }
  
    // Pad with zeros to ensure it's 40 characters long
    const paddedHex: string = hex.padEnd(40, "0");
    return paddedHex.toUpperCase(); // Typically, hex is handled in uppercase
  }


export async function enableRippling({ wallet, client }: any) {
    const accountSet: AccountSet = {
      TransactionType: "AccountSet",
      Account: wallet.address,
      SetFlag: AccountSetAsfFlags.asfDefaultRipple,
    };
  
    const prepared = await client.autofill(accountSet);
    const signed = wallet.sign(prepared);
    const result = await client.submitAndWait(signed.tx_blob);
  
    console.log(result);
    console.log("Enable rippling tx: ", result.result.hash);
  
    return;
  }




export const printMoney = async ({ destinationWallet, client }: any) => {
  const { wallet: wallet1, balance: balance1 } = await client.fundWallet();

  console.log("wallet1", wallet1);

  const tx: xrpl.Payment = {
    TransactionType: "Payment",
    Account: wallet1.classicAddress,
    Destination: destinationWallet.classicAddress,
    Amount: xrpl.xrpToDrops("90"),
  };

  console.log("submitting the payment transaction... ", tx);

  const result = await client.submitAndWait(tx, {
    autofill: true,
    wallet: wallet1,
  });

  console.log(result);

  console.log({
    "balance 2": await client.getBalances(destinationWallet.classicAddress),
  });
};

export default printMoney;



export async function createToken({ issuer, receiver, client, tokenCode }: any) {
  // Create the trust line to send the token
  const trustSet: TrustSet = {
    TransactionType: "TrustSet",
    Account: receiver.address,
    LimitAmount: {
      currency: tokenCode,
      issuer: issuer.address,
      value: "500000000", // 500M tokens
    },
    Flags: TrustSetFlags.tfClearNoRipple,
  };
  console.log(trustSet);

  // Receiver opening trust lines
  const preparedTrust = await client.autofill(trustSet);
  const signedTrust = receiver.sign(preparedTrust);
  const resultTrust = await client.submitAndWait(signedTrust.tx_blob);

  console.log(resultTrust);
  console.log("Trust line issuance tx result: ", resultTrust.result.hash);

  // Send the token to the receiver
  const sendPayment: Payment = {
    TransactionType: "Payment",
    Account: issuer.address,
    Destination: receiver.address,
    Amount: {
      currency: tokenCode,
      issuer: issuer.address,
      value: "200000000", // 200M tokens
    },
  };
  console.log(sendPayment);

  const preparedPayment = await client.autofill(sendPayment);
  const signedPayment = issuer.sign(preparedPayment);
  const resultPayment = await client.submitAndWait(signedPayment.tx_blob);

  console.log(resultPayment);
  console.log("Transfer issuance tx result: ", resultPayment.result.hash);


  return;
}

import { AMMCreate, AMMDeposit, AMMDepositFlags } from "xrpl";
import { OfferCreate, OfferCreateFlags } from "xrpl";

async function createAMM({ issuer, receiver, client, tokenCode }: any) {
  console.log("create AMM", { issuer, receiver, tokenCode });
  let createAmm: AMMCreate = {
    TransactionType: "AMMCreate",
    Account: receiver.address,
    TradingFee: 600,
    Amount: {
      currency: tokenCode,
      issuer: issuer.classicAddress,
      value: "2000000", // 2M tokens
    },
    Amount2: "50000000", // 50 XRP in drops
  };
  console.log(createAmm);

  const prepared = await client.autofill(createAmm);
  const signed = receiver.sign(prepared);
  const result = await client.submitAndWait(signed.tx_blob);

  console.log(result);
  console.log("Create amm tx: ", result.result.hash);

  return;
}

