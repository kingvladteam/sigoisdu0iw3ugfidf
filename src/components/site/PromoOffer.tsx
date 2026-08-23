import { useEffect, useState } from "react";
import { Gift, ShoppingBag, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { getBook } from "@/lib/site-data";
import {
  ABETKA_BOOK_SLUG,
  ABETKA_CARDS_SLUG,
  isAbetkaBundlePromoActive,
  useCart,
} from "@/lib/cart";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function PromoOffer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { add } = useCart();
  const active = isAbetkaBundlePromoActive();

  useEffect(() => {
    if (!active || sessionStorage.getItem("abetka-promo-seen")) return;
    const timeout = window.setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("abetka-promo-seen", "1");
    }, 1400);
    return () => window.clearTimeout(timeout);
  }, [active]);

  if (!active) return null;

  function useOffer() {
    const book = getBook(ABETKA_BOOK_SLUG);
    const cards = getBook(ABETKA_CARDS_SLUG);
    if (!book || !cards) return;
    add(book);
    add(cards);
    setOpen(false);
    navigate({ to: "/cart" });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Відкрити спеціальну пропозицію"
        className="fixed bottom-5 right-5 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl ring-4 ring-accent/20 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:bottom-7 sm:right-7"
      >
        <Gift className="promo-gift-icon h-7 w-7" />
        <span className="absolute inset-0 rounded-full border-2 border-accent-foreground/40 animate-ping" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!fixed !left-1/2 !top-1/2 !z-[60] !w-[calc(100%-2rem)] !max-w-2xl !-translate-x-1/2 !-translate-y-1/2 max-h-[90vh] overflow-y-auto p-0">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Закрити спеціальну пропозицію"
            className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/85 text-foreground/70 shadow-sm transition hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-accent/10 p-4 sm:p-6">
              <img
                src="/assets/nabir_abetka+kartky.jpg"
                alt="Набір «Смачненька абетка» та картки"
                className="h-full min-h-56 w-full rounded-xl object-cover shadow-lg"
              />
            </div>
            <div className="p-6 sm:p-8">
              <DialogHeader className="text-left">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                  Спеціальна пропозиція
                </p>
                <DialogTitle className="mt-3 font-display text-3xl leading-tight">
                  Набір для маленьких читачів
                </DialogTitle>
                <DialogDescription className="mt-4 text-base leading-relaxed text-foreground/75">
                  Тільки до 1 жовтня набір «Смачненька абетка» (книга та картки) за ціною всього
                  <strong className="text-foreground"> 650 грн</strong>. Ваша вигода — 100 грн.
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  onClick={useOffer}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Скористатися пропозицією
                </Button>
                <span className="text-sm text-muted-foreground">400 + 250 грн</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
