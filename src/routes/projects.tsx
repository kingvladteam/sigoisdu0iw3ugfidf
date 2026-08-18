import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Users, Mic, Radio, Camera, ArrowRight } from "lucide-react";
import litzabavyLogo from "@/assets/litzabavy-logo.png.asset.json";
import guestAsset from "@/assets/litzabavy-guest.jpg.asset.json";
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
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

const gallery = [
  "/assets/486817007_691852213401373_296432124746994568_n.jpg",
  "/assets/488829945_698036452782949_7168266759990156554_n.jpg",
  "/assets/489352595_697304102856184_1349133379748830177_n.jpg",
  "/assets/493315189_708947015025226_6038730476710511537_n.jpg",
  "/assets/495609377_748713791048548_1910221479210680523_n.jpg",
  "/assets/499943717_733446959241898_5740493480507552383_n (1).jpg",
  "/assets/500827205_743787414874519_1981716460687409192_n.jpg",
  "/assets/504380547_758428213410439_1254208685395971457_n.jpg",
  "/assets/504731705_748712407715353_7147568119478088782_n.jpg",
  "/assets/510408851_753104807276113_1738187860518985524_n.jpg",
  "/assets/514338154_790998430153417_5644026024250343761_n.jpg",
  "/assets/514697123_758428950077032_463180905527212116_n.jpg",
  "/assets/516536881_765969285989665_4177655354791834041_n.jpg",
  "/assets/519593031_775955208324406_7171429067958635046_n.jpg",
  "/assets/520540726_775956934990900_1833920436204375942_n.jpg",
  "/assets/527344701_787640123822581_3146295510343946940_n.jpg",
  "/assets/527682942_787640370489223_3917593101206357852_n.jpg",
  "/assets/527787195_786037770649483_9061014392916450102_n.jpg",
  "/assets/529302234_790998960153364_5471970983654173194_n.jpg",
  "/assets/530222273_791000430153217_2217992875194962752_n.jpg",
  "/assets/583662912_873041771949082_4762296622215703332_n.jpg",
  "/assets/592289730_884614470791812_5188835102636312165_n.jpg",
  "/assets/597128003_888324727087453_2384513934759524764_n.jpg",
  "/assets/603840698_898842179369041_1967333932266924910_n.jpg",
  "/assets/604646007_898841769369082_5883411525841281357_n.jpg",
  "/assets/637469478_942370775016181_4120697699960109994_n.jpg",
  "/assets/637471863_943394834913775_4386056255203841406_n.jpg",
  "/assets/641602007_950842764168982_1834186317891941390_n.jpg",
  "/assets/641631021_950842687502323_680382432372759648_n.jpg",
  "/assets/645849557_954350370484888_6346556462941501488_n.jpg",
  "/assets/646380488_955102707076321_3158352813307871113_n.jpg",
  "/assets/721082974_1035515082368416_6244616811348954032_n.jpg",
  "/assets/724197363_1040819461837978_1937652240498183410_n.jpg",
];

const formats = [
  { icon: Mic, t: "Мистецькі імпрези", d: "Ми організовуємо: авторські та творчі вечори, презентації книг, концерти, перформанси" },
  { icon: Camera, t: "Фотосети", d: "Усі події супроводжує професійний фотограф" },
  { icon: Radio, t: "Прямі трансляції", d: "Кожен захід доступний онлайн у Facebook" },
  { icon: Users, t: "Відкритий мікрофон", d: "Можливість прочитати свої тексти перед живою аудиторією." },
];

function ProjectsPage() {
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
  const visibleGallery = isGalleryExpanded ? gallery : gallery.slice(0, 6);

  return (
    <>
      <section className="border-t border-border/60 bg-gradient-to-br from-[#2767d1]/10 via-background to-card">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-[1.2fr_1fr] md:gap-12 md:px-6 md:py-20">
          <Reveal className="order-2 md:order-1">
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
            <div className="mt-8 flex flex-wrap gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="group bg-accent text-accent-foreground transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-xl"
                  >
                    Як стати відвідувачем заходу
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Як стати відвідувачем заходу</DialogTitle>
                    <DialogDescription className="space-y-4 pt-2 text-left">
                      <p>
                        Усі події відбуваються наживо за адресою:{" "}
                        <a
                          href="https://maps.app.goo.gl/kAwe46u64NqvXHFs5"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent/80"
                        >
                          м. Київ, Нижній Вал, 23, 3 пов., «Вільний принт»
                        </a>
                        . Проте можна стати онлайн відвідувачем, приєднавшись до прямої
                        трансляції у Facebook.
                      </p>
                      <a
                        href="https://www.facebook.com/literaturni.zabavy/upcoming_hosted_events"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent/80"
                      >
                        Обирайте подію і чекаємо вас у гості!
                      </a>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="group bg-accent text-accent-foreground transition-all duration-300 hover:scale-105 hover:bg-accent/90 hover:shadow-xl"
                  >
                    Як стати героєм проєкту
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Як стати героєм проєкту</DialogTitle>
                    <DialogDescription className="pt-2 text-left">
                      Якщо ви автор / авторка, представник / представниця будь-якого виду мистецтва,
                      просто напишіть у соцмережах або відвідайте захід і особисто поговоріть про це
                      з організаторами.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Reveal>
          <Reveal delay={120} className="order-first md:order-2">
            <div className="relative mx-auto w-full max-w-[11rem] md:max-w-none">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-[#2767d1] blur-3xl opacity-30" />
              <div className="overflow-hidden rounded-full border border-border bg-[#2767d1] shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
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
      <div className="relative">
        <div className="absolute -inset-5 -z-10 rounded-[2.2rem] bg-accent/15 blur-2xl" />
        <div className="overflow-hidden rounded-[1.6rem] border border-border shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
          <img
            src={guestAsset.url}
            alt="Вручення значка та брендованого записника учаснику «Літературних забав»"
            className="aspect-[4/5] w-full object-cover object-[50%_30%]"
            loading="lazy"
          />
        </div>
      </div>
    </Reveal>
    <Reveal delay={120}>
      <h2 className="font-display text-2xl font-medium leading-tight text-accent md:text-4xl">
        Наша подяка учасникам
      </h2>
      <div className="gold-line my-6 w-20" />
      <p className="text-lg leading-relaxed text-foreground/85">
        Кожен автор, який став героєм «Літературних забав», отримує пам'ятний значок —
        символ належності до спільноти, що творить сучасну українську літературу, та брендований записник. 
      </p>
      <p className="mt-3 text-muted-foreground">
        Це наш маленький знак вдячності кожному з них.
      </p>
    </Reveal>
  </div>
</section>

      {gallery.length > 0 && (
        <section className="border-t border-border/60 bg-card/40">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <Reveal>
              <h2 className="font-display text-2xl font-medium leading-tight text-accent md:text-4xl">
                Галерея
              </h2>
              <div className="gold-line my-6 w-20" />
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleGallery.map((src, i) => (
                <Reveal key={src} delay={i * 70}>
                  <div className="group overflow-hidden rounded-xl border border-border bg-card">
                    <img
                      src={src}
                      alt="Літературні забави — момент"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </Reveal>
              ))}
            </div>

            {gallery.length > 6 && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsGalleryExpanded((prev) => !prev)}
                  className="inline-flex items-center justify-center rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {isGalleryExpanded ? "Сховати" : "Показати ще фото"}
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
