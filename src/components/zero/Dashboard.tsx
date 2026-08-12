import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Lock,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  Loader2,
  KeyRound,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { midnightService } from "@/services/midnight";

const conditions = [
  { id: "balance", label: "Is Balance > $10,000?", field: "balance", threshold: 10000 },
  { id: "credit", label: "Is Credit Score > 700?", field: "credit", threshold: 700 },
  { id: "income", label: "Is Monthly Income > $5,000?", field: "income", threshold: 5000 },
] as const;

const steps = [
  { icon: KeyRound, label: "Reading Private State" },
  { icon: Cpu, label: "Constructing Compact Circuit" },
  { icon: ShieldCheck, label: "Generating ZK-SNARK Proof" },
  { icon: Sparkles, label: "Emitting Public Verifiable Credential" },
];

type Result = { hash: string; timestamp: string; claim: string; passed: boolean };

// Emil Kowalski easing
const customEase = [0.23, 1, 0.32, 1];

export function Dashboard() {
  const [values, setValues] = useState({ balance: "", credit: "", income: "" });
  const [condition, setCondition] = useState<(typeof conditions)[number]["id"]>("balance");
  const [stepIndex, setStepIndex] = useState(-1);
  const [result, setResult] = useState<Result | null>(null);

  const running = stepIndex >= 0;

  const generate = async () => {
    const cond = conditions.find((c) => c.id === condition)!;
    const raw = Number(values[cond.field]);
    if (!values[cond.field] || Number.isNaN(raw)) {
      toast.error("Enter the private value required by this condition");
      return;
    }
    setResult(null);
    setStepIndex(0);

    try {
      await midnightService.connectLaceWallet();
      setStepIndex(1);

      await new Promise((r) => setTimeout(r, 800));
      setStepIndex(2);

      const { hash, passed } = await midnightService.generateZKProof(raw, cond.threshold);
      setStepIndex(3);

      await midnightService.verifyProofOnChain(hash);

      setStepIndex(-1);
      setResult({
        hash: hash,
        timestamp: new Date().toUTCString(),
        claim: cond.label.replace("Is ", "").replace("?", ""),
        passed: passed,
      });
      toast.success("Zero-Knowledge Proof verified and submitted!");
    } catch (e: any) {
      setStepIndex(-1);
      toast.error(e.message || "Failed to generate ZK Proof");
    }
  };

  return (
    <section id="dashboard" className="relative mx-auto max-w-7xl px-5 min-h-[100dvh] flex flex-col justify-center pt-24 pb-12">
      <div className="max-w-3xl mb-16">
        <span className="text-xs tracking-[0.2em] text-primary uppercase font-medium">Verification Core</span>
        <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Interactive Proof Studio
        </h2>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          Your figures never leave this device. Only the boolean outcome and its zero-knowledge proof are published
          to the Midnight ledger. True privacy, zero compromise.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 lg:grid-rows-2">
        {/* Left Column: Private Inputs (Asymmetrical Bento: Span 7) */}
        <div className="lg:col-span-7 lg:row-span-2 double-bezel-outer">
          <div className="double-bezel-inner p-8 sm:p-10 h-full flex flex-col justify-between">
            <div>
              <StepHeader n={1} title="Private Input Vault" />
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <Lock className="size-3.5" strokeWidth={2} /> Stored Locally in Private State
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <Field
                  id="balance"
                  label="Total Wallet Balance (USD)"
                  value={values.balance}
                  onChange={(v) => setValues((s) => ({ ...s, balance: v }))}
                  placeholder="24500"
                />
                <Field
                  id="credit"
                  label="Credit Score"
                  value={values.credit}
                  onChange={(v) => setValues((s) => ({ ...s, credit: v }))}
                  placeholder="742"
                />
                <Field
                  id="income"
                  label="Monthly Income (USD)"
                  value={values.income}
                  onChange={(v) => setValues((s) => ({ ...s, income: v }))}
                  placeholder="6200"
                  className="sm:col-span-2"
                />
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5">
              <StepHeader n={2} title="Verification Policy" />
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {conditions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCondition(c.id)}
                    className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 active:scale-[0.97] ${
                      condition === c.id
                        ? "border-primary/40 bg-primary/10 shadow-[0_0_20px_-5px_rgba(var(--primary),0.3)]"
                        : "border-white/5 bg-black/20 hover:bg-black/40 hover:border-white/10"
                    }`}
                  >
                    <span className={`text-sm font-medium ${condition === c.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                      {c.label}
                    </span>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs font-mono text-muted-foreground/60">{c.field}</span>
                      <span
                        className={`size-2.5 rounded-full shadow-sm transition-colors duration-300 ${condition === c.id ? "bg-primary shadow-primary/50" : "bg-white/10"}`}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Execution Engine (Span 5) */}
        <div className="lg:col-span-5 lg:row-span-2 double-bezel-outer relative">
          <div className="double-bezel-inner p-8 sm:p-10 h-full flex flex-col">
            <StepHeader n={3} title="Execution Engine" />
            
            <button
              className="group relative mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-foreground font-semibold text-background shadow-lg transition-all duration-300 hover:bg-foreground/90 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
              onClick={generate}
              disabled={running}
            >
              {running ? <Loader2 className="size-5 animate-spin" /> : <ShieldCheck className="size-5" />}
              <span>{running ? "Proving..." : "Generate ZK-Proof"}</span>
            </button>

            <div className="mt-8 flex-1 relative min-h-[300px]">
              <AnimatePresence mode="wait">
                {running && (
                  <motion.div
                    key="proving"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    transition={{ duration: 0.4, ease: customEase }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest text-primary">circuit://compact/zeroscore.v1</p>
                    <ul className="mt-6 flex-1 space-y-6">
                      {steps.map((s, i) => {
                        const done = i < stepIndex;
                        const active = i === stepIndex;
                        return (
                          <motion.li
                            key={s.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease: customEase }}
                            className="flex items-center gap-4 text-sm"
                          >
                            <span
                              className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                                done || active
                                  ? "border-primary/40 bg-primary/10 text-primary shadow-[0_0_15px_-3px_rgba(var(--primary),0.3)]"
                                  : "border-white/10 bg-black/20 text-muted-foreground"
                              }`}
                            >
                              {done ? (
                                <CheckCircle2 className="size-4" strokeWidth={2} />
                              ) : active ? (
                                <Loader2 className="size-4 animate-spin" strokeWidth={2} />
                              ) : (
                                <s.icon className="size-4" strokeWidth={1.5} />
                              )}
                            </span>
                            <span className={`font-medium transition-colors duration-500 ${done || active ? "text-foreground" : "text-muted-foreground"}`}>
                              {s.label}
                            </span>
                          </motion.li>
                        );
                      })}
                    </ul>
                    <div className="mt-auto h-1.5 w-full overflow-hidden rounded-full bg-black/40 border border-white/5">
                      <motion.div
                        className="h-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.8)]"
                        animate={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.8, ease: customEase }}
                      />
                    </div>
                  </motion.div>
                )}

                {!running && result && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: customEase }}
                    className="absolute inset-0 flex flex-col"
                  >
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] w-max">
                      <CheckCircle2 className="size-3.5" />
                      {result.passed ? "Condition Satisfied" : "Condition Not Met"}
                    </div>
                    
                    <h4 className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">Verified Claim</h4>
                    <p className="mt-2 text-xl font-semibold">{result.claim}</p>

                    <dl className="mt-8 flex-1 space-y-4 text-sm">
                      <Row label="Proof Hash">
                        <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                          {result.hash.slice(0, 10)}…{result.hash.slice(-8)}
                        </span>
                      </Row>
                      <Row label="Timestamp">
                        <span className="font-mono text-xs text-muted-foreground">{result.timestamp}</span>
                      </Row>
                      <Row label="Network">
                        <span className="font-mono text-xs text-muted-foreground">midnight-testnet-02</span>
                      </Row>
                    </dl>

                    <div className="mt-auto flex flex-col gap-3">
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(`https://zeroscore.vercel.app/verify/${result.hash}`);
                          toast.success("Verification link copied");
                        }}
                        className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 font-medium text-foreground transition-all duration-300 hover:bg-white/10 active:scale-[0.97]"
                      >
                        <Copy className="size-4 text-muted-foreground group-hover:text-foreground transition-colors" /> Copy Link
                      </button>
                      <a
                        href={`https://explorer.midnight.network/tx/${result.hash}`}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary/10 border border-primary/20 font-medium text-primary transition-all duration-300 hover:bg-primary/20 active:scale-[0.97]"
                      >
                        <ExternalLink className="size-4" /> View on Explorer
                      </a>
                    </div>
                  </motion.div>
                )}

                {!running && !result && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
                  >
                    <div className="grid size-16 place-items-center rounded-full border border-white/5 bg-white/5 shadow-inner">
                      <ShieldCheck className="size-6 text-muted-foreground/50" strokeWidth={1.5} />
                    </div>
                    <p className="mt-6 text-sm font-medium text-muted-foreground/80 leading-relaxed">
                      Engine ready.<br/>Provide private inputs to generate a cryptographic proof.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-3">
      <dt className="text-muted-foreground text-sm">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function StepHeader({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="grid size-8 place-items-center rounded-full border border-primary/30 bg-primary/10 font-mono text-xs font-medium text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
        {n}
      </span>
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </Label>
      <Input
        id={id}
        inputMode="numeric"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 h-12 rounded-xl bg-black/40 border-white/10 font-mono text-lg shadow-inner focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all placeholder:text-muted-foreground/30"
      />
    </div>
  );
}
