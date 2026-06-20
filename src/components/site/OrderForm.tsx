import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { sendOrder } from "@/lib/order.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { books, AUTHOR_TELEGRAM } from "@/lib/site-data";

export function OrderForm({ defaultBook }: { defaultBook?: string }) {
  const sendOrderFn = useServerFn(sendOrder);
  const [book, setBook] = useState<string>(defaultBook ?? "");
  const [formKey, setFormKey] = useState(0);

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      phone: string;
      telegram: string;
      book: string;
      comment: string;
    }) => sendOrderFn({ data }),
    onSuccess: () => {
      toast.success(
        `Дякую! Замовлення прийнято. Найближчим часом з вами особисто зв'яжеться авторка — Інґіґерда (${AUTHOR_TELEGRAM} у Telegram).`,
        { duration: 8000 },
      );
      setBook(defaultBook ?? "");
      setFormKey((k) => k + 1);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Сталася помилка. Спробуйте ще раз.");
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      telegram: String(fd.get("telegram") || "").trim(),
      book: book || String(fd.get("book") || "").trim(),
      comment: String(fd.get("comment") || "").trim(),
    };
    if (!data.name || !data.phone || !data.book) {
      toast.error("Будь ласка, заповніть ім'я, телефон та оберіть книгу.");
      return;
    }
    mutation.mutate(data);
  }

  return (
    <form
      key={formKey}
      onSubmit={onSubmit}
      className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8"
    >
      <div className="grid gap-5">
        <Field label="Ім'я" required>
          <Input name="name" required maxLength={100} placeholder="Ваше ім'я" />
        </Field>
        <Field label="Номер телефону" required>
          <Input
            name="phone"
            type="tel"
            required
            maxLength={40}
            placeholder="+380 __ ___ __ __"
          />
        </Field>
        <Field label="Telegram нікнейм">
          <Input name="telegram" maxLength={80} placeholder="@username" />
        </Field>
        <Field label="Книга для замовлення" required>
          <Select value={book} onValueChange={setBook}>
            <SelectTrigger>
              <SelectValue placeholder="Оберіть книгу" />
            </SelectTrigger>
            <SelectContent>
              {books.map((b) => (
                <SelectItem key={b.slug} value={b.title}>
                  {b.title} — {b.price}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Коментар">
          <Textarea
            name="comment"
            maxLength={1000}
            rows={4}
            placeholder="Кількість, місто доставки, побажання щодо підпису…"
          />
        </Field>
        <Button
          type="submit"
          size="lg"
          disabled={mutation.isPending}
          className="group relative overflow-hidden bg-accent text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:bg-accent/90 hover:shadow-lg active:scale-95"
        >
          <span className="relative z-10">
            {mutation.isPending ? "Надсилаю…" : "Надіслати замовлення"}
          </span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          Після замовлення з вами зв'яжеться <strong>лише авторка</strong> Інґіґерда —
          Telegram <a href="https://t.me/ingi_gerda" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">{AUTHOR_TELEGRAM}</a>.
          Контактні дані використовуються виключно для зв'язку щодо замовлення.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <Label className="text-sm">
        {label} {required && <span className="text-accent">*</span>}
      </Label>
      {children}
    </div>
  );
}
