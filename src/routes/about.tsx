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
            <Fact label="Зависла" value="В туалєті" />
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
              Авторка віршів, поем, казок, оповідань для дітей та дорослих, засновниця мистецького проєкту «Літературні забави», співзасновниця фестивалю «Поверхи», фахівчиня у сфері неформальної освіти, амбасадорка концепції Life Long Learning в Україні.
            </p>
            <p>
              Авторка дитячої книжки «Смачненька абетка» (2023), єдиної художньої книги в Україні, надрукованої шрифтом Рутенія, та артбуку «Уламки» (2024). Одна з перекладачок із кримськотатарської на українську збірки «Qırım öz tüsüni alır / Поверне собі колір Крим» (2024).
Співавторка багатьох поетичних збірників та альманахів (ЙБН БЛД РСН, Цвях, 100 секунд).
            </p>
            <p>
              «Усе, чим я займаюся — культура, мистецтво, освіта, громадська діяльність, — насправді має велике значення. А зараз — особливо. Мені вкрай важливо розвивати всі напрями своєї діяльності та, за можливості, поєднувати їх. Велике щастя — навчати через творчість і водночас творити, навчаючи».
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
