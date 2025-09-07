import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "profile";
}

export function SEO({
  title = "QuIRI (Quantum Innovation and Research Institute)",
  description = "Academic networking platform for research collaboration and knowledge sharing",
  keywords = [
    "academic",
    "research",
    "networking",
    "collaboration",
    "university",
  ],
  image = "/logo.png",
  url = window.location.href,
  type = "website",
}: SEOProps) {
  const fullTitle =
    title === "QuIRI (Quantum Innovation and Research Institute)"
      ? title
      : `${title} | QuIRI (Quantum Innovation and Research Institute)`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta
        name="author"
        content="QuIRI (Quantum Innovation and Research Institute) Team"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta
        property="og:site_name"
        content="QuIRI (Quantum Innovation and Research Institute)"
      />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <link rel="canonical" href={url} />

      {/* Theme and App Tags */}
      <meta name="theme-color" content="#592c82" />
      <meta name="application-name" content="QuIRI" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="QuIRI" />
    </Helmet>
  );
}
