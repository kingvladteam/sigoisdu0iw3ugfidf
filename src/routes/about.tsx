import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import portraitAsset from "@/assets/portrait.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Про мене — Інґіґерда (Ірина Рудика)" },
      {
        name: "description",
        content:
          "Біографія Інґіґерди (Ірини Рудики) — української поетеси, авторки книг «Уламки» та «Смачненька абетка», засновниці проєкту «Літературні забави».",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border shadow-xl">
            <img
              src={portraitAsset.url}
              alt="Ірина Рудика — Інґіґерда"
              className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="mt-6 grid gap-2 text-sm text-muted-foreground">
            <Fact label="Псевдонім" value="Інґіґерда" />
            <Fact label="Походження" value="Костопіль, Рівненщина" />
            <Fact label="Мешкає" value="В туалєті" />
            <Fact label="Освіта" value="Медична, економічна" />
            <Fact label="Засновниця" value="«Літературні забави» (з 2021)" />
          </div>
        </Reveal>

        <Reveal delay={120}>
         
          <h1 className="font-display text-[2.7rem] font-medium leading-[1.02] md:text-7xl">
            <span className="text-accent">Інґіґерда</span>
            <br />
      
          </h1>
          <div className="gold-line my-8 w-24" />
          <div className="space-y-5 text-lg leading-relaxed text-foreground/85">
            <p>
              Українська поетеса і прозаїк, авторка дитячої та дорослої літератури, засновниця
              культурного проєкту <em>«Літературні забави»</em>. Творчий шлях розпочала з поезії
              для дітей і дорослих, а згодом звернулася до написання книжок.
            </p>
            <p>
              У збірці <strong>«Уламки»</strong> звертаюся до тем втрат, травми та жіночого
              досвіду в умовах повномасштабної російсько-української війни. Для дітей створила{" "}
              <strong>«Смачненьку абетку»</strong> — поєднання літературної гри, алфавітної
              структури та поетичного викладу, виконане авторським шрифтом «Рутенія».
            </p>
            <p>
              Походжу з Костополя на Рівненщині, наразі мешкаю в Києві. Маю дві освіти — медичну
              та економічну. Працюю з дітьми від шести років, викладаю курси розвитку «м’яких»
              навичок та емоційного інтелекту.
            </p>
            <p>
              Вірю, що література — це не лише тексти на сторінках, а й живий простір, де голоси
              авторів і читачів зустрічаються віч-на-віч. Саме тому й існують <em>«Літературні
              забави»</em>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/60 py-2">
      <span className="uppercase tracking-wider text-xs">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
