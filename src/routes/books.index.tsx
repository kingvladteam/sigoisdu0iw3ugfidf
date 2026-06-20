import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { books } from "@/lib/site-data";

export const Route = createFileRoute("/books/")({
  head: () => ({
    meta: [
      { title: "Книги — Інґіґерда | Магазин" },
      {
        name: "description",
        content:
          "Книги Інґіґерди: «Уламки», «Смачненька абетка», ілюстровані картки. Замовлення з доставкою Новою поштою по Україні.",
      },
    ],
  }),
  component: BooksIndex,
});

function BooksIndex() {
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionLabel>Магазин</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl">Усі книги</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Кожна книга — це окрема історія, яку можна тримати в руках. Замовлення приймаються
            особисто авторкою; з вами зв'яжеться лише Інґіґерда у Telegram <a href="https://t.me/ingi_gerda" className="text-accent hover:underline" target="_blank" rel="noopener noreferrer">@ingi_gerda</a>.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {books.map((book, i) => (
            <Reveal key={book.slug} delay={i * 120}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-2xl">
                <Link
                  to="/books/$slug"
                  params={{ slug: book.slug }}
                  className="aspect-[3/4] overflow-hidden bg-muted"
                >
                  <img
                    src={book.cover}
                    alt={`Обкладинка «${book.title}»`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {book.audience}
                  </p>
                  <h2 className="mt-1 font-display text-2xl transition-colors group-hover:text-accent">
                    <Link to="/books/$slug" params={{ slug: book.slug }}>
                      {book.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-accent">{book.price}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {book.short}
                  </p>
                  <Link
                    to="/books/$slug"
                    params={{ slug: book.slug }}
                    className="mt-6 inline-flex items-center text-sm font-medium text-accent"
                  >
                    Детальніше та замовити
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
