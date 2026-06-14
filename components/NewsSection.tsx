"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays } from "lucide-react";

type Article = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
};

const ARTICLES: Article[] = [
  {
    title: "مشترکان پرمصرف چگونه برق خود را تأمین کنند",
    excerpt:
      "راهکارهای عملی برای صنایع و کسب‌وکارهای پرمصرف جهت کاهش هزینه و جلوگیری از جریمهٔ مصرف برق.",
    category: "تحلیل",
    date: "۱۴۰۳/۰۳/۲۱",
    image: "/solar-field.jpg",
  },
  {
    title: "انتشار گواهی برق تجدیدپذیر",
    excerpt:
      "گواهی برق تجدیدپذیر چیست و چگونه می‌تواند به ارزش‌آفرینی برای نیروگاه‌های خورشیدی کمک کند.",
    category: "اخبار",
    date: "۱۴۰۳/۰۲/۰۹",
    image: "/solar-panels.jpg",
  },
  {
    title: "تسهیلات احداث نیروگاه خورشیدی",
    excerpt:
      "آخرین تسهیلات و وام‌های حمایتی برای سرمایه‌گذاری و احداث نیروگاه‌های خورشیدی در کشور.",
    category: "سرمایه‌گذاری",
    date: "۱۴۰۳/۰۱/۱۵",
    image: "/poster.jpg",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function NewsSection() {
  return (
    <section id="news" className="section-padding bg-background">
      <div className="container">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="eyebrow">اخبار و مقالات</span>
            <h2 className="heading-2 mt-4">تازه‌ترین‌های دنیای انرژی خورشیدی</h2>
          </div>
          <a
            href="#news"
            className="inline-flex items-center gap-2 font-bold text-primary transition-colors hover:text-accent-dark"
          >
            مشاهده همه
            <ArrowLeft className="h-4 w-4" />
          </a>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {ARTICLES.map((article) => (
            <motion.article
              key={article.title}
              variants={card}
              className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary-dark shadow-soft">
                  {article.category}
                </span>
              </div>

              <div className="p-6">
                <p className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted">
                  <CalendarDays className="h-4 w-4" />
                  {article.date}
                </p>
                <h3 className="text-lg font-bold leading-snug text-primary transition-colors group-hover:text-accent-dark">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{article.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent-dark">
                  ادامه مطلب
                  <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
