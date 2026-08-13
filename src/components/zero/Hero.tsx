import { motion } from "motion/react";
import { ArrowRight, BookOpen, Lock, EyeOff, Network } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Scene3D } from "./Scene3D";
import { MidnightLogo } from "./MidnightLogo";
import { Magnetic } from "./Magnetic";

const chips = [
  { icon: Lock, label: "Private state stays local" },
  { icon: EyeOff, label: "Selective disclosure" },
  { icon: Network, label: "Midnight · Cardano sidechain" },
];

// Emil Kowalski easing
const customEase = [0.23, 1, 0.32, 1] as any;

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100dvh] overflow-hidden hero-bg flex flex-col justify-center pt-32 pb-12"
    >
      <Scene3D />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 text-center">
        {/* Eyebrow Tag */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.05, ease: customEase }}
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary tracking-[0.2em] uppercase"
        >
          <MidnightLogo className="size-3.5" />
          <span>Built on Midnight Network</span>
        </motion.div>

        {/* Massive Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.1, ease: customEase }}
          className="mt-8 text-5xl font-bold leading-[1.05] tracking-tight text-balance sm:text-7xl lg:text-[5.5rem]"
        >
          Prove Your Financial Power{" "}
          <span className="text-gradient block mt-2 pb-4">Without Revealing Data.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: customEase }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg font-medium"
        >
          A Privacy-First platform using Midnight's ZK technology. Verify credit, assets, and identity without exposing sensitive data—unlocking secure, undercollateralized DeFi.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.3, ease: customEase }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Magnetic magneticPull={0.2}>
            {/* Button-in-Button Architecture */}
            <a
              href="#dashboard"
              className="group relative flex h-14 items-center gap-4 rounded-full bg-primary pl-8 pr-2 font-semibold text-primary-foreground shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] transition-all duration-300 hover:bg-primary/90 active:scale-[0.97]"
            >
              <span className="text-base tracking-wide">Start Verification</span>
              <div className="grid size-10 place-items-center rounded-full bg-black/15 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105 group-hover:translate-x-1 group-active:scale-95">
                <ArrowRight className="size-4" strokeWidth={2.5} />
              </div>
            </a>
          </Magnetic>

          {/* Secondary Outline Button */}
          <a
            href="https://docs.midnight.network"
            target="_blank"
            rel="noreferrer"
            className="group flex h-14 items-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 font-medium text-foreground backdrop-blur-xl transition-all duration-300 hover:bg-white/10 active:scale-[0.97]"
          >
            <BookOpen className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
            <span>Read ZK Whitepaper</span>
          </a>
        </motion.div>

        {/* Feature Chips */}
        <div className="mt-20 flex flex-wrap justify-center gap-3">
          {chips.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: customEase }}
              className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-5 py-2.5 text-xs font-medium text-muted-foreground backdrop-blur-md shadow-sm"
            >
              <c.icon className="size-4 text-primary" strokeWidth={1.5} />
              {c.label}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
