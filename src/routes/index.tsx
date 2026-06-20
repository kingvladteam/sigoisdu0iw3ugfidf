import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast, Toaster } from "sonner";

import { sendOrder } from "@/lib/order.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import portraitAsset from "@/assets/portrait.jpg.asset.json";
import logoAsset from "@/assets/logo.jpg.asset.json";
import ulamkyAsset from "@/assets/ulamky.jpg.asset.json";
import abetkaAsset from "@/assets/abetka.jpg.asset.json";
import abetka2Asset from "@/assets/abetka2.jpg.asset.json";
import abetkaKartkyAsset from "@/assets/abetka_kartky.jpg.asset.json";
import kartky2Asset from "@/assets/kartky2.jpg.asset.json";
import kartky3Asset from "@/assets/kartky3.jpg.asset.json";
import kartky4Asset from "@/assets/kartky4.jpg.asset.json";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const books = [
  {
    id: "ulamky",
    title: "Уламки",
    price: "450 грн",
    cover: ulamkyAsset.url,
    description:
      "Збірка для дорослих про втрати, травму та жіночий досвід в умовах повномасштабної війни. Поезія, що тримає за руку.",
  },
  {
    id: "abetka",
    title: "Смачненька абетка",
    price: "400 грн",
    cover: abetkaAsset.url,
    description:
      "Дитяча книжка-абетка, виконана шрифтом «Рутенія». Літературна гра, ритм і смак рідної мови — для маленьких і дорослих читачів.",
  },
  {
    id: "abetka-kartky",
    title: "Смачненька абетка — картки",
    price: "350 грн",
    cover: abetkaKartkyAsset.url,
    description:
      "Колекційні ілюстровані картки до «Смачненької абетки» — для ігор, читання та родинних вечорів за столом.",
  },
];

const navLinks = [
  { href: "#about", label: "Про мене" },
  { href: "#projects", label: "Проєкти" },
  { href: "#books", label: "Книги" },
  { href: "#order", label: "Замовити" },
];

function HomePage() {
  return (
    <div className="paper-bg min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />
      <Header />
      <Hero />
      <About />
      <Projects />
      <Books />
      <OrderSection />
      <Footer />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Логотип Інґіґерди" className="h-10 w-10 object-contain" />
          <span className="font-display text-xl tracking-wide">Інґіґерда</span>
        </a>
        <nav className="hidden gap-8 text-sm md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-foreground/80 transition-colors hover:text-accent"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden text-sm text-foreground/80"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          {open ? "Закрити" : "Меню"}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border/60 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 text-sm">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-foreground/80 hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
        <div>
          <p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent">
            <span className="h-px w-10 bg-accent" />
            Поетеса · Прозаїк · Авторка
          </p>
          <h1 className="font-display text-5xl leading-[1.05] md:text-7xl">
            Слово, що тримає
            <span className="italic text-accent"> за руку</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Вітаю. Я Інґіґерда — творчий псевдонім Ірини Рудики. Пишу для дітей і дорослих,
            засновую простір, де українська література звучить уголос.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="#books">Переглянути книги</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent/10">
              <a href="#projects">Літературні забави</a>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-accent/10 blur-2xl" />
          <div className="overflow-hidden rounded-[1.5rem] border border-border shadow-2xl">
            <img
              src={portraitAsset.url}
              alt="Портрет Інґіґерди — Ірини Рудики"
              className="aspect-[3/4] w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-lg border border-border bg-card px-5 py-3 shadow-lg md:block">
            <p className="font-display text-lg italic">«…а слово — як свіча у долонях.»</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <SectionLabel>Про мене</SectionLabel>
        <h2 className="font-display text-4xl md:text-5xl">Ірина Рудика — Інґіґерда</h2>
        <div className="gold-line my-8 w-24" />
        <div className="space-y-6 text-lg leading-relaxed text-foreground/85">
          <p>
            Українська поетеса і прозаїк, авторка дитячої та дорослої літератури, засновниця
            культурного проєкту <em>«Літературні забави»</em>. Творчий шлях розпочала з поезії для
            дітей і дорослих, а згодом звернулася до написання книжок.
          </p>
          <p>
            У збірці <strong>«Уламки»</strong> звертаюся до тем втрат, травми та жіночого досвіду в
            умовах повномасштабної російсько-української війни. Для дітей створила{" "}
            <strong>«Смачненьку абетку»</strong> — поєднання літературної гри, алфавітної структури
            та поетичного викладу, виконане авторським шрифтом «Рутенія».
          </p>
          <p>
            Походжу з Костополя на Рівненщині, наразі мешкаю в Києві. Маю дві освіти — медичну та
            економічну. Працюю з дітьми від шести років, викладаю курси розвитку «м’яких» навичок
            та емоційного інтелекту.
          </p>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionLabel>Проєкти</SectionLabel>
        <h2 className="font-display text-4xl md:text-5xl">Літературна діяльність</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Поезія, проза, дитячі книжки, освітні курси та культурні події — усе те, що допомагає
          українському слову звучати.
        </p>

        {/* Featured: Літературні забави */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card to-card shadow-xl">
          <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
            <div className="p-10 md:p-14">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-accent">
                Авторський проєкт
              </p>
              <h3 className="font-display text-4xl md:text-5xl">Літературні забави</h3>
              <div className="gold-line my-6 w-20" />
              <p className="text-lg leading-relaxed text-foreground/85">
                Мистецький проєкт, заснований у листопаді 2021 року. Майданчик зустрічі творчого
                авангарду України — тих, хто творить сучасну літературу, музику, театр, кіно,
                живопис, і тих, хто ними цікавиться.
              </p>
              <ul className="mt-6 grid gap-3 text-foreground/80 sm:grid-cols-2">
                <li>📖 Щотижневі авторські вечори</li>
                <li>🎙️ Відкритий мікрофон</li>
                <li>🎭 Перформанси та презентації</li>
                <li>📺 Прямі трансляції</li>
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                Понад <strong className="text-foreground">150 українських авторів</strong> уже
                звучали на сцені проєкту.
              </p>
            </div>
            <div className="relative min-h-[260px] bg-primary/90 p-10 text-primary-foreground md:p-14">
              <p className="font-display text-2xl italic leading-snug">
                «Зробити літературні вечори такими ж регулярними, як ритм самого міста.»
              </p>
              <p className="mt-6 text-sm opacity-70">— Інґіґерда, засновниця проєкту</p>
              <div className="mt-10 flex flex-wrap gap-3 text-xs uppercase tracking-widest opacity-80">
                <span className="rounded-full border border-primary-foreground/30 px-3 py-1">Київ</span>
                <span className="rounded-full border border-primary-foreground/30 px-3 py-1">з 2021</span>
                <span className="rounded-full border border-primary-foreground/30 px-3 py-1">щотижня</span>
              </div>
            </div>
          </div>
        </div>

        {/* Other activities */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Поезія для дітей і дорослих",
              text: "Вірші, що поєднують доброзичливий гумор, ритм і мовну образність.",
            },
            {
              title: "Освітні курси",
              text: "Робота з дітьми та школярами: розвиток «м’яких» навичок і емоційного інтелекту.",
            },
            {
              title: "Авторські презентації",
              text: "Зустрічі з читачами, читання нових текстів, інтерактивні літературні заходи.",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/60"
            >
              <h4 className="font-display text-2xl">{p.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
            </div>
          ))}
        </div>

        {/* Gallery */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[kartky2Asset, kartky3Asset, kartky4Asset].map((a, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border">
              <img
                src={a.url}
                alt="Картки до «Смачненької абетки»"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Books() {
  return (
    <section id="books" className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionLabel>Мої книги</SectionLabel>
        <h2 className="font-display text-4xl md:text-5xl">Бібліотека</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Поезія для дорослих та ілюстровані видання для дітей. Кожна книга — окрема історія, яку
          можна тримати в руках.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {books.map((book) => (
            <article
              key={book.id}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-xl"
            >
              <div className="aspect-[3/4] overflow-hidden bg-muted">
                <img
                  src={book.cover}
                  alt={`Обкладинка книги «${book.title}»`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl">{book.title}</h3>
                <p className="mt-1 text-sm text-accent">{book.price}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {book.description}
                </p>
                <Button
                  asChild
                  className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <a href={`#order?book=${encodeURIComponent(book.title)}`} onClick={() => prefillBook(book.title)}>
                    Замовити
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function prefillBook(title: string) {
  if (typeof window === "undefined") return;
  setTimeout(() => {
    const el = document.getElementById("order-book-trigger");
    el?.setAttribute("data-prefill", title);
    window.dispatchEvent(new CustomEvent("prefill-book", { detail: title }));
  }, 50);
}

function OrderSection() {
  const sendOrderFn = useServerFn(sendOrder);
  const [book, setBook] = useState<string>("");
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setBook(detail);
    };
    window.addEventListener("prefill-book", handler);
    return () => window.removeEventListener("prefill-book", handler);
  }, []);

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      telegram: string;
      book: string;
      comment: string;
    }) => sendOrderFn({ data }),
    onSuccess: () => {
      toast.success("Дякую! Замовлення надіслано. Я зв’яжуся з вами найближчим часом.");
      setBook("");
      setFormKey((k) => k + 1);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Сталася помилка. Спробуйте ще раз.");
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      telegram: String(fd.get("telegram") || "").trim(),
      book: book || String(fd.get("book") || "").trim(),
      comment: String(fd.get("comment") || "").trim(),
    };
    if (!data.name || !data.phone || !data.book) {
      toast.error("Будь ласка, заповніть ім'я, телефон та оберіть книгу.");
      return;
    }
    mutation.mutate(data);
  }

  return (
    <section id="order" className="border-t border-border/60">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionLabel>Замовлення</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl">Замовити книгу</h2>
          <div className="gold-line my-6 w-20" />
          <p className="text-lg leading-relaxed text-muted-foreground">
            Заповніть форму — і я особисто зв’яжуся з вами у Telegram або телефоном, щоб
            підтвердити деталі замовлення та доставки.
          </p>
          <div className="mt-8 space-y-3 text-sm text-foreground/80">
            <p>📦 Надсилаю Новою поштою по Україні</p>
            <p>✍️ Можу підписати книгу з персональним побажанням</p>
            <p>💬 Відповідаю особисто, без ботів</p>
          </div>
        </div>

        <form
          key={formKey}
          onSubmit={onSubmit}
          className="rounded-2xl border border-border bg-card p-8 shadow-lg"
        >
          <div className="grid gap-5">
            <Field label="Ім'я" required>
              <Input name="name" required maxLength={100} placeholder="Ваше ім’я" />
            </Field>
            <Field label="Номер телефону" required>
              <Input
                name="phone"
                type="tel"
                required
                maxLength={40}
                placeholder="+380 __ ___ __ __"
              />
            </Field>
            <Field label="Telegram нікнейм">
              <Input name="telegram" maxLength={80} placeholder="@username" />
            </Field>
            <Field label="Книга для замовлення" required>
              <Select value={book} onValueChange={setBook}>
                <SelectTrigger id="order-book-trigger">
                  <SelectValue placeholder="Оберіть книгу" />
                </SelectTrigger>
                <SelectContent>
                  {books.map((b) => (
                    <SelectItem key={b.id} value={b.title}>
                      {b.title} — {b.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Коментар">
              <Textarea
                name="comment"
                maxLength={1000}
                rows={4}
                placeholder="Кількість, місто доставки, побажання щодо підпису…"
              />
            </Field>
            <Button
              type="submit"
              size="lg"
              disabled={mutation.isPending}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {mutation.isPending ? "Надсилаю…" : "Надіслати замовлення"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Натискаючи кнопку, ви погоджуєтесь на обробку контактних даних виключно для зв’язку
              щодо замовлення.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-sm">
        {label} {required && <span className="text-accent">*</span>}
      </Label>
      {children}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row">
        <div className="flex items-center gap-3">
          <img src={logoAsset.url} alt="" className="h-8 w-8 object-contain opacity-80" />
          <span className="font-display text-base text-foreground">Інґіґерда</span>
        </div>
        <p className="text-center md:text-right">
          © {new Date().getFullYear()} Ірина Рудика. Усі права захищено.
        </p>
      </div>
    </footer>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent">
      <span className="h-px w-10 bg-accent" />
      {children}
    </p>
  );
}

// Tiny safe event listener hook (declared after to keep file tidy)
import { useEffect as _useEffect } from "react";
function useStableEvent(name: string, handler: (e: Event) => void) {
  _useEffect(() => {
    window.addEventListener(name, handler);
    return () => window.removeEventListener(name, handler);
  }, [name, handler]);
}
