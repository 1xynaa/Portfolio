import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anagha Mithra — Security Engineering & Full-Stack Development",
  description:
    "Anagha Mithra Ainippully Remith is a Computer Science and Cybersecurity student at SRMIST, exploring security engineering, full-stack development, and digital investigations.",
  openGraph: {
    type: "website",
    title: "Anagha Mithra — Security Engineering & Full-Stack Development",
    description:
      "Building software, exploring security, and investigating what happens beneath the interface.",
  },
  twitter: {
    card: "summary",
    title: "Anagha Mithra — Security Engineering & Full-Stack Development",
    description:
      "Building software, exploring security, and investigating what happens beneath the interface.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
