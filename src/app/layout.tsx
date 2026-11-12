import type { Metadata, Viewport } from "next";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const siteUrl = getSiteUrl();
const description =
  "Moon TV is a national cultural broadcaster showcasing storytelling and the positive representation of Nigeria.";
const socialImage = {
  url: "/og",
  width: 1200,
  height: 630,
  alt: "Moon TV - Stories that unite a nation",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Moon TV",
  title: {
    default: "Moon TV - Stories that unite a nation",
    template: "%s | Moon TV",
  },
  description,
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    siteName: "Moon TV",
    title: "Moon TV - Stories that unite a nation",
    description,
    url: siteUrl,
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moon TV - Stories that unite a nation",
    description,
    images: [socialImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050b07",
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
