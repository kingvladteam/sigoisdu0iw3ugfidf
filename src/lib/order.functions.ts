import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const itemSchema = z.object({
  title: z.string().trim().min(1).max(200),
  qty: z.number().int().min(1).max(99),
  price: z.string().trim().max(50),
});

const orderSchema = z.object({
  firstName: z.string().trim().min(1, "Введіть ім'я").max(80),
  lastName: z.string().trim().min(1, "Введіть прізвище").max(80),
  patronymic: z.string().trim().min(1, "Введіть по батькові").max(80),
  phone: z.string().trim().min(5, "Введіть номер телефону").max(40),
  telegram: z.string().trim().max(80).optional().default(""),
  city: z.string().trim().max(120).optional().default(""),
  comment: z.string().trim().max(1000).optional().default(""),
  items: z.array(itemSchema).min(1, "Кошик порожній").max(20),
});

const CHAT_ID = "1012973976";

// Telegram MarkdownV2 reserved characters that must be escaped
function escMd(s: string): string {
  return s.replace(/[_*\[\]()~`>#+\-=|{}.!\\]/g, "\\$&");
}

// Wrap value as a spoiler. The inner value must be MarkdownV2-escaped.
function spoiler(value: string): string {
  return `||${escMd(value)}||`;
}

export const sendOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error("TELEGRAM_BOT_TOKEN не налаштовано");
    }

    const fullName = `${data.lastName} ${data.firstName} ${data.patronymic}`;
    const itemsLines = data.items
      .map((i, idx) => `${idx + 1}\\. ${spoiler(`${i.title} × ${i.qty} (${i.price})`)}`)
      .join("\n");
    const totalQty = data.items.reduce((s, i) => s + i.qty, 0);

    const text =
      `📚 *Нове замовлення книг*\n\n` +
      `*ПІБ:* ${spoiler(fullName)}\n` +
      `*Телефон:* ${spoiler(data.phone)}\n` +
      `*Telegram:* ${spoiler(data.telegram || "—")}\n` +
      `*Місто:* ${spoiler(data.city || "—")}\n` +
      `*Коментар:* ${spoiler(data.comment || "—")}\n\n` +
      `*Книги \\(${totalQty} шт\\.\\):*\n${itemsLines}`;

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "MarkdownV2",
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Telegram API error", res.status, errText);
      throw new Error("Не вдалося надіслати замовлення. Спробуйте ще раз.");
    }

    return { ok: true };
  });
