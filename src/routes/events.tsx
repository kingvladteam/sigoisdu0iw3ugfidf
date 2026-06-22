import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin, Radio, ExternalLink, Clock, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Button } from "@/components/ui/button";
import { upcomingEvents } from "@/lib/site-data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Події «Літературних забав» — Інґіґерда" },
      {
        name: "description",
        content:
          "Розклад літературних вечорів «Літературних забав» у Вільному Принт Хабі (Київ, Нижній Вал 23, 3 поверх) та прямі трансляції у Facebook.",
      },
    ],
  }),
  component: EventsPage,
});

const FB_EVENTS = "https://www.facebook.com/literaturni.zabavy/upcoming_hosted_events";
const FB_PAGE = "https://www.facebook.com/literaturni.zabavy/";

const recurring = [
  {
    title: "Літературний вечір — Забави",
    when: "Щотижня",
    time: "Точний час — у Facebook-події",
    type: "Авторський вечір",
  },
  {
    title: "Відкритий мікрофон",
    when: "За окремим оголошенням",
    time: "Анонс у соцмережах",
    type: "Для всіх охочих",
  },
];

function EventsPage() {
  return (
    <>
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionLabel>Розклад</SectionLabel>
            <h1 className="font-display text-4xl font-medium md:text-5xl">
              Найближчі «Літературні забави»
            </h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Усі вечори відбуваються в одному місці й транслюються наживо у Facebook.
              Актуальні дати та теми вечорів — на офіційній сторінці проєкту.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 grid gap-6 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-card p-7 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-accent">
                  <MapPin className="h-4 w-4" /> Місце проведення
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold md:text-3xl">
                  Вільний Принт Хаб
                </h2>
                <p className="mt-2 text-foreground/80">
                  м. Київ, вул. Нижній Вал, 23, 3&nbsp;поверх
                </p>
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-foreground/80">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-accent" /> Київ, офлайн
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Radio className="h-4 w-4 text-accent" /> Пряма трансляція у Facebook
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button
                  asChild
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <a href={FB_EVENTS} target="_blank" rel="noopener noreferrer">
                    Майбутні події у Facebook
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5">
            {recurring.map((e, i) => (
              <Reveal key={e.title} delay={i * 100}>
                <article className="group grid gap-6 rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl md:grid-cols-[220px_1fr_auto] md:items-center md:p-8">
                  <div>
                    <p className="font-display text-2xl text-accent">{e.when}</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {e.time}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {e.type}
                    </p>
                    <h2 className="mt-1 font-display text-2xl font-semibold transition-colors group-hover:text-accent">
                      {e.title}
                    </h2>
                    <p className="mt-2 flex items-center gap-2 text-sm text-foreground/80">
                      <MapPin className="h-4 w-4 text-accent" />
                      Вільний Принт Хаб · Нижній Вал, 23 (3 поверх), Київ
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-foreground/80">
                      <Radio className="h-4 w-4 text-accent" />
                      Пряма трансляція у Facebook
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="border-accent text-accent transition-all hover:scale-105 hover:bg-accent/10"
                  >
                    <a href={FB_PAGE} target="_blank" rel="noopener noreferrer">
                      Деталі
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-10 text-center text-sm text-muted-foreground">
              Конкретні дати, теми та запрошені автори постійно оновлюються —
              {" "}
              <a
                href={FB_EVENTS}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline"
              >
                дивіться актуальні події у Facebook
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
