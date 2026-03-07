import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}

const DEFAULT_OG_IMAGE = "https://cybinenterprises.com/assets/cybin-logo.png";

/**
 * Dynamically updates page-level SEO meta tags on route changes.
 * Sets title, meta description, canonical URL, and Open Graph / Twitter tags.
 */
export function useSeo({ title, description, canonical, ogImage }: SeoProps) {
  useEffect(() => {
    // Page title
    document.title = title;

    // Meta description
    let desc = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    if (!desc) {
      desc = document.createElement("meta");
      desc.setAttribute("name", "description");
      document.head.appendChild(desc);
    }
    desc.setAttribute("content", description);

    // Canonical link
    let canon = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (!canon) {
      canon = document.createElement("link");
      canon.setAttribute("rel", "canonical");
      document.head.appendChild(canon);
    }
    canon.setAttribute("href", `https://cybinenterprises.com${canonical}`);

    // Open Graph tags
    const setOgMeta = (property: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(
        `meta[property="${property}"]`,
      );
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setOgMeta("og:title", title);
    setOgMeta("og:description", description);
    setOgMeta("og:url", `https://cybinenterprises.com${canonical}`);
    setOgMeta("og:type", "website");
    setOgMeta("og:image", ogImage ?? DEFAULT_OG_IMAGE);

    // Twitter tags
    const setTwitterMeta = (name: string, content: string) => {
      let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setTwitterMeta("twitter:title", title);
    setTwitterMeta("twitter:description", description);
    setTwitterMeta("twitter:card", "summary_large_image");
    setTwitterMeta("twitter:image", ogImage ?? DEFAULT_OG_IMAGE);
  }, [title, description, canonical, ogImage]);
}
