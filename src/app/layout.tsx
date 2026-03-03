import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moon TV - Stories that unite a nation",
  description: "Moon TV is a national cultural broadcaster showcasing storytelling and the positive representation of Nigeria.",
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
