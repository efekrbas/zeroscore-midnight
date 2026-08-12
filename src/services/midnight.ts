// Simulated delay for realistic mock
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface MidnightProvider {
  connectLaceWallet: () => Promise<boolean>;
  generateZKProof: (
    privateValue: number,
    threshold: number,
  ) => Promise<{ hash: string; passed: boolean }>;
  verifyProofOnChain: (proofHash: string) => Promise<boolean>;
}

class MidnightService implements MidnightProvider {
  private isConnected = false;
  private networkId = "midnight-testnet-02";

  /**
   * Request connection to the Midnight Lace Wallet
   */
  async connectLaceWallet(): Promise<boolean> {
    console.log("Requesting connection to Midnight Lace Wallet...");

    try {
      // Real implementation would check window.midnight?.lace
      // @ts-expect-error window object missing midnight in TS by default
      if (typeof window !== "undefined" && window.midnight?.lace) {
        // @ts-expect-error window object missing midnight in TS by default
        await window.midnight.lace.enable();
        this.isConnected = true;
        return true;
      }
    } catch (e) {
      console.warn("Real Lace wallet not found or rejected, falling back to mock.");
    }

    // Fallback Mock
    await delay(800); // simulate connection delay
    this.isConnected = true;
    console.log("Mock Lace Wallet Connected.");
    return true;
  }

  /**
   * Calls the Compact circuit, computes the proof on the client side,
   * and submits the transaction.
   */
  async generateZKProof(
    privateValue: number,
    threshold: number,
  ): Promise<{ hash: string; passed: boolean }> {
    console.log(`Generating ZK Proof... (threshold: ${threshold})`);

    // In a real environment, we would use the compiled contract and @midnight-ntwrk/midnight-js
    // const circuit = await import("../../contracts/zero_score.compact");
    // const tx = await midnightProvider.buildTx(circuit.verify_threshold(threshold, privateValue, secret));
    // await tx.submit();

    // 1. Simulate complex proof generation (client-side)
    await delay(1200);

    const passed = privateValue >= threshold;

    if (!passed) {
      // In Midnight, if the circuit assert fails, the proof generation throws on the client
      throw new Error(
        "Proof generation failed: Condition not met (Private value is below threshold).",
      );
    }

    // 2. Simulate transaction submission to the network
    await delay(1200);

    // Generate a mock unique commitment hash as it would be emitted by the contract
    const hash = this.generateMockHash();

    console.log(`Proof verified and tx submitted. Commitment hash: ${hash}`);
    return { hash, passed };
  }

  /**
   * Query public state on the ledger to verify the proof hash
   */
  async verifyProofOnChain(proofHash: string): Promise<boolean> {
    console.log(`Querying public state on ${this.networkId} for hash: ${proofHash}`);

    // In a real environment, we'd query the Midnight Indexer or the contract's public state (verificationLogs)
    await delay(800);

    // Mock result: we assume if it has a hash, it's valid for this demo
    return proofHash.startsWith("0x");
  }

  private generateMockHash(): string {
    const hex = "0123456789abcdef";
    let s = "0x";
    for (let i = 0; i < 40; i++) s += hex[Math.floor(Math.random() * 16)];
    return s;
  }
}

export const midnightService = new MidnightService();
