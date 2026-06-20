import { createFileRoute } from "@tanstack/react-router";
import { Send, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { SocialList } from "@/components/site/SocialList";
import { authorSocials, litZabavySocials } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Контакти — Інґіґерда (Ірина Рудика)" },
      {
        name: "description",
        content:
          "Контакти Інґіґерди: Telegram @ingi_gerda, соціальні мережі авторки та проєкту «Літературні забави».",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionLabel>Зв'язок</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl">Напишіть мені</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Замовлення книг, запрошення на події, співпраця, відгуки — я відповідаю особисто.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Reveal delay={50}>
            <a
              href="https://t.me/ingi_gerda"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-all group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                <Send className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-2xl">Telegram</h3>
              <p className="mt-1 text-accent">@ingi_gerda</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Найшвидший спосіб зв'язатися особисто з авторкою.
              </p>
            </a>
          </Reveal>

          <Reveal delay={150}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <MapPin className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-2xl">Місто</h3>
              <p className="mt-1 text-accent">Київ, Україна</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Доставка книг — Новою поштою по всій Україні.
              </p>
            </div>
          </Reveal>

          <Reveal delay={250}>
            <a
              href="https://www.instagram.com/ingi.gerda/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-all group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                <Mail className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-2xl">Direct в Instagram</h3>
              <p className="mt-1 text-accent">@ingi.gerda</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Пишіть у Direct — авторка обов'язково побачить ваше повідомлення.
              </p>
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="font-display text-2xl">Соцмережі авторки</h2>
            <div className="mt-4">
              <SocialList items={authorSocials} />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-display text-2xl">«Літературні забави»</h2>
            <div className="mt-4">
              <SocialList items={litZabavySocials} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
