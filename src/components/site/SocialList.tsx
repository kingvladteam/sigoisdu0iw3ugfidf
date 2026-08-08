import { Instagram, Facebook, Youtube, Send } from "lucide-react";

const iconMap: Record<string, typeof Instagram> = {
  Instagram,
  Facebook,
  YouTube: Youtube,
  Telegram: Send,
};

type Social = { label: string; url: string; handle: string };

export function SocialList({
  items,
  variant = "default",
}: {
  items: Social[];
  variant?: "default" | "compact";
}) {
  if (variant === "compact") {
    return (
      <div className="flex flex-wrap gap-3">
        {items.map((s) => {
          const Icon = iconMap[s.label] ?? Send;
          return (
            <a
              key={s.label + s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${s.label} — ${s.handle}`}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-foreground/5 text-accent shadow-[0_2px_12px_-4px_color-mix(in_oklab,var(--accent)_45%,transparent)] ring-1 ring-inset ring-accent/15 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-accent/15 hover:ring-accent/40 hover:shadow-[0_6px_22px_-6px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />

            </a>
          );
        })}
      </div>
    );
  }
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((s) => {
        const Icon = iconMap[s.label] ?? Send;
        return (
          <li key={s.label + s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-lg border border-border bg-card/60 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-card hover:shadow-md"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-sm font-medium">{s.label}</span>
                <span className="text-xs text-muted-foreground">{s.handle}</span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
