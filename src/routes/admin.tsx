import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Upload, LogOut, Save, ArrowUp, ArrowDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { fetchBookRows, mergeBook, type BookRow } from "@/lib/books-db";
import { books as staticBooks } from "@/lib/site-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Панель керування книгами — Інґіґерда" },
      { name: "description", content: "Редагування описів, характеристик і фото книг." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Панель керування — Інґіґерда" },
      { property: "og:description", content: "Редагування книг." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

type Draft = {
  id: string;
  slug: string;
  title: string;
  price: string;
  price_value: number;
  short: string;
  long: string;
  specs: { label: string; value: string }[];
  cover: string;
  gallery: string[];
  sort_order: number;
  hidden: boolean;
};

function rowToDraft(row: BookRow): Draft {
  const base = staticBooks.find((b) => b.slug === row.slug);
  const merged = mergeBook(row, base);
  return {
    id: row.id,
    slug: row.slug,
    title: merged.title,
    price: merged.price,
    price_value: merged.priceValue,
    short: merged.short,
    long: merged.long.join("\n\n"),
    specs: merged.specs ?? [],
    cover: merged.cover,
    gallery: merged.gallery,
    sort_order: row.sort_order,
    hidden: row.hidden,
  };
}

function AdminPage() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"checking" | "ok" | "denied">("checking");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: data.session.user.id,
        _role: "admin",
      });
      if (!active) return;
      setStatus(isAdmin ? "ok" : "denied");
    })();
    return () => {
      active = false;
    };
  }, [navigate]);

  if (status === "checking") {
    return <div className="mx-auto max-w-3xl px-6 py-24 text-muted-foreground">Завантаження…</div>;
  }

  if (status === "denied") {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="font-display text-3xl">Немає доступу</h1>
        <p className="mt-3 text-muted-foreground">
          Цей акаунт не має прав адміністратора.
        </p>
        <Button
          className="mt-6"
          variant="outline"
          onClick={async () => {
            await supabase.auth.signOut();
            navigate({ to: "/auth" });
          }}
        >
          Вийти
        </Button>
      </div>
    );
  }

  return <AdminBooks />;
}

function AdminBooks() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: rows, isLoading } = useQuery({ queryKey: ["books"], queryFn: fetchBookRows });

  async function addBook() {
    const slug = window.prompt("Латинське посилання (slug) нової книги, напр. nova-knyha");
    if (!slug) return;
    const { error } = await supabase.from("books").insert({
      slug: slug.trim(),
      title: "Нова книга",
      price: "0 грн",
      price_value: 0,
      sort_order: (rows?.length ?? 0) * 10 + 10,
    });
    if (error) return toast.error(error.message);
    toast.success("Книгу створено");
    qc.invalidateQueries({ queryKey: ["books"] });
  }

  return (
    <section className="border-t border-border/60">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-medium">Керування книгами</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Змінюйте описи, характеристики, ціни та фото. Зміни одразу видно на сайті.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/books">На сайт</Link>
            </Button>
            <Button
              variant="outline"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" /> Вийти
            </Button>
            <Button onClick={addBook} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Plus className="mr-2 h-4 w-4" /> Додати книгу
            </Button>
          </div>
        </div>

        {isLoading && <p className="mt-10 text-muted-foreground">Завантаження…</p>}

        <div className="mt-10 space-y-6">
          {rows?.map((row) => (
            <BookEditor key={row.id} row={row} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BookEditor({ row }: { row: BookRow }) {
  const qc = useQueryClient();
  const [draft, setDraft] = useState<Draft>(() => rowToDraft(row));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  async function save() {
    setSaving(true);
    const { error } = await supabase
      .from("books")
      .update({
        title: draft.title,
        price: draft.price,
        price_value: draft.price_value,
        short: draft.short,
        long_text: draft.long.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
        specs: draft.specs.filter((s) => s.label.trim() || s.value.trim()),
        cover: draft.cover,
        gallery: draft.gallery,
        sort_order: draft.sort_order,
        hidden: draft.hidden,
      })
      .eq("id", row.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(`«${draft.title}» збережено`);
    qc.invalidateQueries({ queryKey: ["books"] });
  }

  async function remove() {
    if (!window.confirm(`Видалити «${draft.title}»?`)) return;
    const { error } = await supabase.from("books").delete().eq("id", row.id);
    if (error) return toast.error(error.message);
    toast.success("Книгу видалено");
    qc.invalidateQueries({ queryKey: ["books"] });
  }

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `${draft.slug}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("book-images").upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (error) {
        toast.error(error.message);
        continue;
      }
      urls.push(`/api/public/book-image/${path}`);
    }
    setUploading(false);
    if (urls.length) {
      setDraft((d) => ({
        ...d,
        gallery: [...d.gallery, ...urls],
        cover: d.cover || urls[0]!,
      }));
      toast.success("Фото завантажено. Не забудьте зберегти.");
    }
  }

  function moveImage(index: number, dir: -1 | 1) {
    setDraft((d) => {
      const next = [...d.gallery];
      const target = index + dir;
      if (target < 0 || target >= next.length) return d;
      [next[index], next[target]] = [next[target]!, next[index]!];
      return { ...d, gallery: next };
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {draft.cover && (
            <img src={draft.cover} alt="" className="h-24 w-20 rounded-md object-cover" />
          )}
          <div>
            <h2 className="font-display text-2xl">{draft.title}</h2>
            <p className="text-sm text-muted-foreground">/{draft.slug}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={remove}>
            <Trash2 className="mr-2 h-4 w-4" /> Видалити
          </Button>
          <Button
            size="sm"
            onClick={save}
            disabled={saving}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Save className="mr-2 h-4 w-4" /> {saving ? "Збереження…" : "Зберегти"}
          </Button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label className="text-sm">Назва</Label>
          <Input value={draft.title} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label className="text-sm">Ціна (текст)</Label>
          <Input value={draft.price} onChange={(e) => set("price", e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label className="text-sm">Ціна (число, грн)</Label>
          <Input
            type="number"
            value={draft.price_value}
            onChange={(e) => set("price_value", Number(e.target.value))}
          />
        </div>
        <div className="grid gap-1.5">
          <Label className="text-sm">Порядок у списку</Label>
          <Input
            type="number"
            value={draft.sort_order}
            onChange={(e) => set("sort_order", Number(e.target.value))}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-1.5">
        <Label className="text-sm">Короткий опис (у списку книг)</Label>
        <Textarea rows={2} value={draft.short} onChange={(e) => set("short", e.target.value)} />
      </div>

      <div className="mt-4 grid gap-1.5">
        <Label className="text-sm">Повний опис (порожній рядок = новий абзац)</Label>
        <Textarea rows={6} value={draft.long} onChange={(e) => set("long", e.target.value)} />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <Label className="text-sm">Характеристики</Label>
          <Button
            variant="outline"
            size="sm"
            onClick={() => set("specs", [...draft.specs, { label: "", value: "" }])}
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Рядок
          </Button>
        </div>
        <div className="mt-3 space-y-2">
          {draft.specs.map((s, i) => (
            <div key={i} className="flex gap-2">
              <Input
                placeholder="Назва"
                value={s.label}
                onChange={(e) =>
                  set(
                    "specs",
                    draft.specs.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)),
                  )
                }
              />
              <Input
                placeholder="Значення"
                value={s.value}
                onChange={(e) =>
                  set(
                    "specs",
                    draft.specs.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)),
                  )
                }
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => set("specs", draft.specs.filter((_, j) => j !== i))}
                aria-label="Видалити рядок"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label className="text-sm">Фото (перше — обкладинка)</Label>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-1.5 text-sm hover:border-accent">
            <Upload className="h-4 w-4" />
            {uploading ? "Завантаження…" : "Завантажити фото"}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => upload(e.target.files)}
            />
          </label>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {draft.gallery.map((url, i) => (
            <div key={url + i} className="overflow-hidden rounded-lg border border-border">
              <img src={url} alt="" className="aspect-square w-full object-cover" />
              <div className="flex items-center justify-between gap-1 p-1">
                <button
                  type="button"
                  onClick={() => moveImage(i, -1)}
                  className="rounded p-1 hover:text-accent"
                  aria-label="Ліворуч"
                >
                  <ArrowUp className="h-3.5 w-3.5 -rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={() => set("cover", url)}
                  className={`rounded px-1.5 text-[11px] ${
                    draft.cover === url ? "text-accent" : "text-muted-foreground hover:text-accent"
                  }`}
                >
                  обкладинка
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(i, 1)}
                  className="rounded p-1 hover:text-accent"
                  aria-label="Праворуч"
                >
                  <ArrowDown className="h-3.5 w-3.5 -rotate-90" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setDraft((d) => ({ ...d, gallery: d.gallery.filter((_, j) => j !== i) }))
                  }
                  className="rounded p-1 text-muted-foreground hover:text-destructive"
                  aria-label="Видалити фото"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <label className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={draft.hidden}
          onChange={(e) => set("hidden", e.target.checked)}
        />
        Приховати книгу на сайті
      </label>
    </div>
  );
}
