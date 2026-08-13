# 🟢 ZeroScore

> **Prove Your Financial Power Without Revealing Data.**
> 
> *A Privacy-First platform using Midnight's ZK technology to verify credit, assets, and identity—unlocking secure, undercollateralized DeFi.*

![Midnight Network](https://img.shields.io/badge/Built_on-Midnight_Network-10b981?style=for-the-badge)
![Zero Knowledge](https://img.shields.io/badge/Tech-ZK--SNARKs-black?style=for-the-badge)
![React](https://img.shields.io/badge/Frontend-React_19-blue?style=for-the-badge)

## 📖 The Vision

In modern DeFi, obtaining undercollateralized loans or verifying accredited investor status requires users to dox their private financial data (bank balances, credit scores). **ZeroScore** changes this paradigm. 

Using **Midnight Network's Compact DSL**, ZeroScore allows users to generate Zero-Knowledge Proofs (ZKPs) locally on their device. You can prove you have >$10,000 in your account, without ever revealing the actual balance. 

**Privacy is the protocol, not a setting.**

---

## ✨ Features

- **Selective Disclosure:** Reveal a single boolean claim (e.g., "Balance > $10,000: True") while every underlying figure stays sealed in your local private state.
- **Interactive Proof Studio (Dashboard):** A stunning, Awwwards-tier UI to simulate the ZK proving process.
- **On-Chain ZK-Badge Minting:** After proof generation, users can sign a transaction to mint a Soulbound ZK-Badge representing their verified credential.
- **Cardano Sidechain Security:** Proofs settle on Midnight, inheriting Cardano's battle-tested consensus while keeping ledger state confidential.
- **Ultra-Premium UX:** Features cinematic grain, magnetic UI elements, 3D interactive parallax, and smooth Framer Motion spring physics.

---

## 🏗️ Architecture

1. **Private Input Vault:** Users input their sensitive data locally (never leaves the browser).
2. **Compact DSL Circuits:** Verification logic compiles into ZK-SNARK circuits with deterministic constraints.
3. **Execution Engine:** Generates the cryptographic proof locally.
4. **Ledger Settlement:** The proof is submitted to the Midnight Testnet for on-chain verification and badge minting.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Lace Wallet (Midnight Testnet configuration)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/efekrbas/zeroscore-midnight.git
   cd zeroscore-midnight
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:8080` in your browser.

---

## 💻 Tech Stack
- **Network:** Midnight Testnet
- **Smart Contracts:** Compact DSL
- **Frontend Framework:** React 19 + TypeScript + Vite
- **Styling:** TailwindCSS
- **Animations:** Motion (Framer Motion), React Three Fiber (3D)
- **UI Components:** shadcn/ui, Sonner

---

*Built with 💚 for the Midnight Network Hackathon.*
