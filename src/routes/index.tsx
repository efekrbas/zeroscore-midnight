import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/zero/Header";
import { Hero } from "@/components/zero/Hero";
import { Dashboard } from "@/components/zero/Dashboard";
import { Verifier } from "@/components/zero/Verifier";
import { Architecture } from "@/components/zero/Architecture";
import { Marquee } from "@/components/zero/Marquee";
import { Footer } from "@/components/zero/Footer";
import { Preloader } from "@/components/zero/Preloader";
import { Cursor } from "@/components/zero/Cursor";

const title = "ZeroScore — Zero-Knowledge Credit & Asset Verification";
const description =
  "Prove your balance, credit score, or income thresholds without revealing the numbers. ZK verification powered by Midnight Network and Compact DSL.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background relative">
      <Cursor />
      <Preloader />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Dashboard />
        <Verifier />
        <Architecture />
      </main>
      <Footer />
    </div>
  );
}
