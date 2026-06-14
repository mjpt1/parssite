"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck, CalendarCheck, HardHat, Headset } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Reason = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const REASONS: Reason[] = [
  {
    icon: Headset,
    title: "پشتیبانی آنلاین",
    desc: "کارشناسان ما در تمام مراحل همراه شما هستند.",
  },
  {
    icon: CalendarCheck,
    title: "۱۲ ماه پشتیبانی رایگان",
    desc: "یک سال خدمات پشتیبانی کامل بدون هزینه.",
  },
  {
    icon: HardHat,
    title: "تیم نصب مجرب",
    desc: "نصب استاندارد و سریع توسط متخصصان حرفه‌ای.",
  },
  {
    icon: BadgeCheck,
    title: "ضمانت اصالت تجهیزات",
    desc: "استفاده از پنل و اینورتر اصل و دارای گارانتی.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function WhyParsEnergy() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
              <Image
                src="/solar-panels.jpg"
                alt="نصب پنل‌های خورشیدی توسط تیم پارس انرژی"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 right-6 rounded-2xl bg-primary px-6 py-4 text-white shadow-card">
              <p className="text-3xl font-extrabold text-accent">+۵۰۰</p>
              <p className="text-sm text-white/80">پروژهٔ موفق</p>
            </div>
          </motion.div>

          {/* Reasons */}
          <div>
            <span className="eyebrow">چرا پارس انرژی؟</span>
            <h2 className="heading-2 mt-4">انتخابی مطمئن برای آینده انرژی</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              از مشاوره تا اجرا و پشتیبانی، در کنار شما هستیم تا با خیال راحت سرمایه‌گذاری کنید.
            </p>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
            >
              {REASONS.map(({ icon: Icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={item}
                  className="group flex gap-4 rounded-2xl border border-slate-100 bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/12 text-accent-dark transition-colors group-hover:bg-accent group-hover:text-primary-dark">
                    <Icon className="h-6 w-6" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="font-bold text-primary">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
