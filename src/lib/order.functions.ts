import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const orderSchema = z.object({
  name: z.string().trim().min(1, "Введіть ім'я").max(100),
  phone: z.string().trim().min(5, "Введіть номер телефону").max(40),
  telegram: z.string().trim().max(80).optional().default(""),
  book: z.string().trim().min(1, "Оберіть книгу").max(200),
  comment: z.string().trim().max(1000).optional().default(""),
});

const CHAT_ID = "1012973976";

export const sendOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
      throw new Error("TELEGRAM_BOT_TOKEN не налаштовано");
    }

    const text =
      `📚 <b>Нове замовлення книги</b>\n\n` +
      `<b>Ім'я:</b> ${escapeHtml(data.name)}\n` +
      `<b>Телефон:</b> ${escapeHtml(data.phone)}\n` +
      `<b>Telegram:</b> ${escapeHtml(data.telegram || "—")}\n` +
      `<b>Книга:</b> ${escapeHtml(data.book)}\n` +
      `<b>Коментар:</b> ${escapeHtml(data.comment || "—")}`;

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: "HTML",
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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
