import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://app.wuwai.org"),
  title: "Wuwai | Be You",
  description: "Breng lichaam, geest en ziel samen. Groei in energie, balans en bewustzijn.",
  icons: {
    icon: "/wuwai-logo.png",
    shortcut: "/wuwai-logo.png",
  },
  openGraph: {
    title: "Wuwai | Be You",
    description: "Alles zit al in je, laat het samenwerken.",
    images: [{ url: "/og.png", width: 1536, height: 1024, alt: "Wuwai, groei in energie, balans en bewustzijn" }],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wuwai | Be You",
    description: "Alles zit al in je, laat het samenwerken.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
