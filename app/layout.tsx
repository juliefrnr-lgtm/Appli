import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Let's Trail",
  description: "Ton espace personnel pour courir, progresser et préparer tes aventures."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
