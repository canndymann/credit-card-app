import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavTabs from "@/components/NavTabs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Card Optimizer",
  description: "Find your best credit card for every purchase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 min-h-screen`}>
        <header className="sticky top-0 z-30 bg-gray-900/90 backdrop-blur border-b border-white/10">
          <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
            <span className="font-bold text-white text-lg">💳 Card Optimizer</span>
            <NavTabs />
          </div>
        </header>
        <main className="max-w-2xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
