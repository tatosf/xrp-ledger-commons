# XRPL Testnet Development Project

This project demonstrates interaction with the XRP Ledger (XRPL) testnet, including token creation, AMM (Automated Market Maker) setup, and basic transactions.

## Prerequisites

- Node.js (>= 18.0.0)
- npm or yarn
- Basic understanding of XRPL concepts

## Dependencies

Main dependencies:

- `xrpl`: ^4.2.0 - Official XRPL JavaScript/TypeScript library

Development dependencies:

- `typescript`: ^5.8.2
- `ts-node`: ^10.9.2

## Setup

1. Clone the repository:

```bash
git clone <your-repo-url>
cd xrpl
```

2. Install dependencies:

```bash
npm install
```

## Project Structure

- `sessions/` - Contains different test sessions demonstrating various XRPL functionalities
  - `session1.ts` - Basic XRPL wallet creation and payment demonstration
  - `session2.ts` - Token creation and AMM setup
- `utils.ts` - Utility functions for XRPL operations

## Available Scripts

Run the sessions using ts-node:

```bash
# Run session 1 (basic payments)
npx ts-node sessions/session1.ts

# Run session 2 (token creation and AMM)
npx ts-node sessions/session2.ts
```

## Features

1. **Wallet Operations**

   - Create and fund testnet wallets
   - Check wallet balances
   - Make XRP payments between wallets

2. **Token Operations**

   - Create custom tokens
   - Enable rippling for token issuance
   - Set up trust lines between wallets
   - Transfer tokens between wallets

3. **AMM Operations**
   - Create Automated Market Maker pools
   - Set trading fees
   - Manage token/XRP liquidity pairs

## Configuration

The project connects to the XRPL testnet by default:

```typescript
const client = new Client("wss://s.altnet.rippletest.net:51233");
```

## Important Notes

1. This project uses the XRPL testnet. Never use real seeds or private keys from the mainnet.
2. Token codes are converted to hex format when required by the XRPL protocol.
3. Make sure to properly handle wallet seeds and never commit them to version control.

## Contributing

Feel free to submit issues and enhancement requests!
