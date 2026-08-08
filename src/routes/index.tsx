import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import portraitAsset from "@/assets/portrait.jpg.asset.json";
import litzabavyLogo from "@/assets/litzabavy-logo.png.asset.json";
import event1 from "@/assets/event-1.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Інґіґерда — поетеса та авторка" },
      {
        name: "description",
        content:
          "Офіційний сайт української поетеси Інґіґерди — авторки книг та засновниці проєкту «Літературні забави».",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <LitZabavyTeaser />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(120%_90%_at_85%_-10%,color-mix(in_oklab,var(--color-accent)_18%,transparent),transparent_55%),radial-gradient(100%_80%_at_-10%_110%,color-mix(in_oklab,var(--color-gold)_16%,transparent),transparent_50%)]">
      <div className="pointer-events-none absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
    
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-[1.05fr_1fr] md:py-32">
        <Reveal>
          <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-accent">
            Вірші · Пісні · Проза
          </p>
          <h1 className="font-display text-[2.7rem] font-medium leading-[1.02] md:text-7xl">
            <span className="text-accent">ІНҐІГЕРДА</span>
            <br />
            <div className="gold-line my-6 w-20" />
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/75">
            письменниця, авторка статей, перекладачка, громадська діячка, організаторка мистецьких імпрез, експертка з розвитку освітніх та культурних проєктів.
          </p>
          <p className="mt-6 max-w-xl space-y-4 text-sm leading-relaxed text-foreground/50">
            <span className="block font-display text-base italic text-foreground/60">
              «Моє покликання — втілювати сенси у словах та діях. 
              Моя творчість — це поезія та коротка проза для дітей та дорослих різних жанрів і тематики.
              Як громадська діячка та кураторка, я трансформую літературу в живі імпрези, створюю простори для діалогу та міжкультурних проєктів».
            </span>
          </p>
          <div className="mt-10 flex flex-wrap justify-start gap-4">
              <Button
                asChild
                size="lg"
                className="group bg-accent text-accent-foreground transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-xl"
              >
                <Link to="/about">
                  Дізнатися більше
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/15 blur-2xl" />
            <div className="overflow-hidden rounded-[1.8rem] border border-border shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
              <img
                src={portraitAsset.url}
                alt="Портрет Інґіґерди — Ірини Рудики"
                className="aspect-[3/4] w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden max-w-[16rem] rounded-xl border border-border bg-card px-5 py-3 shadow-lg md:block animate-fade-in">
              <p className="font-display text-base italic leading-snug">
                «Усе, чим я займаюся — 
культура, мистецтво, освіта, громадська 
діяльність, — насправді має велике значення.
А зараз — особливо.»
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function LitZabavyTeaser() {
  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-[radial-gradient(120%_90%_at_85%_-10%,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_55%),radial-gradient(100%_80%_at_-10%_110%,color-mix(in_oklab,var(--color-gold)_15%,transparent),transparent_50%)]">
      <div className="pointer-events-none absolute -top-32 -right-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl animate-float" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-[1fr_1.05fr] md:py-32">
        <Reveal delay={150}>
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/15 blur-2xl" />
            <div className="overflow-hidden rounded-[1.8rem] border border-border shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
              <img
                src={event1.url}
                alt="Літературні забави — авторський вечір"
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden h-28 w-28 items-center justify-center rounded-full border border-border bg-card p-2 shadow-lg md:flex">
              <img
                src={litzabavyLogo.url}
                alt="Логотип Літературних забав"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="text-right md:ml-auto md:max-w-xl">
            <p className="mb-5 flex items-center justify-end gap-3 text-xs font-medium uppercase tracking-[0.32em] text-accent">
              Авторський проєкт
            </p>
            <h2 className="font-display text-[1.9rem] font-medium leading-[1.05] md:text-5xl">
              <span className="text-accent">ЛІТЕРАТУРНІ ЗАБАВИ</span>
            </h2>
            <div className="gold-line my-6 ml-auto w-20" />
            <p className="text-lg leading-relaxed text-foreground/75">
              Інтелектуальні мистецькі імпрези з 2021 року.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-foreground/75">
              Проєкт, який популяризує сучасну українську літературу, музику, театр. Щотижневі
              авторські вечори з прямими трансляціями, фотосетами та активностями.
            </p>
            <div className="mt-10 flex flex-wrap justify-end gap-4">
              <Button
                asChild
                size="lg"
                className="group bg-accent text-accent-foreground transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-xl"
              >
                <Link to="/projects">
                  Дізнатися більше
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
