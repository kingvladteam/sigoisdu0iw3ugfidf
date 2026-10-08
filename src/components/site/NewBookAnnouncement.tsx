import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useBooks } from "@/lib/books-db";
import { canOrder, displayPrice } from "@/lib/site-data";

const KEY = "ingigerda_family_code_announcement_v1";

export function NewBookAnnouncement() {
  const { books, isLoading } = useBooks();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const book = books.find((item) => item.slug === "simeinyi-kod");
  const eligible = pathname !== "/admin" && pathname !== "/auth" && pathname !== "/cart" && !pathname.startsWith("/books/");

  useEffect(() => {
    if (isLoading || !book || canOrder(book) || !eligible) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch { /* The announcement still works without browser storage. */ }
    const timer = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, [book, eligible, isLoading]);

  function dismiss() {
    setOpen(false);
    try { sessionStorage.setItem(KEY, "seen"); } catch { /* Ignore storage restrictions. */ }
  }

  if (!book || canOrder(book) || !eligible) return null;

  return (
    <Dialog open={open} onOpenChange={(value) => !value && dismiss()}>
      <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto border-accent/40 p-5 sm:p-8">
        <div className="grid items-center gap-5 sm:grid-cols-[0.8fr_1fr] sm:gap-8">
          <img src={book.cover} alt={`Обкладинка «${book.title}»`} className="mx-auto max-h-[30dvh] w-auto max-w-full object-contain sm:max-h-[55dvh]" />
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-medium text-accent"><BookOpen className="h-4 w-4" /> Нова книга</p>
            <DialogTitle className="font-display text-2xl leading-tight sm:text-3xl">Сімейний код</DialogTitle>
            <DialogDescription className="mt-3 text-base leading-relaxed">Психологія стосунків свекруха - невістка</DialogDescription>
            <p className="mt-5 text-lg font-medium leading-relaxed text-accent">{displayPrice(book)}</p>
            <Button asChild className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/books/$slug" params={{ slug: book.slug }} onClick={dismiss}>Про книгу <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="ghost" className="mt-2 w-full" onClick={dismiss}>Повернутися до сайту</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}