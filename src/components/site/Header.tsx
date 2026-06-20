import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logoAsset from "@/assets/logo.jpg.asset.json";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Головна" },
  { to: "/about", label: "Про мене" },
  { to: "/books", label: "Книги" },
  { to: "/projects", label: "Літ. забави" },
  { to: "/events", label: "Події" },
  { to: "/contact", label: "Контакти" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          ? "border-border/80 bg-background/90 backdrop-blur-md shadow-sm"
          : "border-transparent bg-background/60 backdrop-blur",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt="Логотип Інґіґерди"
            className="h-10 w-10 rounded-full object-contain transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110"
          />
          <span className="font-display text-xl tracking-wide">Інґіґерда</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="story-link relative text-foreground/80 transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
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
