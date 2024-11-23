---
sidebar_position: 2
---

# MinaTokens API

The **MinaTokens API** provides a simple and efficient way to interact with custom tokens on the Mina blockchain. This API allows developers to deploy tokens, mint tokens, transfer tokens, and retrieve token information with ease.

## Table of Contents

- [Introduction](#introduction)
- [REST API](#rest-api)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Initializing the API](#initializing-the-api)
  - [Deploying a Token](#deploying-a-token)
  - [Minting Tokens](#minting-tokens)
  - [Transferring Tokens](#transferring-tokens)
  - [Getting Token Information](#getting-token-information)
- [API Reference](#api-reference)
- [Project Description](#project-description)
- [Resources](#resources)

## Introduction

The MinaTokens API is part of the **MINA Custom Token Launchpad on zkCloudWorker** project. This launchpad aims to simplify the process of creating and managing custom tokens on the Mina blockchain, making it accessible to both technical and non-technical users.

## REST API

The MinaTokens API provides the following REST endpoints:

### Fungible Token Endpoints

- **Get Token Info** `POST /info`
  - Retrieves detailed information about a Mina Fungible Token
  - Requires API key in `x-api-key` header
  - Request body: `{ tokenAddress: string }`

### NFT Endpoints

- **Get NFT Info** `POST /nft`
  - Retrieves detailed information about a MinaNFT
  - Requires API key in `x-api-key` header
  - Request body: `{ contractAddress: string, nftAddress: string }`

### Transaction Endpoints

- **Build Deploy Token Transaction** `POST /deploy`

  - Builds a deploy token transaction for a new token
  - Requires API key in `x-api-key` header
  - Request body: `{ adminAddress: string, symbol: string, decimals: number, uri: string }`

- **Build Token Transaction** `POST /transaction`

  - Builds a token transaction (transfer or mint)
  - Requires API key in `x-api-key` header
  - Request body includes transaction type, sender, token details, and amount

- **Prove Token Transaction** `POST /prove`

  - Proves a token transaction and optionally sends it to the network
  - Requires API key in `x-api-key` header
  - Request body includes signed transaction data

- **Get Proving Job Result** `POST /result`

  - Retrieves the result of a proving job
  - Requires API key in `x-api-key` header
  - Request body: `{ jobId: string }`

- **Request Funds from Faucet** `POST /faucet`

  - Requests funds from the faucet for testing purposes
  - Requires API key in `x-api-key` header
  - Request body: `{ address: string }`

- **Get Transaction Status** `POST /tx-status`
  - Retrieves the status of a transaction by hash
  - Requires API key in `x-api-key` header
  - Request body: `{ hash: string }`

The API is available at:

- Devnet: `https://minatokens.com/api/v1/`
- Zeko: `https://zekotokens.com/api/v1/`

### API Reference

For detailed API documentation, refer to the [MinaTokens API Documentation](https://docs.zkcloudworker.com/minatokens-api) or try it at https://zkcloudworker.readme.io

### API Key

To get an API key, contact support@zkcloudworker.com.

## Installation

To use the MinaTokens API example, install it:

```sh
git clone https://github.com/zkcloudworker/tokens-api-example
yarn
```

## Getting Started

### Initializing the API

First, import the `MinaTokensAPI` class and initialize it with your API key and desired chain environment.

```typescript
import { MinaTokensAPI } from "./api";

const api = new MinaTokensAPI({
  apiKey: "YOUR_API_KEY",
  chain: "devnet", // Options: "mainnet", "devnet", "zeko", "local"
});
```

### Deploying a Token

Deploying a new token involves building a deploy transaction, signing it, and then proving and sending the transaction.

```typescript
// Build the deploy token transaction
const deployTx = await api.buildDeployTokenTransaction({
  adminAddress: admin.publicKey,
  symbol: "TEST",
  decimals: 9,
  uri: "https://minatokens.com",
});

// Sign the transaction
const signBody = {
  zkappCommand: JSON.parse(deployTx.payload.transaction),
  feePayer: {
    feePayer: admin.publicKey,
    fee: deployTx.payload.feePayer.fee,
    nonce: deployTx.payload.nonce,
    memo: deployTx.payload.feePayer.memo,
  },
};

const signedResult = client.signTransaction(signBody, admin.privateKey);
const signedData = JSON.stringify(signedResult.data);

// Prove and send the transaction
const proveTx = await api.proveTokenTransaction({
  txType: "deploy",
  serializedTransaction: deployTx.serializedTransaction,
  signedData,
  senderAddress: admin.publicKey,
  tokenAddress: deployTx.tokenAddress,
  adminContractAddress: deployTx.adminContractAddress,
  symbol: "TEST",
  uri: "https://minatokens.com",
  sendTransaction: true,
});

// Wait for the transaction to be included in a block
const hash = await api.waitForJobResult(proveTx.jobId);
await api.waitForTransaction(hash);

// Get token info
const tokenInfo = await api.getTokenInfo(deployTx.tokenAddress);
console.log("Token deployed:", tokenInfo);
```

### Minting Tokens

Once your token is deployed, you can mint new tokens to a specified address.

```typescript
// Build the mint transaction
const mintTx = await api.tokenTransaction({
  txType: "mint",
  symbol: "TEST",
  senderAddress: admin.publicKey,
  tokenAddress: deployTx.tokenAddress,
  adminContractAddress: deployTx.adminContractAddress,
  to: recipient.publicKey,
  amount: 100_000_000_000, // Amount in smallest units
});

// Sign the transaction
const signBody = {
  zkappCommand: JSON.parse(mintTx.payload.transaction),
  feePayer: {
    feePayer: admin.publicKey,
    fee: mintTx.payload.feePayer.fee,
    nonce: mintTx.payload.nonce,
    memo: mintTx.payload.feePayer.memo,
  },
};

const signedResult = client.signTransaction(signBody, admin.privateKey);
const signedData = JSON.stringify(signedResult.data);

// Prove and send the transaction
const proveTx = await api.proveTokenTransaction({
  txType: "mint",
  serializedTransaction: mintTx.serializedTransaction,
  signedData,
  senderAddress: admin.publicKey,
  tokenAddress: deployTx.tokenAddress,
  adminContractAddress: deployTx.adminContractAddress,
  symbol: "TEST",
  to: recipient.publicKey,
  amount: 100_000_000_000,
  sendTransaction: true,
});

// Wait for the transaction to be included in a block
const hash = await api.waitForJobResult(proveTx.jobId);
await api.waitForTransaction(hash);

// Get updated token info
const tokenInfo = await api.getTokenInfo(deployTx.tokenAddress);
console.log("Tokens minted:", tokenInfo);
```

### Transferring Tokens

Transfer tokens from one address to another.

```typescript
// Build the transfer transaction
const transferTx = await api.tokenTransaction({
  txType: "transfer",
  symbol: "TEST",
  senderAddress: sender.publicKey,
  tokenAddress: deployTx.tokenAddress,
  adminContractAddress: deployTx.adminContractAddress,
  to: recipient.publicKey,
  amount: 50_000_000_000,
});

// Sign the transaction
const signBody = {
  zkappCommand: JSON.parse(transferTx.payload.transaction),
  feePayer: {
    feePayer: sender.publicKey,
    fee: transferTx.payload.feePayer.fee,
    nonce: transferTx.payload.nonce,
    memo: transferTx.payload.feePayer.memo,
  },
};

const signedResult = client.signTransaction(signBody, sender.privateKey);
const signedData = JSON.stringify(signedResult.data);

// Prove and send the transaction
const proveTx = await api.proveTokenTransaction({
  txType: "transfer",
  serializedTransaction: transferTx.serializedTransaction,
  signedData,
  senderAddress: sender.publicKey,
  tokenAddress: deployTx.tokenAddress,
  adminContractAddress: deployTx.adminContractAddress,
  symbol: "TEST",
  to: recipient.publicKey,
  amount: 50_000_000_000,
  sendTransaction: true,
});

// Wait for the transaction to be included in a block
const hash = await api.waitForJobResult(proveTx.jobId);
await api.waitForTransaction(hash);

// Get updated token info
const tokenInfo = await api.getTokenInfo(deployTx.tokenAddress);
console.log("Tokens transferred:", tokenInfo);
```

### Getting Token Information

Retrieve information about your deployed token.

```typescript
const tokenInfo = await api.getTokenInfo(deployTx.tokenAddress);
console.log("Token Information:", tokenInfo);
```

### MinaTokensAPI Class

```typescript:src/api.ts
export class MinaTokensAPI {
  readonly chain: "mainnet" | "devnet" | "zeko" | "local";
  readonly apiKey: string;

  constructor(params: {
    apiKey: string;
    chain?: "mainnet" | "devnet" | "zeko" | "local";
  }) {
    const { chain, apiKey } = params;
    this.chain = chain ?? "devnet";
    this.apiKey = apiKey;
  }

  // ... Other methods
}
```

### Methods

- `buildDeployTokenTransaction`
- `proveTokenTransaction`
- `tokenTransaction`
- `getTokenInfo`
- `waitForJobResult`
- `waitForTransaction`
- `txStatus`
- `faucet`
- `getNFTInfo`
- `proveJobResult`

## Project Description

The **MINA Custom Token Launchpad on zkCloudWorker** is designed to simplify the process of creating and managing custom tokens on the Mina blockchain. It provides:

- **No-Code Token Launchpad**: Enables non-technical users to deploy and manage custom tokens without writing code.
- **Developer API**: Offers a comprehensive API for developers to integrate custom token functionalities into their applications.
- **Token Management Tools**: Includes features for minting, transferring, and airdropping tokens.

## Resources

- **API Documentation**: [https://docs.zkcloudworker.com/minatokens-api](https://docs.zkcloudworker.com/minatokens-api)
- **GitHub Repository**: [zkCloudWorker/tokens-api-example](https://github.com/zkcloudworker/tokens-api-example)
- **Mina Tokens Launchpad**: [https://minatokens.com](https://minatokens.com)
- **zkCloudWorker**: [https://zkcloudworker.com](https://zkcloudworker.com)

MinaTokens API utilizes the Mina blockchain's custom token standard [FungibleToken](https://github.com/MinaFoundation/mina-fungible-token) and leverages zkCloudWorker for cloud-based proving and transaction management.
