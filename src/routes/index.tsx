import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Sparkles, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import portraitAsset from "@/assets/portrait.jpg.asset.json";
import { books } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Інґіґерда — Ірина Рудика | Поетеса та авторка" },
      {
        name: "description",
        content:
          "Сайт української поетеси Інґіґерди (Ірини Рудики): книги «Уламки», «Смачненька абетка», проєкт «Літературні забави».",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Featured />
      <Highlights />
      <CTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
        <Reveal>
          <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent">
            <span className="h-px w-10 bg-accent" />
            Поетеса · Прозаїк · Авторка
          </p>
          <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">
            Слово, що тримає
            <span className="italic text-accent"> за руку</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Вітаю. Я <strong className="text-foreground">Ірина Рудика</strong>,{" "}
            <em className="text-foreground">Інґіґерда</em> — мій творчий псевдонім. Пишу для дітей
            і дорослих, засновую простір, де українська література звучить уголос.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="group bg-primary text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-xl"
            >
              <Link to="/books">
                Переглянути книги
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-accent text-accent transition-all duration-300 hover:scale-105 hover:bg-accent/10 hover:shadow-md"
            >
              <Link to="/projects">Літературні забави</Link>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent/10 blur-2xl" />
            <div className="overflow-hidden rounded-[1.5rem] border border-border shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
              <img
                src={portraitAsset.url}
                alt="Портрет Інґіґерди — Ірини Рудики"
                className="aspect-[3/4] w-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-lg border border-border bg-card px-5 py-3 shadow-lg md:block animate-fade-in">
              <p className="font-display text-lg italic">«…а слово — як свіча у долонях.»</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionLabel>Бібліотека</SectionLabel>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="font-display text-4xl md:text-5xl">Книги авторки</h2>
            <Link
              to="/books"
              className="story-link text-sm text-accent"
            >
              Усі книги →
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {books.map((book, i) => (
            <Reveal key={book.slug} delay={i * 120}>
              <Link
                to="/books/$slug"
                params={{ slug: book.slug }}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-2xl"
              >
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={book.cover}
                    alt={`Обкладинка «${book.title}»`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl transition-colors group-hover:text-accent">
                    {book.title}
                  </h3>
                  <p className="mt-1 text-sm text-accent">{book.price}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {book.short}
                  </p>
                  <span className="mt-6 inline-flex items-center text-sm font-medium text-accent">
                    Детальніше та замовити
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const items = [
    {
      icon: BookOpen,
      title: "Дитяча та доросла поезія",
      text: "Книги для різного віку: від ілюстрованих абеток до глибокої лірики.",
    },
    {
      icon: Sparkles,
      title: "Авторський шрифт «Рутенія»",
      text: "Власноруч створений шрифт, що звучить як рідна мова.",
    },
    {
      icon: Calendar,
      title: "Літературні вечори щотижня",
      text: "Понад 150 українських авторів уже виступили на сцені проєкту.",
    },
  ];
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 100}>
              <div className="group h-full rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-2xl">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="border-t border-border/60 bg-primary/95 text-primary-foreground">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl">
            Долучайтеся до літературних забав
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Щотижневі авторські вечори, прямі трансляції та зустрічі з найцікавішими голосами
            сучасної української літератури.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-xl"
            >
              <Link to="/events">Найближчі події</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/40 bg-transparent text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary-foreground/10"
            >
              <Link to="/contact">Зв’язатися</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
