import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/components/FavoritesContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Product Explorer Dashboard",
  description:
    "Explore products with search, filtering, infinite scroll, and favorites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full bg-background text-foreground antialiased`}
      >
        <FavoritesProvider>
          <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
            <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
              <div className="mx-auto flex container items-center justify-between px-4 py-3 md:px-0">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    PE
                  </span>
                  <Link href={'/'} className="flex flex-col">
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                      Product Explorer
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Frontend Technical Assignment
                    </span>
                  </Link>
                </div>
                <ThemeSwitcher />
              </div>
            </header>
            <main className="flex flex-1">
              {children}
            </main>
          </div>
        </FavoritesProvider>
      </body>
    </html>
  );
}

