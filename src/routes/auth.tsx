import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { claimAdmin } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Вхід для авторки — Інґіґерда" },
      { name: "description", content: "Службова сторінка входу до панелі керування книгами." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Вхід — Інґіґерда" },
      { property: "og:description", content: "Службова сторінка входу." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const claim = useServerFn(claimAdmin);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }

      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        toast.success("Перевірте пошту, щоб підтвердити акаунт.");
        return;
      }
      await claim({ data: undefined }).catch(() => undefined);
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error((err as Error).message || "Не вдалося увійти");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-md px-6 py-24">
        <h1 className="font-display text-3xl font-medium">
          {mode === "signin" ? "Вхід" : "Реєстрація"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Службова сторінка. Доступ до панелі керування книгами має лише авторка.
        </p>
        <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-6">
          <div className="grid gap-1.5">
            <Label className="text-sm">Пошта</Label>
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="grid gap-1.5">
            <Label className="text-sm">Пароль</Label>
            <Input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />
          </div>
          <Button
            type="submit"
            disabled={busy}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {busy ? "Зачекайте…" : mode === "signin" ? "Увійти" : "Зареєструватися"}
          </Button>
          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-xs text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
          >
            {mode === "signin" ? "Створити акаунт" : "У мене вже є акаунт"}
          </button>
        </form>
      </div>
    </section>
  );
}
