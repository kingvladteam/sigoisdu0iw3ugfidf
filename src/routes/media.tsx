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
    imageAlt: "Ірина Рудика (Інґіґерда) для Huxley",
    imageFit: "cover" as const,
  },
  {
    icon: BookOpen,
    source: "Barabooka",
    title: "Інґіґерда — авторка «Смачненької абетки»",
    excerpt:
      "Народилася на Рівненщині, багато років мешкає в Києві. Має дві освіти: медичну та економічну. Скільки себе памʼятає, займалася творчістю: малювала чорно-білу графіку, захоплювалася…",
    url: "https://www.barabooka.com.ua/ingigerda/",
    cta: "Читати далі",
    image: "/assets/barabooka-logo.png",
    imageAlt: "Barabooka",
    imageFit: "logo" as const,
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
    image: "/assets/ingigerda-abetka-author.png",
    imageAlt: "Книга «Смачненька абетка» та авторка Інґіґерда",
    imageFit: "cover" as const,
  },
];

function MediaCard({ article }: { article: (typeof articles)[number] }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_24px_48px_-20px_var(--color-accent)]"
    >
      {article.imageFit === "logo" ? (
        <div className="flex aspect-[16/9] items-center justify-center bg-paper px-8">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="h-10 w-auto max-w-full md:h-12"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-8">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent">
          <article.icon className="h-3.5 w-3.5" />
          {article.source}
        </span>
        <h3 className="mt-4 font-display text-xl font-medium leading-snug md:text-2xl">
          {article.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75">
          {article.excerpt}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          {article.cta}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}

function VideoCard({ title, videoId }: { title: string; videoId: string }) {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <h2 className="mb-4 font-display text-xl font-medium md:text-2xl">{title}</h2>
      <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

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
                alt={articles[0].imageAlt}
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

        {/* Article cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {articles.slice(1).map((a, i) => (
            <Reveal key={a.url} delay={i * 100} className="h-full">
              <MediaCard article={a} />
            </Reveal>
          ))}
        </div>

        {/* YouTube embeds */}
        <Reveal delay={150}>
          <div className="mt-16">
            <SectionLabel>Відео</SectionLabel>
            <div className="mt-8 space-y-12">
              <VideoCard
                title="Інґіґерда — про «Літературні забави» і не тільки"
                videoId="h2xPDvAWAfY"
              />
              <VideoCard
                title="Неочевидне партнерство: медіація в літературі"
                videoId="N26rMgeHR-4"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
