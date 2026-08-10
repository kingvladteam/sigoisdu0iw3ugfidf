import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, Check } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Button } from "@/components/ui/button";
import { useBooks } from "@/lib/books-db";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/books/")({
  head: () => ({
    meta: [
      { title: "Книги — Інґіґерда | Магазин" },
      {
        name: "description",
        content:
          "Книги Інґіґерди: «Уламки», «Смачненька абетка», ілюстровані картки. Додавайте у кошик та замовляйте декілька книг одразу.",
      },
    ],
  }),
  component: BooksIndex,
});

function BooksIndex() {
  const { add, items } = useCart();

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <SectionLabel>Магазин</SectionLabel>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-4xl font-medium md:text-5xl">Усі книги</h1>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Додавайте у кошик одразу декілька книг — замовите все одним повідомленням.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10"
            >
              <Link to="/cart">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Кошик
              </Link>
            </Button>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((book, i) => {
            const inCart = items.some((it) => it.slug === book.slug);
            return (
              <Reveal key={book.slug} delay={i * 100}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-accent/60 hover:shadow-2xl">
                  <Link
                    to="/books/$slug"
                    params={{ slug: book.slug }}
                    className="relative aspect-[3/4] overflow-hidden bg-muted"
                  >
                    <img
                      src={book.cover}
                      alt={`Обкладинка «${book.title}»`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-display text-xl font-semibold transition-colors group-hover:text-accent">
                      <Link to="/books/$slug" params={{ slug: book.slug }}>
                        {book.title}
                      </Link>
                    </h2>
                    <p className="mt-1 font-display text-lg text-accent">{book.price}</p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {book.short}
                    </p>
                    <div className="mt-5 flex items-center gap-2">
                      <Button
                        onClick={() => {
                          add(book);
                          toast.success(`«${book.title}» додано в кошик`);
                        }}
                        className="flex-1 bg-accent text-accent-foreground transition-all hover:scale-[1.02] hover:bg-accent/90"
                      >
                        {inCart ? (
                          <>
                            <Check className="mr-1.5 h-4 w-4" /> Ще одну
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="mr-1.5 h-4 w-4" /> У кошик
                          </>
                        )}
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="icon"
                        className="border-border text-foreground/70 hover:border-accent hover:text-accent"
                      >
                        <Link to="/books/$slug" params={{ slug: book.slug }} aria-label="Детальніше">
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
