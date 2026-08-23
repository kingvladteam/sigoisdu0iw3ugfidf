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
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();
  const { add } = useCart();
  const active = isAbetkaBundlePromoActive();

  useEffect(() => {
    setDismissed(localStorage.getItem("abetka-promo-dismissed") === "1");
  }, []);

  useEffect(() => {
    if (!active || sessionStorage.getItem("abetka-promo-seen")) return;
    const timeout = window.setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("abetka-promo-seen", "1");
    }, 1400);
    return () => window.clearTimeout(timeout);
  }, [active]);

  if (!active || dismissed) return null;

  function dismissOffer() {
    localStorage.setItem("abetka-promo-dismissed", "1");
    setOpen(false);
    setDismissed(true);
  }

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
      <div className="fixed bottom-5 right-5 z-30 sm:bottom-7 sm:right-7">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Відкрити спеціальну пропозицію"
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl ring-4 ring-accent/20 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Gift className="promo-gift-icon h-7 w-7" />
          <span className="absolute inset-0 rounded-full border-2 border-accent-foreground/40 animate-ping" />
        </button>
        <button
          type="button"
          onClick={dismissOffer}
          aria-label="Прибрати спеціальну пропозицію"
          className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-foreground/70 shadow-md transition hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="!fixed !left-1/2 !top-1/2 !z-[60] !w-[calc(100%-2rem)] !max-w-2xl !-translate-x-1/2 !-translate-y-1/2 max-h-[90vh] overflow-y-auto p-0">
          <div className="grid sm:grid-cols-[0.9fr_1.1fr]">
            <div className="flex items-center justify-center bg-accent/10 p-3 sm:p-6">
              <img
                src="/assets/nabir_abetka%2Bkartky.jpg"
                alt="Набір «Смачненька абетка» та картки"
                className="max-h-44 w-full rounded-xl object-contain shadow-lg sm:max-h-72"
              />
            </div>
            <div className="p-6 sm:p-8">
              <DialogHeader className="text-left">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
                  Спеціальна пропозиція
                </p>
                <DialogTitle className="mt-3 font-display text-3xl leading-tight">
                  Набір для читання та розвитку дитини
                </DialogTitle>
                <DialogDescription className="mt-4 text-base leading-relaxed text-foreground/75">
                  Тільки до 1 жовтня набір «Смачненька абетка» (книга та картки) за ціною всього
                  <strong className="text-foreground"> 650 грн</strong>.
                  <span className="mt-2 block">Ваша вигода — 100 грн.</span>
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
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
