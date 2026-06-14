"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Sun, X } from "lucide-react";

const NAV_LINKS = [
  { label: "خدمات", href: "#services" },
  { label: "مقایسه", href: "#comparison" },
  { label: "مراحل همکاری", href: "#process" },
  { label: "اخبار", href: "#news" },
  { label: "تماس با ما", href: "#evaluation" },
];

function BrandMark({ scrolled }: { scrolled: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="پارس انرژی">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary-dark shadow-soft">
        <Sun className="h-6 w-6" strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-extrabold transition-colors ${
            scrolled ? "text-primary" : "text-white"
          }`}
        >
          پارس انرژی
        </span>
        <span
          className={`text-[11px] font-medium transition-colors ${
            scrolled ? "text-muted" : "text-white/70"
          }`}
        >
          PARS ENERGY
        </span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/85 shadow-soft backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex h-16 items-center justify-between md:h-20">
        <BrandMark scrolled={scrolled} />

        {/* Desktop menu */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-[15px] font-semibold transition-colors hover:text-accent ${
                  scrolled ? "text-ink" : "text-white/90"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#evaluation" className="btn-primary hidden md:inline-flex">
            فرم ارزیابی رایگان
          </a>

          {/* Hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            aria-expanded={open}
            className={`grid h-11 w-11 place-items-center rounded-xl transition-colors lg:hidden ${
              scrolled ? "bg-slate-100 text-primary" : "bg-white/15 text-white backdrop-blur"
            }`}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <ul className="container flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-semibold text-ink transition-colors hover:bg-slate-50 hover:text-accent-dark"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href="#evaluation"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  فرم ارزیابی رایگان
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
