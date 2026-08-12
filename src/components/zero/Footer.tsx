import { Github, Globe, BookOpen, ShieldCheck } from "lucide-react";

const links = [
  { icon: Github, label: "github.com/efekrbas/zeroscore-midnight", href: "https://github.com/efekrbas/zeroscore-midnight" },
  { icon: Globe, label: "zeroscore-midnight.vercel.app", href: "https://zeroscore-midnight.vercel.app" },
  { icon: BookOpen, label: "Midnight Docs", href: "https://docs.midnight.network" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-primary/12">
            <ShieldCheck className="size-4 text-primary" />
          </span>
          <div>
            <p className="text-sm font-semibold">ZeroScore</p>
            <p className="text-xs text-muted-foreground">
              Zero-knowledge financial verification on Midnight.
            </p>
          </div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <l.icon className="size-4" />
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
