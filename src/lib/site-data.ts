import ulamkyAsset from "@/assets/ulamky.jpg.asset.json";
import abetkaAsset from "@/assets/abetka.jpg.asset.json";
import abetka2Asset from "@/assets/abetka2.jpg.asset.json";
import abetkaKartkyAsset from "@/assets/abetka_kartky.jpg.asset.json";
import kartky2Asset from "@/assets/kartky2.jpg.asset.json";
import kartky3Asset from "@/assets/kartky3.jpg.asset.json";
import kartky4Asset from "@/assets/kartky4.jpg.asset.json";
import abetkaP13 from "@/assets/abetka-p13.png.asset.json";
import abetkaP14 from "@/assets/abetka-p14.png.asset.json";
import abetkaP15 from "@/assets/abetka-p15.png.asset.json";
import abetkaP16 from "@/assets/abetka-p16.png.asset.json";
import abetkaP17 from "@/assets/abetka-p17.png.asset.json";
import abetkaP18 from "@/assets/abetka-p18.png.asset.json";
import abetkaP19 from "@/assets/abetka-p19.png.asset.json";
import abetkaLetters from "@/assets/abetka-letters.png.asset.json";
import kupalaAsset from "@/assets/kupala.png.asset.json";
import zhnyvaAsset from "@/assets/zhnyva.png.asset.json";

export type BookSpec = { label: string; value: string };

export type BookVariant = { label: string; priceValue: number };

export type Book = {
  slug: string;
  title: string;
  price: string;
  priceValue: number;
  audience?: string;
  pages?: string;
  cover: string;
  gallery: string[];
  short: string;
  long: string[];
  excerpt?: string;
  specs?: BookSpec[];
  /** Варіанти обкладинки з власними цінами (тверда / м'яка) */
  variants?: BookVariant[];
};

/** Найменша ціна книги (з урахуванням варіантів обкладинки). */
export function minPrice(book: Book): number {
  if (book.variants?.length) {
    return Math.min(...book.variants.map((v) => v.priceValue));
  }
  return book.priceValue;
}

/** Текст ціни для списку книг: «від 300 грн», якщо є варіанти. */
export function displayPrice(book: Book): string {
  if (book.variants?.length) return `від ${minPrice(book)} грн`;
  return book.price;
}

export const books: Book[] = [
  {
    slug: "ulamky",
    title: "Уламки",
    price: "400 грн",
    priceValue: 400,
    pages: "≈ 120 сторінок",
    cover: ulamkyAsset.url,
    gallery: [ulamkyAsset.url],
    short:
      "Поетична збірка про втрати, травму та жіночий досвід в умовах повномасштабної війни.",
    long: [
      "«Уламки» — це збірка поезії для дорослих, що звертається до тем втрат, травми та жіночого досвіду в умовах повномасштабної російсько-української війни.",
      "Книга народжувалась як спосіб тримати за руку себе і тих, хто поруч. Тут немає простих відповідей — лише чесні слова, що допомагають дихати, плакати й рухатися далі.",
      "Видання у твердій обкладинці, з авторським дизайном і вкладеним екслібрисом.",
    ],
  },
  {
    slug: "smachnenka-abetka",
    title: "Смачненька абетка",
    price: "400 грн",
    priceValue: 400,
    cover: abetkaAsset.url,
    gallery: [
      abetkaP13.url,
      abetkaP14.url,
      abetkaP15.url,
      abetkaP16.url,
      abetkaP17.url,
      abetkaP18.url,
      abetkaP19.url,
      abetkaLetters.url,
      abetkaAsset.url,
      abetka2Asset.url,
    ],
    short:
      "Дитяча книжка-абетка, виконана авторським шрифтом «Рутенія». Літературна гра і смак рідної мови.",
    long: [
      "Абеток багато, така — єдина!",
      "Перша дитяча книга в Україні надрукована Рутенією — відновленим прадавнім українським шрифтом — завдяки якій можна не тільки навчитися читати, а й розвинути свою фантазію та уяву. А ще пізнати широкий світ гастрономії, бо на сторінках цієї абетки зібрано близько 50 різних страв, 10 різноманітних напоїв, а ще овочі, фрукти, ягоди, спеції. Але головний акцент Смачненої абетки — діти, імена яких згадуються майже у кожному вірші. Хочете дізнатися чи є там ваше або когось із ваших рідних? Загляньте всередину! ",
    ],
    specs: [
      { label: "Видавництво", value: "Друкарський Двір Олега Федорова" },
      { label: "Мова", value: "українська" },
      { label: "Рік видання", value: "2023" },
      { label: "Кількість сторінок", value: "75" },
      { label: "Розмір", value: "22×21×1 см" },
      { label: "Ілюстрації", value: "Валерія Сирота" },
      { label: "Обкладинка", value: "тверда" },
      { label: "Категорія", value: "художня література" },
      { label: "Вік", value: "3+" },
      { label: "ISBN", value: "978-617-8000-86-8" },
    ],
  },
  {
    slug: "abetka-kartky",
    title: "Смачненька абетка — картки",
    price: "300 грн",
    priceValue: 300,
    pages: "33 ілюстровані картки",
    cover: abetkaKartkyAsset.url,
    gallery: [abetkaKartkyAsset.url, kartky2Asset.url, kartky3Asset.url, kartky4Asset.url],
    short:
      "Колекційні ілюстровані картки до «Смачненької абетки» — для ігор, читання та родинних вечорів.",
    long: [
      "33 ілюстровані картки з літерами української абетки. Чудовий комплект для розвитку, ігор та родинного читання.",
      "Картки виконані на щільному папері, з матовою ламінацією. Підходять для багаторазового використання.",
      "Можна купувати окремо або в комплекті з книгою «Смачненька абетка».",
    ],
  },
  {
    slug: "na-ivana-kupala",
    title: "На Івана Купала",
    price: "400 грн",
    priceValue: 400,
    cover: kupalaAsset.url,
    gallery: [kupalaAsset.url],
    short: "Нова книга Інґіґерди — опис буде додано найближчим часом.",
    long: ["Опис книги буде додано найближчим часом."],
    specs: [],
  },
  {
    slug: "kozhnomu-svoi-zhnyva",
    title: "Кожному свої жнива",
    price: "400 грн",
    priceValue: 400,
    cover: zhnyvaAsset.url,
    gallery: [zhnyvaAsset.url],
    short: "Нова книга Інґіґерди — опис буде додано найближчим часом.",
    long: ["Опис книги буде додано найближчим часом."],
    specs: [],
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export const authorSocials = [
  { label: "Instagram", url: "https://www.instagram.com/ingi.gerda/", handle: "@ingi.gerda" },
  { label: "Facebook", url: "https://www.facebook.com/IngiGerdaLife/", handle: "IngiGerdaLife" },
  { label: "YouTube", url: "https://www.youtube.com/@ingi-gerda", handle: "@ingi-gerda" },
  { label: "Telegram", url: "https://t.me/ingi_gerda", handle: "@ingi_gerda" },
];

export const litZabavySocials = [
  { label: "Instagram", url: "https://www.instagram.com/literaturni.zabavy/", handle: "@literaturni.zabavy" },
  { label: "Facebook", url: "https://www.facebook.com/literaturni.zabavy/", handle: "literaturni.zabavy" },
  { label: "Telegram", url: "https://t.me/litzabavy", handle: "@litzabavy" },
  { label: "YouTube", url: "https://www.youtube.com/@literaturni.zabavy", handle: "@literaturni.zabavy" },
];

export const AUTHOR_TELEGRAM = "@ingi_gerda";

export type UpcomingEvent = {
  title: string;
  date: string; // human-readable, e.g. "28 червня 2026"
  time?: string;
  guest?: string;
  fbUrl?: string;
};

/**
 * Майбутні події «Літературних забав».
 * Facebook не дозволяє автоматично завантажувати свій список подій із публічної сторінки
 * (для цього потрібен Graph API з токеном сторінки). Тому актуальні події наразі
 * оновлюються вручну тут, а кнопка нижче веде на офіційний список у Facebook.
 */
export const upcomingEvents: UpcomingEvent[] = [
  // Приклад — замініть на актуальні дати:
  // { title: "Поетичний вечір з …", date: "28 червня 2026", time: "18:00", fbUrl: "https://fb.me/e/..." },
];

