"use client";

import { motion } from "framer-motion";
import { Check, Factory, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  badge: string;
  title: string;
  description: string;
  benefits: string[];
  featured?: boolean;
};

const SERVICES: Service[] = [
  {
    icon: Factory,
    badge: "محبوب‌ترین",
    title: "نیروگاه خورشیدی اختصاصی",
    description: "نیروگاه روی زمین یا سقف ملک شما؛ مالکیت کامل و سود مستقیم.",
    benefits: [
      "تأمین برق پایدار",
      "فروش برق مازاد",
      "پیشگیری از جریمه مصرف",
      "بازگشت سرمایه سریع",
      "افزایش ارزش کسب‌وکار",
    ],
    featured: true,
  },
  {
    icon: Users,
    badge: "بدون نیاز به زمین",
    title: "نیروگاه خورشیدی مشارکتی",
    description: "سرمایه‌گذاری در نیروگاه‌های پارس انرژی بدون دغدغهٔ اجرا و مدیریت.",
    benefits: [
      "سرمایه‌گذاری بدون نیاز به زمین",
      "کاهش ریسک سرمایه‌گذاری",
      "مدیریت کامل توسط تیم متخصص",
      "سودآوری بلندمدت",
    ],
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Services() {
  return (
    <section id="services" className="section-padding bg-white">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
          <span className="eyebrow">خدمات ما</span>
          <h2 className="heading-2 mt-4">دو مسیر برای سرمایه‌گذاری خورشیدی</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            بسته به شرایط شما، بهترین مدل سرمایه‌گذاری در انرژی خورشیدی را انتخاب کنید.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-7 lg:grid-cols-2"
        >
          {SERVICES.map(({ icon: Icon, badge, title, description, benefits, featured }) => (
            <motion.article
              key={title}
              variants={card}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-white p-8 transition-all duration-300 hover:scale-[1.03] hover:shadow-glow md:p-10 ${
                featured ? "border-accent/40 shadow-card" : "border-slate-100 shadow-soft"
              }`}
            >
              <span
                className={`absolute inset-x-0 top-0 h-1.5 ${
                  featured ? "bg-accent" : "bg-primary/30"
                }`}
              />

              <div className="mb-6 flex items-center justify-between">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-primary/5 text-primary transition-colors duration-300 group-hover:bg-accent group-hover:text-primary-dark">
                  <Icon className="h-8 w-8" strokeWidth={2} />
                </span>
                <span className="rounded-full bg-accent/12 px-3 py-1 text-xs font-bold text-accent-dark">
                  {badge}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-primary">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{description}</p>

              <ul className="mt-7 space-y-3.5">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-dark">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="font-medium text-ink">{b}</span>
                  </li>
                ))}
              </ul>

              <a href="#evaluation" className="btn-primary mt-9 w-full">
                درخواست مشاوره
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
