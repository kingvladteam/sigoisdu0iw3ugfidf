import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.jpg.asset.json";
import { authorSocials } from "@/lib/site-data";
import { SocialList } from "./SocialList";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-border bg-card">
              <img src={logoAsset.url} alt="" className="h-full w-full object-cover" />
            </span>
            <span className="font-display text-xl font-semibold">Інґіґерда</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Українська письменниця, очільниця проєкту «Літературні забави», організаторка мистецьких івентів.
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Книги для дітей та дорослих.
            </p>
          <div className="mt-5">
            <SocialList items={authorSocials} variant="compact" />
          </div>
        </div>

        <div>
          <h4 className="font-display text-xl font-semibold">Навігація</h4>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {[
              { to: "/", label: "Головна" },
              { to: "/about", label: "Про авторку" },
              { to: "/books", label: "Книги" },
              { to: "/projects", label: "Літ. забави" },
              { to: "/events", label: "Події" },
              { to: "/contact", label: "Контакти" },
            ].map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="story-link text-foreground/80 transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Інґіґерда. Усі права захищено.</p>
          <p>Зроблено з любов'ю до українського слова.</p>
        </div>
      </div>
    </footer>
  );
}
