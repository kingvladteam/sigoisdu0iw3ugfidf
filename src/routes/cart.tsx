import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { OrderForm } from "@/components/site/OrderForm";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Кошик — Замовлення книг Інґіґерди" },
      {
        name: "description",
        content:
          "Оформлення замовлення книг Інґіґерди з доставкою Новою поштою по Україні.",
      },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, count, total, setQty, remove } = useCart();

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <Link
            to="/books"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Продовжити покупки
          </Link>
          <SectionLabel>Замовлення</SectionLabel>
          <h1 className="font-display text-4xl font-medium md:text-5xl">Ваш кошик</h1>
          {count > 0 && (
            <p className="mt-3 text-muted-foreground">
              {count} {count === 1 ? "книга" : count < 5 ? "книги" : "книг"} на суму{" "}
              <strong className="text-foreground">{total} грн</strong>
            </p>
          )}
        </Reveal>

        {items.length === 0 ? (
          <Reveal>
            <div className="mt-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/40 px-6 py-20 text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/60" />
              <h2 className="mt-6 font-display text-2xl">Кошик порожній</h2>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                Перегляньте книги авторки і додайте їх у кошик — можна замовити декілька
                одразу.
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/books">До книг</Link>
              </Button>
            </div>
          </Reveal>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <ul className="grid gap-4">
                {items.map((item) => (
                  <li
                    key={item.key ?? item.slug}
                    className="flex gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-accent/40 hover:shadow-md"
                  >
                    <Link
                      to="/books/$slug"
                      params={{ slug: item.slug }}
                      className="shrink-0 overflow-hidden rounded-lg"
                    >
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="h-28 w-20 object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col">
                      <Link
                        to="/books/$slug"
                        params={{ slug: item.slug }}
                        className="font-display text-lg font-semibold hover:text-accent"
                      >
                        {item.title}
                      </Link>
                      {item.variant && (
                        <p className="text-xs text-muted-foreground">{item.variant}</p>
                      )}
                      <p className="text-sm text-accent">{item.price}</p>
                      <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                        <div className="inline-flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            onClick={() => setQty(item.slug, item.qty - 1)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-l-full text-foreground/70 transition hover:bg-accent/10 hover:text-accent"
                            aria-label="Зменшити"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-8 text-center text-sm font-medium">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(item.slug, item.qty + 1)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-r-full text-foreground/70 transition hover:bg-accent/10 hover:text-accent"
                            aria-label="Збільшити"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="font-medium">{item.qty * item.priceValue} грн</p>
                          <button
                            type="button"
                            onClick={() => remove(item.slug)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                            aria-label="Видалити"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-accent/30 bg-accent/5 px-5 py-4">
                <span className="text-sm uppercase tracking-wider text-muted-foreground">
                  Разом
                </span>
                <span className="font-display text-2xl font-semibold text-accent">
                  {total} грн
                </span>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <h2 className="mb-4 font-display text-2xl font-semibold">Контактні дані</h2>
              <OrderForm items={items} />
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
}
