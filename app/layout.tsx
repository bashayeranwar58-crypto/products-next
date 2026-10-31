import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { auth } from "@/auth";
import Link from "next/link";
import { UserMenu } from "@/components/UserMenu";
import { AddProductButton } from "@/components/AddProductButton";

const inter = Inter({ subsets: ["latin"] });

// Metadata for the entire application
export const metadata: Metadata = {
  title: "LR Products | Store",
  description: "Управление товарами - Лабораторная работа 3",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the current user session on the server
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-gray-900`}>
        <Providers>

          {/* ================= Top Navbar (Header) ================= */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">

              {/* Logo */}
              <Link href="/" className="text-2xl font-black tracking-widest text-blue-900 uppercase">
                LR Products
              </Link>

              {/* Navigation Links (Center) */}
              <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-gray-600">
                <Link href="/" className="hover:text-blue-600 transition-colors">ALL PRODUCTS</Link>
                <Link href="/?category=face" className="hover:text-blue-600 transition-colors">FACE</Link>
                <Link href="/?category=lip" className="hover:text-blue-600 transition-colors">LIP</Link>
                <Link href="/?category=eye" className="hover:text-blue-600 transition-colors">EYE</Link>
                <Link href="/?category=nail" className="hover:text-blue-600 transition-colors">NAIL</Link>
              </nav>

              {/* Icons (Right) */}
              <div className="flex items-center gap-6 text-gray-700">

                {/* Search Icon */}
                <button className="hover:text-blue-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>

                {/* User Icon / Login */}
                {session?.user ? (
                  <UserMenu user={session.user} />
                ) : (
                  <Link href="/login" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <span className="text-sm font-bold hidden md:inline">Войти</span>
                  </Link>
                )}

                {/* Add Product Button (+ icon) - Only visible for logged-in users */}
                {session?.user && <AddProductButton />}

                {/* Cart Icon */}
                <button className="hover:text-blue-600 transition-colors relative">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </header>

          {/* Render page content */}
          {children}

        </Providers>
      </body>
    </html>
  );
}