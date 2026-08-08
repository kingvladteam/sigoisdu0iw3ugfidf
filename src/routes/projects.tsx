import { createFileRoute } from "@tanstack/react-router";
import { Award, Users, Mic, Radio, Camera } from "lucide-react";
import litzabavyLogo from "@/assets/litzabavy-logo.png.asset.json";
import badgeAsset from "@/assets/litzabavy-badge.png.asset.json";
import event1 from "@/assets/event-1.jpg.asset.json";
import event2 from "@/assets/event-2.jpg.asset.json";
import event3 from "@/assets/event-3.jpg.asset.json";
import event4 from "@/assets/event-4.jpg.asset.json";
import event5 from "@/assets/event-5.jpg.asset.json";
import event6 from "@/assets/event-6.jpg.asset.json";
import event7 from "@/assets/event-7.jpg.asset.json";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { SocialList } from "@/components/site/SocialList";
import { litZabavySocials } from "@/lib/site-data";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Літературні забави — мистецький проєкт Інґіґерди" },
      {
        name: "description",
        content:
          "«Літературні забави» — авторський проєкт Інґіґерди: щотижневі літературні вечори, відкритий мікрофон, прямі трансляції у Facebook.",
      },
      { property: "og:image", content: litzabavyLogo.url },
    ],
  }),
  component: ProjectsPage,
});

const gallery = [event1, event2, event3, event4, event5, event6, event7];

const formats = [
  { icon: Mic, t: "Мистецькі імпрези", d: "Ми організовуємо: авторські та творчі вечори, презентації книг, концерти, перформанси" },
  { icon: Camera, t: "Фотосети", d: "Усі події супроводжує професійний фотограф" },
  { icon: Radio, t: "Прямі трансляції", d: "Кожен захід доступний онлайн у Facebook" },
  { icon: Users, t: "Відкритий мікрофон", d: "Можливість прочитати свої тексти перед живою аудиторією." },
];

function ProjectsPage() {
  return (
    <>
      <section className="border-t border-border/60 bg-gradient-to-br from-[#2767d1]/10 via-background to-card">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="gold-line my-6 w-20" />
            <p className="text-lg leading-relaxed text-foreground/85">
              «Літературні забави» — це проєкт із 5-річною історією, на сцені якого вже прозвучали голоси понад 165 сучасних українських авторів. Вигадала та реалізувала його Інґіґерда. Власне, це секрет його довготривалості та сталості. 
            </p>
            <p className="mt-4 text-muted-foreground">
              Сьогодні «Літературні забави» — майданчик зустрічі творчих людей України: тих, хто творить сучасну літературу, музику, театр, кіно, живопис, і тих, хто ними цікавиться. Це 
щотижневі авторські вечори з прямими трансляціями, перформанси, презентації, 
відкритий мікрофон і творчий нетворкінг.
            </p>
            <div className="mt-8">
              <SocialList items={litZabavySocials} variant="compact" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-[#2767d1] blur-3xl opacity-30" />
              <div className="overflow-hidden rounded-full border border-border shadow-2xl bg-[#2767d1] transition-transform duration-700 hover:scale-[1.02]">
                <img
                  src={litzabavyLogo.url}
                  alt="Логотип «Літературні забави»"
                  className="aspect-square w-full rounded-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/60 bg-gradient-to-b from-card/60 via-background to-background">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <h2 className="font-display text-3xl font-medium md:text-4xl">
              Що особливого:
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((it, i) => (
              <Reveal key={it.t} delay={i * 90}>
                <div className="group h-full rounded-2xl border border-accent/10 bg-gradient-to-b from-card to-card/60 p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/15 transition-all group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                    <it.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold leading-snug">{it.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      <section className="border-t border-border/60 bg-gradient-to-br from-accent/5 via-background to-accent/10">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="mx-auto max-w-xs">
              <img
                src={badgeAsset.url}
                alt="Значок учасника «Літературних забав»"
                className="w-full drop-shadow-2xl animate-float"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h5 className="font-display text-[2.7rem] font-medium leading-[1.02] md:text-7xl">
            <span className="text-accent">Наша подяка учасникам</span>
            <br />
          </h5>
            <div className="gold-line my-6 w-20" />
            <p className="text-lg leading-relaxed text-foreground/85">
              Кожен автор, який виступив на «Літературних забавах», отримує пам'ятний значок —
              символ належності до спільноти, що творить сучасну українську літературу.
            </p>
            <p className="mt-3 text-muted-foreground">
              Це маленький знак вдячності та визнання — і нагадування, що слово об'єднує.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionLabel>Галерея</SectionLabel>
            <h2 className="font-display text-3xl font-medium md:text-4xl">Атмосфера зустрічей</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((a, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="group overflow-hidden rounded-xl border border-border bg-card">
                  <img
                    src={a.url}
                    alt="Літературні забави — момент"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
