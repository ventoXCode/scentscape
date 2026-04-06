import { SITE_URL } from "@/lib/constants";

interface HowToStep {
  name: string;
  text: string;
}

interface HowToJsonLdProps {
  name: string;
  description: string;
  url: string;
  steps: HowToStep[];
  breadcrumbs: { name: string; url: string }[];
}

export function HowToJsonLd({
  name,
  description,
  url,
  steps,
  breadcrumbs,
}: HowToJsonLdProps) {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": `${SITE_URL}${url}#howto`,
    name,
    description,
    url: `${SITE_URL}${url}`,
    step: steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.url}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
