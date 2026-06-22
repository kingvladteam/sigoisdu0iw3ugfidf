import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ShoppingBag } from "lucide-react";
import logoAsset from "@/assets/logo.jpg.asset.json";
import { ThemeToggle } from "./ThemeToggle";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Головна" },
  { to: "/about", label: "Про авторку" },
  { to: "/books", label: "Книги" },
  { to: "/projects", label: "Літ. забави" },
  { to: "/events", label: "Події" },
  { to: "/contact", label: "Контакти" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-all duration-300",
        scrolled
          ? "border-border/70 bg-background/85 backdrop-blur-xl shadow-[0_4px_24px_-12px_rgba(0,0,0,0.15)]"
          : "border-transparent bg-background/50 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="group flex items-center gap-3">
          <span className="relative inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-border bg-card shadow-sm transition-all duration-500 group-hover:rotate-[8deg] group-hover:scale-110 dark:border-accent/50 dark:bg-gradient-to-br dark:from-accent/25 dark:to-accent/5 dark:shadow-[0_0_24px_-6px_var(--color-accent)] dark:ring-1 dark:ring-accent/30">
            <img
              src={logoAsset.url}
              alt="Логотип Інґіґерди"
              className="h-full w-full object-cover transition-all duration-500 dark:scale-[1.05] dark:mix-blend-luminosity dark:opacity-90 dark:contrast-110"
            />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">Інґіґерда</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="nav-link text-foreground/75"
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            aria-label="Кошик"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/60 text-foreground/80 transition-all hover:scale-110 hover:border-accent hover:text-accent"
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground animate-scale-in">
                {count}
              </span>
            )}
          </Link>
          <ThemeToggle />
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/80"
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background/95 backdrop-blur md:hidden animate-fade-in">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-3 text-sm">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-foreground/80 transition-colors hover:bg-accent/10 hover:text-accent"
                activeProps={{ className: "bg-accent/10 text-accent" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
