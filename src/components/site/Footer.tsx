import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo.jpg.asset.json";
import litzabavyLogo from "@/assets/litzabavy-logo.png.asset.json";
import { authorSocials, litZabavySocials } from "@/lib/site-data";
import { SocialList } from "./SocialList";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="" className="h-10 w-10 rounded-full object-contain" />
            <span className="font-display text-xl">Інґіґерда</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Українська поетеса і прозаїк. Книги для дітей і дорослих, авторські вечори та
            літературні події.
          </p>
          <div className="mt-5">
            <SocialList items={authorSocials} variant="compact" />
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3">
            <img
              src={litzabavyLogo.url}
              alt="Літературні забави"
              className="h-10 w-10 rounded-md object-contain"
            />
            <span className="font-display text-xl">Літературні забави</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Авторський проєкт Інґіґерди — щотижневі літературні вечори та прямі трансляції
            українських авторів.
          </p>
          <div className="mt-5">
            <SocialList items={litZabavySocials} variant="compact" />
          </div>
        </div>

        <div>
          <h4 className="font-display text-xl">Навігація</h4>
          <ul className="mt-4 grid gap-2 text-sm">
            {[
              { to: "/", label: "Головна" },
              { to: "/about", label: "Про мене" },
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
          <p>© {new Date().getFullYear()} Ірина Рудика (Інґіґерда). Усі права захищено.</p>
          <p>Зроблено з любов’ю до українського слова.</p>
        </div>
      </div>
    </footer>
  );
}
