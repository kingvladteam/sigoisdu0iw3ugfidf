import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
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
          <div className="mb-6 md:mb-0">
            <p className="mb-5 flex items-center justify-center gap-3 text-center text-xs font-medium uppercase tracking-[0.32em] text-accent md:hidden">
              Вірші · Пісні · Проза
            </p>
            <h1 className="mb-4 block text-center font-display text-[2.4rem] font-medium leading-[1.02] text-accent md:hidden">
              ІНҐІҐЕРДА
            </h1>
            <div className="gold-line mx-auto mb-5 block w-20 md:hidden" />
            <div className="relative mx-auto w-full max-w-[18rem] md:max-w-none">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/15 blur-2xl" />
              <div className="overflow-hidden rounded-[1.4rem] border border-border shadow-2xl transition-transform duration-700 hover:scale-[1.02] md:rounded-2xl">
                <img
                  src={portraitAsset.url}
                  alt="Ірина Рудика — Інґіґерда"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mb-5 hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-accent md:flex">
            Вірші · Пісні · Проза
          </p>
          <h1 className="hidden font-display text-[2.7rem] font-medium leading-[1.02] md:block md:text-7xl">
            <span className="text-accent">ІНҐІҐЕРДА</span>
          </h1>
          <div className="gold-line my-6 hidden w-20 md:block" />
          <div className="space-y-5 text-lg leading-relaxed text-foreground/85 md:mt-0">
            <p>
              Авторка віршів, поем, казок, оповідань для дітей та дорослих, засновниця мистецького проєкту «Літературні забави», співзасновниця фестивалю «Поверхи», фахівчиня у сфері неформальної освіти, амбасадорка концепції Life Long Learning в Україні.
            </p>
            <p>
              Авторка дитячої книжки «Смачненька абетка» (2023), єдиної художньої книги в Україні, надрукованої шрифтом Рутенія, та артбуку «Уламки» (2024). Одна з перекладачок із кримськотатарської на українську збірки «Qırım öz tüsüni alır / Поверне собі колір Крим» (2024). Співавторка багатьох поетичних збірників та альманахів (ЙБН БЛД РСН, Цвях, 100 секунд).
            </p>
            <p className="italic">
              «Усе, чим я займаюся — культура, мистецтво, освіта, громадська діяльність, — насправді має велике значення. А зараз — особливо. Мені вкрай важливо розвивати всі напрями своєї діяльності та, за можливості, поєднувати їх. Велике щастя — навчати через творчість і водночас творити, навчаючи».
            </p>
          </div>

          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="group bg-accent text-accent-foreground transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-xl"
            >
              <Link to="/books">
                До книг
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
