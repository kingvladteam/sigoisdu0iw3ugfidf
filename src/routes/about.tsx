import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
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
      {"property": "og:title", "content": "Про мене — Інґіґерда (Ірина Рудика)"},
      {"property": "og:description", "content": "Біографія Інґіґерди (Ірини Рудики) — української поетеси, авторки книг «Уламки» та «Смачненька абетка», засновниці проєкту «Літературні забави»."},
      {"property": "og:type", "content": "website"},
      {"name": "twitter:card", "content": "summary_large_image"},
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-5 text-center text-xs font-medium uppercase tracking-[0.32em] text-accent md:text-left">
          Вірші · Пісні · Проза
        </p>
        <h1 className="hero-title mb-4 text-center font-display text-[2.4rem] font-medium leading-[1.02] text-accent md:text-left md:text-7xl">
          ІНҐІҐЕРДА
        </h1>
        <div className="gold-line mx-auto mb-10 block w-20 md:mx-0" />

        <Reveal>
          <article className="relative">
            <figure className="relative mx-auto mb-8 w-full max-w-[20rem] md:float-left md:mb-6 md:mr-10 md:w-[42%] md:max-w-none">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/15 blur-2xl" />
              <div className="overflow-hidden rounded-[1.4rem] border border-border shadow-2xl transition-transform duration-700 hover:scale-[1.02] md:rounded-2xl">
                <img
                  src={portraitAsset.url}
                  alt="Ірина Рудика — Інґіґерда"
                  className="portrait-breathe aspect-[3/4] w-full object-cover"
                />
              </div>
            </figure>

            <div className="text-base leading-[1.85] text-foreground/85 md:text-lg">
              <p className="mb-6 first-letter:float-left first-letter:mr-3 first-letter:mt-[-0.1em] first-letter:font-display first-letter:text-[4.5rem] first-letter:font-medium first-letter:leading-[0.85] first-letter:text-accent">
                Полісся — історико-етнографічний та природно-географічний регіон України, де я народилася й провела свої перші вісімнадцять років життя. Саме цей край великих лісів, невичерпних боліт та заплав загартував у мені сміливість та дух свободи. Саме він виплекав любов до природи, родини, традицій, діалектів, ремесел та регіональної культури загалом — любов, що згодом втілилася на сторінки не однієї моєї книжки.
              </p>
              <p className="mb-6">
                Свій перший вірш я написала у 10–11 років і присвятила найріднішій:
              </p>
              <blockquote className="my-8 rounded-2xl border border-accent/30 bg-accent/[0.06] p-6 text-center font-display text-lg italic leading-relaxed text-foreground md:my-10 md:p-8 md:text-xl">
                «Дорога моя мамуся,<br />
                знай, за тебе я молюся…»
                <span className="mt-3 block font-sans text-sm not-italic text-muted-foreground">
                  Він був виведений фломастером на саморобній хустці, яку я нишком відрізала від нового білосніжного простирадла.
                </span>
              </blockquote>
              <p className="mb-6">
                У студентські роки я була редакторкою та авторкою статей газети «Мед.уха», з якою ми посіли ІІ місце у 2000 році серед студентських видань області. А далі були довгі роки писання «у шухляду». Тоді я щиро вірила у давні стереотипи: «усі письменники мертві», «літературою грошей на життя не заробиш» і «це нікому не потрібно». Допоки на початку 2010-х не зважилася показати світу через ФБ свої підліткові поезії. Була критика, був конструктив, були поради, перші підтримки та пропозиції, а головне — люди, які згодом відіграли важливу роль у моєму творчому становленні.
              </p>
              <p className="mb-6">
                Я не знала як і не знала коли, але мала непохитну внутрішню переконаність: я зроблю для української культури щось важливе — те, що збагатить її, збереже й утримає. Ця віра стала тим фундаментом, на який я спираюся й досі та вибудовую своє «творче Я».
              </p>
              <p className="mb-6">
                Сьогодні я — письменниця та фахівчиня у сфері неформальної освіти. Працюю з розвитком людського капіталу, створюю навчальні курси, щодня маю справу з текстами та людьми. Саме це поєднання, помножене на медичну та управлінську освіти, дає мені широку експертність, яка має реальну вагу та вплив.
              </p>
              <p className="mb-6">
                Я створюю книжки різних жанрів, стилів і форматів. Сприймаю кожне видання як цілісний проєкт, який потрібно грамотно спланувати, втілити в життя й донести до читача. Я достеменно знаю, наскільки це складно. Але так само знаю: це абсолютно можливо!
              </p>
            </div>

            <div className="clear-both mt-10 flex justify-center md:justify-start">
              <Button
                asChild
                size="lg"
                className="cta-shimmer group bg-accent text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-xl"
              >
                <Link to="/books">
                  <BookOpen className="mr-2 h-4 w-4" />
                  До книг
                </Link>
              </Button>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
