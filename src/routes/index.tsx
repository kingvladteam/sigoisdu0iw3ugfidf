import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import litzabavyLogo from "@/assets/litzabavy-logo.png.asset.json";
import litzabavyAudience from "@/assets/litzabavy-audience.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ingigerda — Інґіґерда (Інгігерда)" },
      {
        name: "description",
        content:
          "Інґіґерда (Ingigerda), також Інгігерда, — сучасна українська письменниця, організаторка мистецьких імпрез, громадська діячка, фахівчиня з розвитку людського капіталу.",
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
    
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-8 md:grid-cols-[1.05fr_1fr] md:gap-14 md:px-6 md:py-20">
        <Reveal>
          <p className="mb-5 flex items-center justify-center gap-3 text-center text-xs font-medium uppercase tracking-[0.32em] text-accent md:justify-start md:text-left">
            Вірші · Пісні · Проза
          </p>
          <h1 className="font-display text-[2.2rem] font-medium leading-[1.02] md:text-7xl">
            <span className="block text-center text-accent md:text-left">ІНҐІҐЕРДА</span>
            <span className="gold-line my-6 mx-auto block w-20 md:mx-0" />
          </h1>

          <Reveal delay={150} className="block md:hidden">
            <div className="relative mx-auto mt-2 w-full max-w-[18rem]">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/15 blur-2xl" />
              <div className="overflow-hidden rounded-[1.4rem] border border-border shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
                <img
                  src="/assets/portrait_main.jpg"
                  alt="Інґіґерда (Ingigerda)"
                  className="aspect-[3/4] w-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </Reveal>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-foreground/75 md:mt-7 md:text-lg">
            Інґіґерда (Ingigerda), також Інгігерда, — сучасна українська письменниця, організаторка мистецьких імпрез, громадська діячка, фахівчиня з розвитку людського капіталу.
          </p>
          <p className="mt-6 max-w-xl space-y-4 text-sm leading-relaxed text-foreground/50">
            <span className="block font-display text-base italic text-foreground/60">
              «Моє покликання — втілювати сенси у словах та діях.
              Моя творчість — це поезія та коротка проза для дітей та дорослих різних жанрів і тематики.
              Як громадська діячка та кураторка, я трансформую літературу в живі імпрези, створюю простори для діалогу та міжкультурних проєктів».
            </span>
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
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

        <Reveal delay={150} className="hidden md:block">
          <div className="relative mx-auto mt-0 w-full max-w-none">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/15 blur-2xl" />
            <div className="overflow-hidden rounded-[1.8rem] border border-border shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
              <img
                src="/assets/portrait_main.jpg"
                alt="Інґіґерда (Ingigerda)"
                className="aspect-[3/4] w-full object-cover"
                loading="eager"
              />
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

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-[1fr_1.05fr] md:gap-14 md:px-6 md:py-32">
        <Reveal delay={150}>
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/15 blur-2xl" />
            <div className="overflow-hidden rounded-[1.8rem] border border-border shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
              <img
                src={litzabavyAudience.url}
                alt="Гості авторського вечора «Літературні забави» під час прямої трансляції"
                className="aspect-[4/3] w-full object-cover object-[50%_35%]"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 flex h-20 w-20 items-center justify-center rounded-full border border-border bg-card p-2 shadow-lg md:-bottom-6 md:-right-6 md:h-28 md:w-28">
              <img
                src={litzabavyLogo.url}
                alt="Логотип Літературних забав"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="text-left md:ml-auto md:max-w-xl md:text-right">
            <p className="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-accent md:justify-end">
              Авторський проєкт
            </p>
            <h2 className="font-display text-[1.8rem] font-medium leading-[1.05] md:text-5xl">
              <span className="text-accent">ЛІТЕРАТУРНІ ЗАБАВИ</span>
            </h2>
            <div className="gold-line my-6 w-20 md:ml-auto" />
            <p className="text-base leading-relaxed text-foreground/75 md:text-lg">
              Інтелектуальні мистецькі імпрези з 2021 року.
            </p>
            <p className="mt-3 text-base leading-relaxed text-foreground/75 md:text-lg">
              Проєкт, який популяризує сучасну українську літературу, музику, театр. Щотижневі
              авторські вечори з прямими трансляціями, фотосетами та активностями.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-end">
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
