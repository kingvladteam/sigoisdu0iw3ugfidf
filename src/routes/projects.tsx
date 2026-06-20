import { createFileRoute } from "@tanstack/react-router";
import litzabavyLogo from "@/assets/litzabavy-logo.png.asset.json";
import kartky2 from "@/assets/kartky2.jpg.asset.json";
import kartky3 from "@/assets/kartky3.jpg.asset.json";
import kartky4 from "@/assets/kartky4.jpg.asset.json";
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
          "«Літературні забави» — авторський проєкт Інґіґерди: щотижневі літературні вечори, відкритий мікрофон, прямі трансляції українських авторів.",
      },
      { property: "og:image", content: litzabavyLogo.url },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <section className="border-t border-border/60 bg-gradient-to-br from-accent/10 via-background to-card">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <SectionLabel>Авторський проєкт</SectionLabel>
            <h1 className="font-display text-5xl md:text-6xl">Літературні забави</h1>
            <div className="gold-line my-6 w-20" />
            <p className="text-lg leading-relaxed text-foreground/85">
              Мистецький проєкт, заснований у листопаді 2021 року. Майданчик зустрічі творчого
              авангарду України — тих, хто творить сучасну літературу, музику, театр, кіно,
              живопис, і тих, хто ними цікавиться.
            </p>
            <p className="mt-4 text-muted-foreground">
              Понад <strong className="text-foreground">150 українських авторів</strong> уже
              виступили на сцені проєкту.
            </p>
            <div className="mt-8">
              <SocialList items={litZabavySocials} variant="compact" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-[#2767d1] blur-3xl opacity-30" />
              <div className="overflow-hidden rounded-3xl border border-border shadow-2xl bg-[#2767d1] transition-transform duration-700 hover:scale-[1.02]">
                <img
                  src={litzabavyLogo.url}
                  alt="Логотип «Літературні забави»"
                  className="w-full"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionLabel>Формати</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl">Що відбувається на «Забавах»</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Авторські вечори", d: "Щотижневі зустрічі з письменниками, поетами, перекладачами." },
              { t: "Відкритий мікрофон", d: "Можливість прочитати свої тексти перед живою аудиторією." },
              { t: "Перформанси", d: "Музика, театр, перформативне читання та мультидисциплінарні події." },
              { t: "Прямі трансляції", d: "Усі заходи доступні онлайн у Facebook та YouTube." },
            ].map((it, i) => (
              <Reveal key={it.t} delay={i * 90}>
                <div className="h-full rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg">
                  <h3 className="font-display text-xl">{it.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal>
            <SectionLabel>Галерея</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl">Атмосфера зустрічей</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[kartky2, kartky3, kartky4].map((a, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="overflow-hidden rounded-xl border border-border">
                  <img
                    src={a.url}
                    alt="Літературні забави — момент"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-110"
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
