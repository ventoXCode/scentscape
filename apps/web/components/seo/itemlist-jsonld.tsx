import { SITE_URL } from "@/lib/constants";

interface ItemListItem {
  name: string;
  url: string;
  image?: string;
  position?: number;
}

interface ItemListJsonLdProps {
  name: string;
  description: string;
  url: string;
  items: ItemListItem[];
}

/** Schema.org ItemList for product listing pages — enables rich results in search. */
export function ItemListJsonLd({ name, description, url, items }: ItemListJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}${url}#itemlist`,
    name,
    description,
    url: `${SITE_URL}${url}`,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: item.position ?? i + 1,
      url: `${SITE_URL}${item.url}`,
      name: item.name,
      ...(item.image ? { image: item.image } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
