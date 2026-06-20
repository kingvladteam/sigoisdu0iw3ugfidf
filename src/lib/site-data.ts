import ulamkyAsset from "@/assets/ulamky.jpg.asset.json";
import abetkaAsset from "@/assets/abetka.jpg.asset.json";
import abetka2Asset from "@/assets/abetka2.jpg.asset.json";
import abetkaKartkyAsset from "@/assets/abetka_kartky.jpg.asset.json";
import kartky2Asset from "@/assets/kartky2.jpg.asset.json";
import kartky3Asset from "@/assets/kartky3.jpg.asset.json";
import kartky4Asset from "@/assets/kartky4.jpg.asset.json";

export type Book = {
  slug: string;
  title: string;
  price: string;
  priceValue: number;
  audience: string;
  pages?: string;
  cover: string;
  gallery: string[];
  short: string;
  long: string[];
  excerpt?: string;
};

export const books: Book[] = [
  {
    slug: "ulamky",
    title: "Уламки",
    price: "450 грн",
    priceValue: 450,
    audience: "Для дорослих",
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
    excerpt:
      "«…а слово — як свіча у долонях: тримаєш — світить, відпустиш — згасне в темряві.»",
  },
  {
    slug: "smachnenka-abetka",
    title: "Смачненька абетка",
    price: "400 грн",
    priceValue: 400,
    audience: "Для дітей від 4 років",
    pages: "≈ 64 сторінки",
    cover: abetkaAsset.url,
    gallery: [abetkaAsset.url, abetka2Asset.url],
    short:
      "Дитяча книжка-абетка, виконана авторським шрифтом «Рутенія». Літературна гра і смак рідної мови.",
    long: [
      "«Смачненька абетка» — це поєднання літературної гри, алфавітної структури та поетичного викладу.",
      "Кожна літера — це маленька історія, ілюстрація і смачний образ, який запам’ятовується з першого читання. Виконана авторським шрифтом «Рутенія».",
      "Чудовий подарунок для дітей дошкільного та молодшого шкільного віку.",
    ],
    excerpt: "«А — це абрикоса, що сонечком пахне з гілки…»",
  },
  {
    slug: "abetka-kartky",
    title: "Смачненька абетка — картки",
    price: "350 грн",
    priceValue: 350,
    audience: "Для дітей від 4 років",
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
