/**
 * Renders a JSON-LD structured data script tag for SEO purposes.
 * Used to inject BreadcrumbList, FAQPage, Person, etc. schemas.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted JSON-LD data only
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
