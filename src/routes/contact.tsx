import { createFileRoute } from "@tanstack/react-router";
import { Send, Instagram, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SectionLabel } from "@/components/site/SectionLabel";
import { SocialList } from "@/components/site/SocialList";
import { authorSocials } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Контакти — Інґіґерда" },
      {
        name: "description",
        content:
          "Контакти Інґіґерди: Telegram @ingi_gerda, Instagram, Facebook, YouTube. Замовлення книг та запрошення на події.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
        <div className="mt-16">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">Соцмережі авторки</h2>
            <div className="mt-4 max-w-2xl">
              <SocialList items={authorSocials} />
            </div>
          </Reveal>
        </div>
  );
}
