import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  books as staticBooks,
  type Book,
  type BookSpec,
  type BookVariant,
} from "@/lib/site-data";

export type BookRow = {
  id: string;
  slug: string;
  title: string | null;
  price: string | null;
  price_value: number | null;
  short: string | null;
  long_text: string[] | null;
  specs: unknown;
  variants?: unknown;
  cover: string | null;
  gallery: string[] | null;
  sort_order: number;
  hidden: boolean;
};

function toSpecs(value: unknown): BookSpec[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const specs = value.filter(
    (s): s is BookSpec =>
      !!s && typeof s === "object" && "label" in s && "value" in s,
  );
  return specs.length ? specs : undefined;
}

export function toVariants(value: unknown): BookVariant[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const variants = value
    .filter((v): v is { label: string; price_value?: number; priceValue?: number } =>
      !!v && typeof v === "object" && "label" in v,
    )
    .map((v) => ({
      label: String(v.label),
      priceValue: Number(v.price_value ?? v.priceValue ?? 0),
    }));
  return variants.length ? variants : undefined;
}

export function mergeBook(row: BookRow, base?: Book): Book {
  const gallery = row.gallery?.length ? row.gallery : base?.gallery ?? [];
  const cover = row.cover || base?.cover || gallery[0] || "";
  return {
    slug: row.slug,
    title: row.title || base?.title || row.slug,
    price: row.price || base?.price || "",
    priceValue: row.price_value ?? base?.priceValue ?? 0,
    cover,
    gallery: gallery.length ? gallery : cover ? [cover] : [],
    short: row.short || base?.short || "",
    long: row.long_text?.length ? row.long_text : base?.long ?? [],
    excerpt: base?.excerpt,
    specs: toSpecs(row.specs) ?? base?.specs,
    variants: toVariants(row.variants) ?? base?.variants,
  };
}

export async function fetchBookRows(): Promise<BookRow[]> {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as unknown as BookRow[];
}

export function mergeAll(rows: BookRow[]): Book[] {
  const bySlug = new Map(staticBooks.map((b) => [b.slug, b]));
  const merged = rows
    .filter((r) => !r.hidden)
    .map((r) => mergeBook(r, bySlug.get(r.slug)));
  if (merged.length === 0) return staticBooks;
  return merged;
}

/** Books from the database, merged over the built-in defaults. */
export function useBooks() {
  const query = useQuery({
    queryKey: ["books"],
    queryFn: fetchBookRows,
    staleTime: 60_000,
  });
  return { books: query.data ? mergeAll(query.data) : staticBooks, isLoading: query.isLoading };
}

export function useBook(slug: string, fallback: Book) {
  const { books } = useBooks();
  return books.find((b) => b.slug === slug) ?? fallback;
}
