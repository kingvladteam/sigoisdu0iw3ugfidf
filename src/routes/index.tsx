import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, BookHeart } from "lucide-react";
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
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl" />
    
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-[1.05fr_1fr] md:py-32">
        <Reveal>
          <p class="mb-5 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-white">
  
  Вірші · Пісні · Проза
 
</p>
          <h1 className="font-display text-[2.7rem] font-medium leading-[1.02] md:text-7xl">
            <span className="text-accent">ІНҐІГЕРДА</span>
            <br />
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/75">
            письменниця, авторка статей, перекладачка, громадська діячка, організаторка мистецьких імпрез, експертка з розвитку освітніх та культурних проєктів.
          </p>
          <p className="mt-6 max-w-xl space-y-4 text-sm leading-relaxed text-foreground/50">
            <span className="block font-display text-base italic text-foreground/60">
              «Моє покликання — втілювати сенси у словах та діях.
            </span>
            <span className="block">
              Моя творчість — це поезія та коротка проза для дітей та дорослих різних жанрів і тематики.
            </span>
            <span className="block">
              Як громадська діячка та кураторка, я трансформую літературу в живі імпрези, створюю простори для діалогу та міжкультурних проєктів».
            </span>
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="group bg-foreground text-background transition-all duration-300 hover:scale-105 hover:bg-foreground/90 hover:shadow-xl"
            >
              <Link to="/about">
                Про мене
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-accent text-accent transition-all duration-300 hover:scale-105 hover:bg-accent/10"
            >
              <Link to="/projects">Літературні забави</Link>
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
                «…а слово — як свіча у долонях.»
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
    <section className="relative border-t border-border/60 bg-gradient-to-br from-card/40 via-background to-accent/5">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-border shadow-xl">
              <img
                src={event1.url}
                alt="Літературні забави — авторський вечір"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 hidden h-32 w-32 items-center justify-center rounded-full border border-border bg-card p-3 shadow-xl md:flex">
              <img
                src={litzabavyLogo.url}
                alt="Логотип Літературних забав"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <SectionLabel>Авторський проєкт</SectionLabel>
          <h2 className="font-display text-4xl font-medium leading-tight md:text-5xl">
            Літературні забави
          </h2>
          <div className="gold-line my-6 w-20" />
          <p className="text-lg leading-relaxed text-foreground/80">
            Мистецький проєкт, заснований у листопаді 2021 року. Майданчик для творчого
            авангарду України — авторів, музикантів, художників і всіх, хто живе сучасною
            культурою.
          </p>
          <div className="mt-7 grid gap-3 text-sm text-foreground/80 sm:grid-cols-2">
            <p className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Понад 150 українських авторів
            </p>
            <p className="flex items-center gap-2">
              <BookHeart className="h-4 w-4 text-accent" />
              Щотижневі літературні вечори
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="group mt-8 bg-accent text-accent-foreground transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-xl"
          >
            <Link to="/projects">
              Дізнатися більше
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
