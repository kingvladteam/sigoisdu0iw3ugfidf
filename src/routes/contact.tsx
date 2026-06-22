import { createFileRoute } from "@tanstack/react-router";
import { Send, Instagram, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { SocialList } from "@/components/site/SocialList";
import { authorSocials } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Контакти — Інґіґерда" },
      {
        name: "description",
        content:
          "Контакти Інґіґерди: Telegram @ingi_gerda, Instagram, Facebook, YouTube. Замовлення книг та запрошення на події.",
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
          <h1 className="font-display text-4xl font-medium md:text-5xl">Напишіть мені</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Замовлення книг, запрошення на події, співпраця, відгуки — я відповідаю особисто.
            Авторка пише <strong className="text-foreground">лише</strong> з акаунта{" "}
            <a
              href="https://t.me/ingi_gerda"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              @ingi_gerda
            </a>{" "}
            у Telegram — остерігайтесь фейків.
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
              <h3 className="mt-4 font-display text-xl font-semibold">Telegram</h3>
              <p className="mt-1 text-accent">@ingi_gerda</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Найшвидший спосіб зв'язатися особисто з авторкою.
              </p>
            </a>
          </Reveal>

          <Reveal delay={150}>
            <a
              href="https://www.instagram.com/ingi.gerda/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent transition-all group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                <Instagram className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">Instagram</h3>
              <p className="mt-1 text-accent">@ingi.gerda</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Пишіть у Direct — авторка обов'язково побачить ваше повідомлення.
              </p>
            </a>
          </Reveal>

          <Reveal delay={250}>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <MapPin className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">Місто</h3>
              <p className="mt-1 text-accent">Київ, Україна</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Доставка книг — Новою поштою по всій Україні.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">Соцмережі авторки</h2>
            <div className="mt-4 max-w-2xl">
              <SocialList items={authorSocials} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
