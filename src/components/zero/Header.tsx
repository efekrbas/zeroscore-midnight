import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Wallet, Menu, X, ArrowRight, LogOut, Loader2 } from "lucide-react";
import { midnightService } from "@/services/midnight";
import { toast } from "sonner";
import { MidnightLogo } from "./MidnightLogo";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Dashboard", href: "#dashboard" },
  { label: "Verifiers", href: "#verifiers" },
  { label: "Architecture", href: "#architecture" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    if (connected) {
      setConnected(false);
      toast.info("Wallet disconnected");
      return;
    }

    setIsConnecting(true);
    try {
      const success = await midnightService.connectLaceWallet();
      if (success) {
        setConnected(true);
        toast.success("Connected to Midnight Lace Wallet!");
      } else {
        toast.error("Failed to connect wallet.");
      }
    } catch (error) {
      toast.error("Connection rejected.");
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-6 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-8 rounded-full border border-white/10 bg-surface/80 px-4 py-2.5 backdrop-blur-2xl shadow-glass transition-all duration-500 w-full max-w-5xl ${
            scrolled ? "py-2 bg-surface/90" : ""
          }`}
        >
          <a
            href="#top"
            className="flex items-center gap-3 group active:scale-[0.97] transition-transform duration-200"
          >
            <div className="grid size-9 place-items-center rounded-xl bg-primary/10 border border-primary/20 p-1.5">
              <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              Zero<span className="text-primary">Score</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-full px-5 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-white/5 hover:text-foreground active:scale-[0.97]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="group relative flex h-10 w-auto shrink-0 items-center gap-3 overflow-hidden rounded-full p-1 pl-4 font-medium transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                backgroundColor: connected
                  ? "rgba(16, 185, 129, 0.1)"
                  : "rgba(255, 255, 255, 0.05)",
                border: connected
                  ? "1px solid rgba(16, 185, 129, 0.3)"
                  : "1px solid rgba(255, 255, 255, 0.1)",
                color: connected ? "var(--primary)" : "white",
              }}
            >

              <span className="relative z-10 flex w-full items-center justify-between gap-3">
                <span className="whitespace-nowrap font-mono text-[13px] tracking-tight">
                  {isConnecting ? "Connecting..." : connected ? "0x3f...9a2c" : "Connect Wallet"}
                </span>
                <span
                  className="grid size-7 shrink-0 place-items-center rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor: connected
                      ? "rgba(16, 185, 129, 0.2)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: connected ? "var(--primary)" : "white",
                  }}
                >
                  {isConnecting ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Wallet className="size-3.5" />
                  )}
                </span>
              </span>
            </button>

            <button
              className="grid size-10 place-items-center rounded-full bg-white/5 border border-white/10 md:hidden active:scale-[0.97] transition-transform"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              <div className="relative size-5">
                <span
                  className={`absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] grid place-items-center ${open ? "rotate-180 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"}`}
                >
                  <Menu className="size-5" strokeWidth={1.5} />
                </span>
                <span
                  className={`absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] grid place-items-center ${open ? "rotate-0 opacity-100 scale-100" : "-rotate-180 opacity-0 scale-50"}`}
                >
                  <X className="size-5" strokeWidth={1.5} />
                </span>
              </div>
            </button>
          </div>
        </motion.div>
      </header>

      {/* Massive Screen-Filling Overlay for Mobile Nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(40px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-background/80 md:hidden flex flex-col justify-center px-8"
          >
            <nav className="flex flex-col gap-6">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block text-4xl font-semibold tracking-tight text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {l.label}
                  </a>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: links.length * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <button
                  onClick={() => {
                    setConnected(true);
                    setOpen(false);
                  }}
                  className="group flex w-full items-center justify-between rounded-full bg-primary pl-6 pr-2 py-2 text-lg font-medium text-primary-foreground active:scale-[0.98] transition-all"
                >
                  <span>{connected ? "Wallet Connected" : "Connect Midnight"}</span>
                  <div className="grid size-10 place-items-center rounded-full bg-black/10">
                    <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
