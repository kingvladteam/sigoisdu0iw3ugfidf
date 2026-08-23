import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Package, MapPin, Gift } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Доставка книг Інґіґерди — Нова пошта, Укрпошта, самовивіз" },
      {
        name: "description",
        content:
          "Умови доставки книг Інґіґерди: Нова пошта та Укрпошта за тарифами перевізника, самовивіз за домовленістю. Від 1000 грн — безкоштовно.",
      },
      { property: "og:title", content: "Доставка — Інґіґерда" },
      {
        property: "og:description",
        content:
          "Нова пошта, Укрпошта або самовивіз. На замовлення від 1000 грн доставка безкоштовна.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DeliveryPage,
});

const options = [
  {
    icon: Truck,
    title: "Нова пошта",
    text: "За тарифами перевізника.",
  },
  {
    icon: Package,
    title: "Укрпошта",
    text: "За тарифами перевізника.",
  },
  {
    icon: MapPin,
    title: "Самовивіз",
    text: "За попередньою домовленістю.",
  },
];

function DeliveryPage() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <Reveal>
          <SectionLabel>Умови</SectionLabel>
          <h1 className="font-display text-4xl font-medium md:text-5xl">Доставка</h1>
          <div className="gold-line mt-5 w-20" />
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {options.map((o, i) => (
            <Reveal key={o.title} delay={i * 100}>
              <div className="h-full rounded-2xl border border-accent/25 bg-gradient-to-br from-card to-card/40 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <o.icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold">{o.title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{o.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-8 flex items-center gap-4 rounded-2xl border border-accent/40 bg-accent/5 p-6">
            <Gift className="h-6 w-6 shrink-0 text-accent" />
            <p className="text-base text-foreground/90">
              На замовлення <strong>від 1000 грн</strong> доставка безкоштовна.
            </p>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/books">Придбати книги</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
