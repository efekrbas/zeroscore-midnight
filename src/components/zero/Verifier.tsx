import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QrCode, ScanLine, ShieldCheck, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type State = "idle" | "checking" | "valid" | "invalid";

export function Verifier() {
  const [hash, setHash] = useState("");
  const [state, setState] = useState<State>("idle");

  const verify = () => {
    if (!hash.trim()) return;
    setState("checking");
    setTimeout(() => setState(hash.trim().startsWith("0x") ? "valid" : "invalid"), 1400);
  };

  return (
    <section id="verifiers" className="relative scroll-mt-20 border-y border-border/60 bg-surface/30">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <span className="text-xs tracking-[0.2em] text-accent uppercase">For lenders &amp; DeFi</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Live Verifier Portal
            </h2>
            <p className="mt-4 text-muted-foreground">
              Paste a proof hash or scan the holder's QR credential. You get a cryptographic
              yes-or-no — never the underlying balance, score, or income.
            </p>
            <div className="mt-8 flex items-center gap-4 rounded-2xl glass p-5">
              <div className="grid size-24 shrink-0 place-items-center rounded-xl border border-border bg-background/60">
                <QrCode className="size-12 text-accent" />
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Scan credential QR</p>
                <p className="mt-1">
                  Point the holder's ZeroScore wallet QR at your camera to auto-fill the proof hash.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl glass p-6 sm:p-8">
            <label className="text-xs text-muted-foreground" htmlFor="proof">
              Proof Hash
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <Input
                id="proof"
                value={hash}
                onChange={(e) => {
                  setHash(e.target.value);
                  setState("idle");
                }}
                placeholder="0x7f3c9a…3a"
                className="bg-secondary/40 font-mono"
              />
              <Button onClick={verify} disabled={state === "checking"}>
                {state === "checking" ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <ScanLine className="size-4" />
                )}
                Verify
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {state !== "idle" && (
                <motion.div
                  key={state}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 rounded-xl border border-border bg-background/50 p-5"
                >
                  {state === "checking" && (
                    <p className="font-mono text-sm text-muted-foreground">
                      Querying midnight-testnet-02 ledger…
                    </p>
                  )}
                  {state === "valid" && (
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/12 px-3 py-1.5 text-xs text-primary">
                        <ShieldCheck className="size-3.5" /> Valid credential
                      </div>
                      <dl className="mt-4 space-y-2 text-sm">
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted-foreground">Disclosed claim</dt>
                          <dd>Balance &gt; $10,000 — true</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted-foreground">Raw data revealed</dt>
                          <dd className="text-primary">none</dd>
                        </div>
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted-foreground">Issuer circuit</dt>
                          <dd className="font-mono text-xs">zeroscore.compact@1.0.2</dd>
                        </div>
                      </dl>
                    </div>
                  )}
                  {state === "invalid" && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-destructive/40 bg-destructive/12 px-3 py-1.5 text-xs text-destructive">
                      <XCircle className="size-3.5" /> Unknown or malformed proof hash
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
