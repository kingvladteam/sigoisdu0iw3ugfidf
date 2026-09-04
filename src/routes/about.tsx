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
            <h1 className="hero-title mb-4 block text-center font-display text-[2.4rem] font-medium leading-[1.02] text-accent md:hidden">
              ІНҐІҐЕРДА
            </h1>
            <div className="gold-line mx-auto mb-5 block w-20 md:hidden" />
            <div className="relative mx-auto w-full max-w-[18rem] md:max-w-none">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-accent/15 blur-2xl" />
              <div className="overflow-hidden rounded-[1.4rem] border border-border shadow-2xl transition-transform duration-700 hover:scale-[1.02] md:rounded-2xl">
                <img
                  src={portraitAsset.url}
                  alt="Ірина Рудика — Інґіґерда"
                  className="portrait-breathe aspect-[3/4] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mb-5 hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.32em] text-accent md:flex">
            Вірші · Пісні · Проза
          </p>
          <h1 className="hero-title hidden font-display text-[2.7rem] font-medium leading-[1.02] md:block md:text-7xl">
            <span className="text-accent">ІНҐІҐЕРДА</span>
          </h1>
          <div className="gold-line my-6 hidden w-20 md:block" />
          <div className="space-y-6 text-base leading-[1.75] text-foreground/85 md:text-lg">
            <p>
              Полісся — історико-етнографічний та природно-географічний регіон України, де я народилася й провела свої перші вісімнадцять років життя. Саме цей край великих лісів, невичерпних боліт та заплав загартував у мені сміливість та дух свободи. Саме він виплекав любов до природи, родини, традицій, діалектів, ремесел та регіональної культури загалом — любов, що згодом втілилася на сторінки не однієї моєї книжки.
            </p>
            <p>
              Свій перший вірш я написала у 10–11 років і присвятила найріднішій:
            </p>
            <blockquote className="border-l-2 border-accent pl-5 font-display text-lg italic leading-relaxed text-foreground md:text-xl">
              «Дорога моя мамуся,<br />
              знай, за тебе я молюся…»
              <span className="mt-2 block font-sans text-sm not-italic text-muted-foreground">
                Він був виведений фломастером на саморобній хустці, яку я нишком відрізала від нового білосніжного простирадла.
              </span>
            </blockquote>
            <p>
              У студентські роки я була редакторкою та авторкою статей газети «Мед.уха», з якою ми посіли ІІ місце у 2000 році серед студентських видань області. А далі були довгі роки писання «у шухляду». Тоді я щиро вірила у давні стереотипи: «усі письменники мертві», «літературою грошей на життя не заробиш» і «це нікому не потрібно». Допоки на початку 2010-х не зважилася показати світу через ФБ свої підліткові поезії. Була критика, був конструктив, були поради, перші підтримки та пропозиції, а головне — люди, які згодом відіграли важливу роль у моєму творчому становленні.
            </p>
            <p>
              Я не знала як і не знала коли, але мала непохитну внутрішню переконаність: я зроблю для української культури щось важливе — те, що збагатить її, збереже й утримає. Ця віра стала тим фундаментом, на який я спираюся й досі та вибудовую своє «творче Я».
            </p>
            <p>
              Сьогодні я — письменниця та фахівчиня у сфері неформальної освіти. Працюю з розвитком людського капіталу, створюю навчальні курси, щодня маю справу з текстами та людьми. Саме це поєднання, помножене на медичну та управлінську освіти, дає мені широку експертність, яка має реальну вагу та вплив.
            </p>
            <p>
              Я створюю книжки різних жанрів, стилів і форматів. Сприймаю кожне видання як цілісний проєкт, який потрібно грамотно спланувати, втілити в життя й донести до читача. Я достеменно знаю, наскільки це складно. Але так само знаю: це абсолютно можливо!
            </p>
          </div>

          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="cta-shimmer group bg-accent text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-xl"
            >
              <Link to="/books">
                <BookOpen className="mr-2 h-4 w-4" />
                Придбати книги
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
