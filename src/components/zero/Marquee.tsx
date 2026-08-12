import { motion } from "framer-motion";

export function Marquee() {
  const items = [
    "Powered by Midnight Network",
    "Zero-Knowledge Proofs",
    "Cardano Sidechain Security",
    "Compact DSL Circuits",
    "Selective Disclosure",
    "True On-Chain Privacy",
  ];

  // We duplicate the items enough times to ensure the screen is always filled
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative flex w-full overflow-hidden bg-background border-y border-white/5 py-5">
      {/* Fade Gradients for a seamless entry/exit */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-background to-transparent md:w-48" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-background to-transparent md:w-48" />

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        className="flex flex-shrink-0 w-max items-center gap-12"
      >
        {duplicatedItems.map((item, i) => (
          <div key={i} className="flex items-center gap-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/50">
              {item}
            </span>
            {/* Divider Dot */}
            <span className="h-1.5 w-1.5 rounded-full bg-primary/20" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
