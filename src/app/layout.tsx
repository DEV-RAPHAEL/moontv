import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Moon TV - Stories that unite a nation",
    template: "%s | Moon TV",
  },
  description: "Moon TV is a national cultural broadcaster showcasing storytelling and the positive representation of Nigeria.",
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    siteName: "Moon TV",
    title: "Moon TV - Stories that unite a nation",
    description: "Moon TV is a national cultural broadcaster showcasing storytelling and the positive representation of Nigeria.",
    url: siteUrl,
    images: [{ url: "/hero_bg.jpg", alt: "Moon TV" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moon TV - Stories that unite a nation",
    description: "Moon TV is a national cultural broadcaster showcasing storytelling and the positive representation of Nigeria.",
    images: ["/hero_bg.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
