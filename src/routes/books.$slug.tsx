import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ShoppingBag, Expand, X } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { getBook, books } from "@/lib/site-data";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/books/$slug")({
  loader: ({ params }) => {
    return { book: getBook(params.slug) ?? null, slug: params.slug };
  },
  head: ({ loaderData }) => {
    const b = loaderData?.book;
    if (!b) return { meta: [{ title: "Книга — Інґіґерда" }] };
    return {
      meta: [
        { title: `${b.title} — книга Інґіґерди | Замовити` },
        { name: "description", content: b.short },
        { property: "og:title", content: `${b.title} — Інґіґерда` },
        { property: "og:description", content: b.short },
        { property: "og:image", content: b.cover },
        { property: "og:type", content: "book" },
      ],
    };
  },
  component: BookPage,
});

function BookPage() {
  const { book: staticBook, slug } = Route.useLoaderData();
  const { books: allBooks, isLoading } = useBooks();
  const book = allBooks.find((b) => b.slug === slug) ?? staticBook;
  const { add, items } = useCart();
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!book) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center text-muted-foreground">
        {isLoading ? "Завантаження…" : "Книгу не знайдено."}
      </div>
    );
  }

  const inCart = items.some((i) => i.slug === book.slug);

  const openImage = (idx: number) => setLightbox(idx);


  return (
    <article className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link
          to="/books"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Усі книги
        </Link>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 md:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <button
            type="button"
            onClick={() => openImage(0)}
            className="group relative block w-full overflow-hidden rounded-2xl border border-border shadow-xl"
            aria-label="Відкрити фото на весь екран"
          >
            <img
              src={book.cover}
              alt={`Обкладинка «${book.title}»`}
              className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/85 px-2.5 py-1 text-xs text-foreground/80 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <Expand className="h-3.5 w-3.5" /> Збільшити
            </span>
          </button>
          {book.gallery.length > 1 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {book.gallery.slice(1).map((g: string, i: number) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => openImage(i + 1)}
                  className="group aspect-square overflow-hidden rounded-lg border border-border"
                  aria-label={`Відкрити фото ${i + 2}`}
                >
                  <img
                    src={g}
                    alt={`${book.title} — фото ${i + 2}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </Reveal>


        <Reveal delay={100}>
          <h1 className="font-display text-4xl font-medium md:text-5xl">{book.title}</h1>
          <p className="mt-3 font-display text-3xl text-accent">{book.price}</p>
          {book.pages && (
            <p className="mt-1 text-sm text-muted-foreground">{book.pages}</p>
          )}
          <div className="gold-line my-6 w-20" />
          <div className="space-y-4 text-base leading-relaxed text-foreground/85">
            {book.long.map((p: string, i: number) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {book.excerpt && (
            <blockquote className="mt-6 border-l-2 border-accent pl-4 font-display text-xl italic text-foreground/90">
              {book.excerpt}
            </blockquote>
          )}

          {book.specs && book.specs.length > 0 && (
            <div className="mt-8 rounded-xl border border-border bg-card/60 p-5">
              <h2 className="font-display text-xl font-semibold">Характеристики</h2>
              <dl className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                {book.specs.map((s: { label: string; value: string }) => (
                  <div
                    key={s.label}
                    className="flex items-baseline justify-between gap-3 border-b border-border/50 py-1.5"
                  >
                    <dt className="text-sm text-muted-foreground">{s.label}</dt>
                    <dd className="text-right text-sm font-medium text-foreground">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => {
                add(book);
                toast.success(`«${book.title}» додано в кошик`);
              }}
              className="bg-accent text-accent-foreground transition-all hover:scale-105 hover:bg-accent/90 hover:shadow-lg"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              {inCart ? "Додати ще одну" : "Додати в кошик"}
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-accent text-accent hover:bg-accent/10"
            >
              <Link to="/cart">Перейти до кошика</Link>
            </Button>
          </div>
        </Reveal>
      </div>

      <RelatedBooks currentSlug={book.slug} />

      <Dialog open={lightbox !== null} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent
          className="max-w-[96vw] border-none bg-background/95 p-0 sm:max-w-5xl [&>button]:hidden"
        >
          <DialogTitle className="sr-only">
            {book.title} — фото {lightbox !== null ? lightbox + 1 : ""}
          </DialogTitle>
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Закрити"
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow transition-all hover:scale-110 hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          {lightbox !== null && (
            <img
              src={book.gallery[lightbox] ?? book.cover}
              alt={`${book.title} — фото ${lightbox + 1}`}
              className="mx-auto max-h-[88vh] w-auto rounded-lg object-contain"
            />
          )}
          {book.gallery.length > 1 && (
            <div className="flex justify-center gap-2 p-3">
              {book.gallery.map((g: string, i: number) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className={`h-14 w-14 overflow-hidden rounded-md border transition-all ${
                    i === lightbox
                      ? "border-accent ring-2 ring-accent"
                      : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={g} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </article>
  );
}

function RelatedBooks({ currentSlug }: { currentSlug: string }) {
  const related = books.filter((b) => b.slug !== currentSlug);
  if (related.length === 0) return null;
  return (
    <section className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h3 className="font-display text-2xl font-semibold">Інші книги</h3>
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
                <p className="font-display text-xl font-semibold transition-colors group-hover:text-accent">
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
