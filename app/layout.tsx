import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Website Growth Checker",
    template: "%s | AI Website Growth Checker",
  },
  description:
    "A free growth audit tool for AI-built websites, micro SaaS, indie tools, and small online businesses.",
};

const navItems = [
  { href: "/audit", label: "Audit" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-950">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-md border border-slate-200 bg-slate-950 text-sm font-semibold text-white">
                AI
              </span>
              <span className="text-base font-semibold text-slate-950">
                AI Website Growth Checker
              </span>
            </Link>

            <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-slate-600">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-3 py-2 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/audit"
                className="rounded-md bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-700"
              >
                Start Free Audit
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 text-sm text-slate-600 sm:grid-cols-[1.4fr_1fr] lg:px-8">
            <div>
              <p className="font-semibold text-slate-950">
                AI Website Growth Checker
              </p>
              <p className="mt-3 max-w-xl leading-6">
                Free growth audits for AI-built websites, micro SaaS products,
                indie tools, and small online businesses that need practical
                traffic ideas before buying complex software.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3 sm:justify-end">
              <Link href="/privacy" className="hover:text-slate-950">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-slate-950">
                Terms
              </Link>
              <Link href="/audit" className="hover:text-slate-950">
                Run audit
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
