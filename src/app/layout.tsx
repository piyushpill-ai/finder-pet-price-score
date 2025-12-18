import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Finder Price Score Indicator | Pet Insurance Comparison",
  description: "Get an instant indicative price score for pet insurance based on your pet's profile. Compare relative costs across different providers in Australia.",
  keywords: ["pet insurance", "pet insurance comparison", "finder", "dog insurance", "cat insurance", "Australia", "price comparison"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
