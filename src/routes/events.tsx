import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, Radio } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Події та виступи — Інґіґерда" },
      {
        name: "description",
        content:
          "Найближчі літературні вечори, презентації книг та авторські зустрічі Інґіґерди в межах проєкту «Літературні забави».",
      },
    ],
  }),
  component: EventsPage,
});

const upcoming = [
  {
    date: "Щочетверга",
    time: "19:00",
    title: "Літературні забави — авторський вечір",
    place: "Київ, локація уточнюється у соцмережах",
    type: "Регулярна зустріч",
    online: true,
  },
  {
    date: "Останній четвер місяця",
    time: "19:30",
    title: "Відкритий мікрофон",
    place: "Київ + онлайн-трансляція",
    type: "Для всіх охочих",
    online: true,
  },
  {
    date: "За запитом",
    time: "—",
    title: "Презентація «Уламків» у вашому місті",
    place: "Україна, на запрошення книгарень і бібліотек",
    type: "Презентація книги",
    online: false,
  },
];

function EventsPage() {
  return (
    <>
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionLabel>Розклад</SectionLabel>
            <h1 className="font-display text-4xl md:text-5xl">Найближчі події</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Усі літературні вечори транслюються наживо на Facebook та YouTube «Літературних
              забав». Записи залишаються доступними для перегляду.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5">
            {upcoming.map((e, i) => (
              <Reveal key={e.title} delay={i * 100}>
                <article className="group grid gap-6 rounded-2xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl md:grid-cols-[200px_1fr_auto] md:items-center md:p-8">
                  <div>
                    <p className="font-display text-3xl text-accent">{e.date}</p>
                    <p className="text-sm text-muted-foreground">{e.time}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {e.type}
                    </p>
                    <h2 className="mt-1 font-display text-2xl transition-colors group-hover:text-accent">
                      {e.title}
                    </h2>
                    <p className="mt-2 flex items-center gap-2 text-sm text-foreground/80">
                      <MapPin className="h-4 w-4 text-accent" /> {e.place}
                    </p>
                    {e.online && (
                      <p className="mt-1 flex items-center gap-2 text-sm text-foreground/80">
                        <Radio className="h-4 w-4 text-accent" /> Пряма трансляція онлайн
                      </p>
                    )}
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    className="border-accent text-accent transition-all hover:scale-105 hover:bg-accent/10"
                  >
                    <a
                      href="https://t.me/litzabavy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Дізнатися більше
                    </a>
                  </Button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-primary/95 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <Reveal>
            <Calendar className="mx-auto h-10 w-10 text-accent" />
            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              Запросити Інґіґерду на подію
            </h2>
            <p className="mt-3 text-primary-foreground/80">
              Презентації книг, авторські читання, майстер-класи з розвитку «м'яких» навичок для
              дітей і дорослих.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 bg-accent text-accent-foreground transition-all hover:scale-105 hover:bg-accent/90"
            >
              <Link to="/contact">Написати авторці</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
