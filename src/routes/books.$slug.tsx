import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { OrderForm } from "@/components/site/OrderForm";
import { getBook, books } from "@/lib/site-data";

export const Route = createFileRoute("/books/$slug")({
  loader: ({ params }) => {
    const book = getBook(params.slug);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.book.title} — книга Інґіґерди | Замовити` },
          { name: "description", content: loaderData.book.short },
          { property: "og:title", content: `${loaderData.book.title} — Інґіґерда` },
          { property: "og:description", content: loaderData.book.short },
          { property: "og:image", content: loaderData.book.cover },
          { property: "og:type", content: "book" },
        ]
      : [],
  }),
  component: BookPage,
});

function BookPage() {
  const { book } = Route.useLoaderData();

  return (
    <article className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Link
          to="/books"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Усі книги
        </Link>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 md:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-border shadow-xl">
            <img
              src={book.cover}
              alt={`Обкладинка «${book.title}»`}
              className="aspect-[3/4] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          {book.gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {book.gallery.slice(1).map((g, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-lg border border-border"
                >
                  <img
                    src={g}
                    alt={`${book.title} — фото ${i + 2}`}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal delay={100}>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">{book.audience}</p>
          <h1 className="mt-3 font-display text-4xl md:text-5xl">{book.title}</h1>
          <p className="mt-3 text-2xl text-accent">{book.price}</p>
          {book.pages && (
            <p className="mt-1 text-sm text-muted-foreground">{book.pages}</p>
          )}
          <div className="gold-line my-6 w-20" />
          <div className="space-y-4 text-base leading-relaxed text-foreground/85">
            {book.long.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {book.excerpt && (
            <blockquote className="mt-6 border-l-2 border-accent pl-4 font-display text-xl italic text-foreground/90">
              {book.excerpt}
            </blockquote>
          )}

          <ul className="mt-8 grid gap-2 text-sm text-foreground/85">
            {[
              "Доставка Новою поштою по Україні",
              "Можливий авторський підпис із персональним побажанням",
              "Зв'язок особисто від авторки у Telegram @ingi_gerda",
            ].map((l) => (
              <li key={l} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className="border-t border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent">
              <span className="h-px w-10 bg-accent" /> Замовлення
            </p>
            <h2 className="font-display text-3xl md:text-4xl">
              Замовити «{book.title}»
            </h2>
            <p className="mt-4 text-muted-foreground">
              Заповніть форму — і авторка особисто зв'яжеться з вами у Telegram або телефоном.
              Жодних ботів, лише <strong className="text-foreground">@ingi_gerda</strong>.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <OrderForm defaultBook={book.title} />
          </Reveal>
        </div>
      </div>

      <RelatedBooks currentSlug={book.slug} />
    </article>
  );
}

function RelatedBooks({ currentSlug }: { currentSlug: string }) {
  const related = books.filter((b) => b.slug !== currentSlug);
  if (related.length === 0) return null;
  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h3 className="font-display text-2xl">Інші книги</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {related.map((b) => (
            <Link
              key={b.slug}
              to="/books/$slug"
              params={{ slug: b.slug }}
              className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-lg"
            >
              <img
                src={b.cover}
                alt=""
                className="h-24 w-20 rounded-md object-cover"
                loading="lazy"
              />
              <div className="min-w-0">
                <p className="font-display text-xl transition-colors group-hover:text-accent">
                  {b.title}
                </p>
                <p className="text-sm text-accent">{b.price}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{b.short}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
