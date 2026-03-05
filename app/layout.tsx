import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/lib/providers/QueryProvider";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eco Verse",
  description: "Eco Verse | We Built Verses For You",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <QueryProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </QueryProvider>
      </body>
    </html>
  );
}
