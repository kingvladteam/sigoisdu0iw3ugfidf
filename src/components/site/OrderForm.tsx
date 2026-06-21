import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AlertCircle, ShieldCheck, Send } from "lucide-react";

import { sendOrder } from "@/lib/order.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCart, type CartItem } from "@/lib/cart";

export function OrderForm({ items }: { items: CartItem[] }) {
  const sendOrderFn = useServerFn(sendOrder);
  const navigate = useNavigate();
  const { clear } = useCart();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const mutation = useMutation({
    mutationFn: async (data: {
      firstName: string;
      lastName: string;
      patronymic: string;
      phone: string;
      telegram: string;
      city: string;
      comment: string;
      items: { title: string; qty: number; price: string }[];
    }) => sendOrderFn({ data }),
    onSuccess: () => {
      setConfirmOpen(true);
      setFormKey((k) => k + 1);
    },
    onError: (err: Error) => {
      toast.error(err.message || "Сталася помилка. Спробуйте ще раз.");
    },
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Кошик порожній. Додайте хоча б одну книгу.");
      return;
    }
    const fd = new FormData(e.currentTarget);
    const data = {
      firstName: String(fd.get("firstName") || "").trim(),
      lastName: String(fd.get("lastName") || "").trim(),
      patronymic: String(fd.get("patronymic") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      telegram: String(fd.get("telegram") || "").trim(),
      city: String(fd.get("city") || "").trim(),
      comment: String(fd.get("comment") || "").trim(),
      items: items.map((i) => ({ title: i.title, qty: i.qty, price: i.price })),
    };
    if (!data.firstName || !data.lastName || !data.patronymic || !data.phone) {
      toast.error("Заповніть ПІБ та телефон.");
      return;
    }
    mutation.mutate(data);
  }

  function onConfirm() {
    setConfirmOpen(false);
    clear();
    navigate({ to: "/" });
  }

  return (
    <>
      <form
        key={formKey}
        onSubmit={onSubmit}
        className="rounded-2xl border border-border bg-card p-6 shadow-lg sm:p-8"
      >
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Прізвище" required>
              <Input name="lastName" required maxLength={80} placeholder="Рудик" />
            </Field>
            <Field label="Ім'я" required>
              <Input name="firstName" required maxLength={80} placeholder="Олена" />
            </Field>
            <Field label="По батькові" required>
              <Input name="patronymic" required maxLength={80} placeholder="Іванівна" />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Номер телефону" required>
              <Input name="phone" type="tel" required maxLength={40} placeholder="+380 __ ___ __ __" />
            </Field>
            <Field label="Telegram нікнейм">
              <Input name="telegram" maxLength={80} placeholder="@username" />
            </Field>
          </div>
          <Field label="Місто (для доставки Новою поштою)">
            <Input name="city" maxLength={120} placeholder="Київ" />
          </Field>
          <Field label="Коментар">
            <Textarea
              name="comment"
              maxLength={1000}
              rows={3}
              placeholder="Відділення Нової пошти, побажання щодо підпису…"
            />
          </Field>

          <div className="mt-2 flex items-start gap-2 rounded-lg border border-accent/30 bg-accent/5 p-3 text-xs leading-relaxed text-foreground/80">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span>
              Після замовлення з вами зв'яжеться <strong>лише авторка</strong> Інґіґерда у
              Telegram — <a href="https://t.me/ingi_gerda" target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">@ingi_gerda</a>. Остерігайтесь фейкових акаунтів.
            </span>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={mutation.isPending || items.length === 0}
            className="group relative mt-2 overflow-hidden bg-accent text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:bg-accent/90 hover:shadow-lg active:scale-95"
          >
            <span className="relative z-10 inline-flex items-center gap-2">
              <Send className="h-4 w-4" />
              {mutation.isPending ? "Надсилаю…" : "Підтвердити замовлення"}
            </span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </Button>
        </div>
      </form>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent className="border-accent/40">
          <AlertDialogHeader>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
              <AlertCircle className="h-7 w-7" />
            </div>
            <AlertDialogTitle className="text-center font-display text-2xl">
              Замовлення прийнято!
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3 text-center text-sm text-foreground/85">
                <p>
                  Дякую за довіру. Якщо всі контактні дані вказані правильно, найближчим часом
                  з вами особисто зв'яжеться авторка.
                </p>
                <div className="rounded-lg border border-accent/30 bg-accent/5 p-3 text-left">
                  <p className="font-semibold text-foreground">⚠️ Важливо — остерігайтесь фейків</p>
                  <p className="mt-1">
                    Авторка пише <strong>лише</strong> з облікового запису{" "}
                    <Link
                      to="/"
                      className="font-semibold text-accent hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open("https://t.me/ingi_gerda", "_blank");
                      }}
                    >
                      @ingi_gerda
                    </Link>{" "}
                    у Telegram. Будь-які інші акаунти, що видають себе за Інґіґерду — фейкові.
                    Не переказуйте кошти стороннім особам.
                  </p>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={onConfirm}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Я прочитала/прочитав цю інформацію
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
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
    <div className="grid gap-1.5">
      <Label className="text-sm">
        {label} {required && <span className="text-accent">*</span>}
      </Label>
      {children}
    </div>
  );
}
