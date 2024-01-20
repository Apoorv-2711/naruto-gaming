import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import TanstackProvider from "@/providers/TanstackProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Welcome To Naruto Gaming",
  description: "Watch all your favourite anime for free on Naruto Gaming",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["anime", "naruto", "gaming", "narutogaming", "latest anime"],
  // themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </head>
      <body
        className={`${poppins.className} scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-900 scrollbar-thumb-rounded    scrollbar-thumb-opacity-50 scrollbar-track-opacity-50`}
      >
        <TanstackProvider>
          <NextTopLoader />
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
