import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/staff", label: "Staff" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useRouter();

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/mia.png" alt="MIA Learning Center" className="h-12 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-150 ${
                  pathname === href
                    ? "bg-brand-blue text-white"
                    : "text-gray-600 hover:bg-blue-50 hover:text-brand-blue"
                }`}
              >
                {label}
              </Link>
            ))}
            <Link href="/register" className="ml-4 btn-primary text-sm py-2 px-5">
              ✏️ Register
            </Link>
          </nav>

          <button
            type="button"
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 pt-2 space-y-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-xl font-bold transition-colors ${
                pathname === href
                  ? "bg-brand-blue text-white"
                  : "text-gray-600 hover:bg-blue-50 hover:text-brand-blue"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link href="/register" onClick={() => setOpen(false)} className="block text-center btn-primary mt-2">
            ✏️ Register
          </Link>
        </div>
      )}
    </header>
  );
}
