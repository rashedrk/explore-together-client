import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Explore Together",
  description: "A Travel Buddy finding website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <Providers>
        <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
      </Providers>
  );
}
