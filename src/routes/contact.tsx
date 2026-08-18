import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Send } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { SocialList } from "@/components/site/SocialList";
import { authorSocials } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Контакти — Інґіґерда" },
      {
        name: "description",
        content:
          "Контакти Інґіґерди: Telegram @ingi_gerda, Instagram, Facebook, YouTube. Замовлення книг та запрошення на події.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="border-t border-border/60 bg-gradient-to-br from-[#2767d1]/10 via-background to-card/70">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <Reveal>
          <SectionLabel label="Контакти" />
          <h1 className="mt-5 font-display text-3xl font-medium md:text-5xl">Контакти</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/70 md:text-lg">
            Для запрошень на події, співпраці та творчих пропозицій — пишіть у соцмережах або в Telegram.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal delay={120}>
            <div className="rounded-[1.75rem] border border-border bg-card/80 p-6 shadow-sm backdrop-blur-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20">
                  <Send className="h-5 w-5" />
                </div>
                <h2 className="font-display text-2xl font-medium">Соцмережі авторки</h2>
              </div>

              <div className="mt-6">
                <SocialList items={authorSocials} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="rounded-[1.75rem] border border-border bg-gradient-to-br from-accent/10 via-card to-card/80 p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <MapPin className="h-5 w-5" />
                </div>
                <h2 className="font-display text-2xl font-medium">Місце заходів</h2>
              </div>

              <p className="mt-6 text-base leading-relaxed text-foreground/70">
                Це місце, де проводяться тільки авторські вечори, презентації та мистецькі заходи проєкту «Літературні забави».
              </p>

              <div className="mt-5 rounded-2xl border border-border bg-background/70 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Адреса заходів</p>
                <p className="mt-2 text-lg font-medium text-foreground">м. Київ, Нижній Вал, 23, 3 пов.</p>
              </div>

              <a
                href="https://maps.app.goo.gl/kAwe46u64NqvXHFs5"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent/80"
              >
                Відкрити карту
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
