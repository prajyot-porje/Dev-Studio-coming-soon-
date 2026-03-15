import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dev Studio — Launching Soon",
  description: "We build the web. You build the business."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
