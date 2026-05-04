import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import AmbientNetwork from "@/components/AmbientNetwork";


export const metadata: Metadata = {
  title: {
    default: "Arkhe Holdings",
    template: "%s | Arkhe Holdings",
  },
  description:
    "Strategic architecture for ventures across law, technology, media, and investments.",
  metadataBase: new URL("https://arkheholdings.net"),

  openGraph: {
    title: "Arkhe Holdings",
    description:
      "Shield. Structure. Launch. Strategic architecture for disciplined ventures.",
    url: "https://arkheholdings.net",
    siteName: "Arkhe Holdings",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Arkhe Holdings",
    description:
      "Strategic architecture for ventures across law, technology, media, and investments.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Arkhe Holdings",
    "url": "https://arkheholdings.net",
    "logo": "https://arkheholdings.net/arkhe-logo.jpeg",
    "description": "Strategic architecture for ventures across law, technology, media, and investments.",
    "founder": {
      "@type": "Person",
      "name": "Brian Salsbury",
      "jobTitle": "Founder",
      "url": "https://arkheholdings.net/founder",
    },
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "brian.salsbury@arkheholdings.net",
      "contactType": "General Inquiry",
      "url": "https://arkheholdings.net/contact",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#04070a] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <AmbientNetwork />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
