import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import { site } from "@/data/site";
import { jsonLdScript, personJsonLd, webSiteJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.defaultTitle,
    template: site.seo.titleTemplate,
  },
  description: site.seo.defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: site.seo.defaultTitle,
    description: site.seo.defaultDescription,
    locale: site.locale,
    images: [
      {
        url: site.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.defaultTitle,
    description: site.seo.defaultDescription,
    images: [site.seo.ogImage],
  },
  robots:
    process.env.NEXT_PUBLIC_NOINDEX === "true"
      ? { index: false, follow: false }
      : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a1120" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7fb" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only z-50 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <script
          type="application/ld+json"
          // Serialized with escaping in jsonLdScript — safe by construction.
          dangerouslySetInnerHTML={{
            __html: jsonLdScript([personJsonLd(), webSiteJsonLd()]),
          }}
        />
      </body>
    </html>
  );
}
