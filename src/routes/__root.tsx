import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CartProvider } from "@/lib/cart";

const lostVerses = [
  "Пасхалка №404: ця сторінка пішла по новий наклад «Уламків».",
  "Ви відкрили секретний розділ. Шкода, що він поки що порожній.",
  "Навіть найкращі сюжети мають сторінку, якої не існує.",
  "Цю адресу не знайшли ні в абетці, ні в каталозі. Спробуйте іншу.",
  "404: літера загубилася між «А» та «Я». Повернімося на головну?",
  "Схоже, ця сторінка вирушила на літературні забави без попередження.",
];

function NotFoundComponent() {
  const verse = lostVerses[Math.floor(Math.random() * lostVerses.length)];
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-24">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl animate-float" />
        <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-primary/10 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      </div>
      <div className="relative max-w-lg text-center">
        <p className="font-display text-[8rem] leading-none tracking-tight text-foreground/90 md:text-[10rem]">
          4<span className="inline-block animate-float text-accent">0</span>4
        </p>
        <div className="mx-auto mt-2 h-px w-32 gold-line" />
        <h2 className="mt-6 font-display text-2xl text-foreground md:text-3xl">
          Сторінку загублено між рядків
        </h2>
        <pre className="mt-5 whitespace-pre-wrap font-display text-base italic leading-relaxed text-muted-foreground md:text-lg">
          {verse}
        </pre>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:scale-105 hover:bg-primary/90"
          >
            На головну
          </Link>
          <Link
            to="/books"
            className="inline-flex items-center justify-center rounded-md border border-border bg-card/60 px-5 py-2.5 text-sm font-medium text-foreground transition-all hover:scale-105 hover:border-accent hover:text-accent"
          >
            До книг
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Сталася помилка</h1>
        <p className="mt-2 text-sm text-muted-foreground">Спробуйте оновити сторінку.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Спробувати ще раз
          </button>
        </div>
      </div>
    </div>
  );
}

const themeInit = `
(function(){try{
  var t = localStorage.getItem('theme');
  if(!t){ t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
  if(t === 'dark'){ document.documentElement.classList.add('dark'); }
}catch(e){}})();
`;

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Інґіґерда (Ingigerda)" },
      {
        name: "description",
        content:
          "Інґіґерда (Ingigerda) — сучасна українська письменниця, організаторка мистецьких імпрез, громадська діячка, фахівчиня з розвитку людського капіталу.",
      },
      { property: "og:title", content: "Інґіґерда (Ingigerda)" },
      {
        property: "og:description",
        content:
          "Інґіґерда (Ingigerda) — сучасна українська письменниця, організаторка мистецьких імпрез, громадська діячка, фахівчиня з розвитку людського капіталу.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Інґіґерда (Ingigerda)" },
      { name: "description", content: "Інґіґерда (Ingigerda) — сучасна українська письменниця, організаторка мистецьких імпрез, громадська діячка, фахівчиня з розвитку людського капіталу." },
      { property: "og:description", content: "Інґіґерда (Ingigerda) — сучасна українська письменниця, організаторка мистецьких імпрез, громадська діячка, фахівчиня з розвитку людського капіталу." },
      { name: "twitter:description", content: "Інґіґерда (Ingigerda) — сучасна українська письменниця, організаторка мистецьких імпрез, громадська діячка, фахівчиня з розвитку людського капіталу." },
      { property: "og:image", content: "/assets/site_banner.png" },
      { name: "twitter:image", content: "/assets/site_banner.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [{ children: themeInit }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <div className="paper-bg flex min-h-screen flex-col bg-background text-foreground">
          <Toaster position="top-center" richColors closeButton />
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      </CartProvider>
    </QueryClientProvider>
  );
}
