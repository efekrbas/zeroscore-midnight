import { motion } from "motion/react";
import { EyeOff, Braces, Link2 } from "lucide-react";
import { SpotlightCard } from "./SpotlightCard";

const cards = [
  {
    icon: EyeOff,
    title: "Selective Disclosure",
    body: "Reveal a single boolean claim — 'above threshold' — while every underlying figure stays sealed inside your local private state.",
    tag: "shield_local",
  },
  {
    icon: Braces,
    title: "Compact DSL Circuits",
    body: "Verification logic is written in Midnight's Compact language and compiled into ZK-SNARK circuits with deterministic, auditable constraints.",
    tag: "circuit compact",
  },
  {
    icon: Link2,
    title: "Cardano Sidechain Security",
    body: "Proofs settle on Midnight, a Cardano partner chain, inheriting battle-tested consensus while keeping ledger state confidential.",
    tag: "ledger midnight",
  },
];

export function Architecture() {
  return (
    <section id="architecture" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24 min-h-[100dvh]">
      <div className="max-w-2xl">
        <span className="text-xs tracking-[0.2em] text-primary uppercase">Architecture</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Privacy is the protocol, not a setting
        </h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="h-full"
          >
            <SpotlightCard className="group h-full p-7 transition-colors hover:border-primary/40">
              <span className="relative z-10 grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-shadow group-hover:glow-ring">
                <c.icon className="size-5" />
              </span>
              <h3 className="relative z-10 mt-5 text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="relative z-10 mt-3 text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
              <p className="relative z-10 mt-6 font-mono text-[11px] text-primary/80">{c.tag}</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
