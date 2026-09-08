import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Newspaper, Podcast, BookOpen } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Інґіґерда в медіа — Ірина Рудика" },
      {
        name: "description",
        content:
          "Інтерв'ю, статті та відео з Інґіґердою (Іриною Рудикою): подкаст Huxley про культуру та освіту, Літературні забави, матеріали про Смачненьку абетку.",
      },
      { property: "og:title", content: "Інґіґерда в медіа — Ірина Рудика" },
      {
        property: "og:description",
        content:
          "Інтерв'ю, статті та відео з Інґіґердою (Іриною Рудикою): культура, мистецтво, освіта та Літературні забави.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MediaPage,
});

const articles = [
  {
    icon: Podcast,
    source: "Huxley",
    title: "Письменниця Ірина Рудика: про сенс культури й освіти у часи випробувань",
    excerpt:
      "Усе, чим я займаюся — культура, мистецтво, освіта, громадська діяльність, — насправді має велике значення. А зараз — особливо. Мені вкрай важливо розвивати…",
    url: "https://huxley.media/pismennicja-irina-rudika-pro-sens-kulturi-j-osviti-u-chasi-viprobuvan/",
    cta: "Читати та слухати подкаст",
    image: "/assets/ingigerda-huxley.png",
  },
  {
    icon: BookOpen,
    source: "Barabooka",
    title: "Інґіґерда — авторка «Смачненької абетки»",
    excerpt:
      "Народилася на Рівненщині, багато років мешкає в Києві. Має дві освіти: медичну та економічну. Скільки себе памʼятає, займалася творчістю: малювала чорно-білу графіку, захоплювалася…",
    url: "https://www.barabooka.com.ua/ingigerda/",
    cta: "Читати далі",
  },
  {
    icon: Newspaper,
    source: "Культура.Rayon",
    title:
      "«Смачненька абетка», або Як ІнґіҐерда популяризує українську культуру через рутенський шрифт",
    excerpt:
      "Про книгу-абетку, надруковану відновленим прадавнім шрифтом «Рутенія», та місію її авторки.",
    url: "https://kultura.rayon.in.ua/topics/580757-smachnenka-abetka-abo-yak-ingi-gerda-populyarizue-ukrainsku-kulturu-cherez-rutenskiy-shrift",
    cta: "Читати статтю",
  },
];

function MediaPage() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <SectionLabel>ЗМІ про авторку</SectionLabel>
          <h1 className="hero-title font-display text-4xl font-medium md:text-6xl">
            Інґіґерда <span className="text-accent">в медіа</span>
          </h1>
          <div className="gold-line my-6 w-20" />
          <p className="max-w-2xl text-base leading-[1.75] text-foreground/85 md:text-lg">
            Інтерв'ю, статті та відео про творчість і культурні проєкти.
          </p>
        </Reveal>

        {/* Featured card with photo */}
        <Reveal delay={100}>
          <a
            href={articles[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 grid overflow-hidden rounded-2xl border border-border bg-card/60 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_24px_48px_-20px_var(--color-accent)] md:grid-cols-[2fr_3fr]"
          >
            <div className="relative aspect-[3/2] overflow-hidden md:aspect-auto">
              <img
                src={articles[0].image}
                alt="Ірина Рудика (Інґіґерда) для Huxley"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent backdrop-blur">
                <Podcast className="h-3.5 w-3.5" />
                {articles[0].source}
              </span>
            </div>
            <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
              <h2 className="font-display text-2xl font-medium leading-snug md:text-3xl">
                {articles[0].title}
              </h2>
              <p className="text-sm leading-relaxed text-foreground/75 md:text-base">
                {articles[0].excerpt}
              </p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                {articles[0].cta}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </a>
        </Reveal>

        {/* YouTube embed */}
        <Reveal delay={150}>
          <div className="mt-16">
            <SectionLabel>Відео</SectionLabel>
            <h2 className="mb-6 font-display text-2xl font-medium md:text-3xl">
              Інґіґерда — про «Літературні забави» і не тільки
            </h2>
            <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
              <div className="aspect-video w-full">
                <iframe
                  src="https://www.youtube.com/embed/h2xPDvAWAfY"
                  title="Інґіґерда – про «Літературні забави» і не тільки"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  className="h-full w-full"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Article cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {articles.slice(1).map((a, i) => (
            <Reveal key={a.url} delay={i * 100}>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-border bg-card/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_24px_48px_-20px_var(--color-accent)]"
              >
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent">
                  <a.icon className="h-3.5 w-3.5" />
                  {a.source}
                </span>
                <h3 className="mt-4 font-display text-xl font-medium leading-snug md:text-2xl">
                  {a.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75">
                  {a.excerpt}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  {a.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
