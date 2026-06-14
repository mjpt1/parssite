"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  FileSignature,
  Gauge,
  PencilRuler,
  PhoneCall,
  SunMedium,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Step = {
  icon: LucideIcon;
  title: string;
};

const STEPS: Step[] = [
  { icon: ClipboardList, title: "ثبت درخواست" },
  { icon: PhoneCall, title: "ارزیابی اولیه" },
  { icon: Gauge, title: "بررسی فنی" },
  { icon: PencilRuler, title: "ارائه طرح" },
  { icon: FileSignature, title: "عقد قرارداد" },
  { icon: SunMedium, title: "اجرای نیروگاه" },
];

const FA_NUM = ["۰۱", "۰۲", "۰۳", "۰۴", "۰۵", "۰۶"];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const node = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

export default function ProcessTimeline() {
  return (
    <section id="process" className="section-padding bg-background">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-20">
          <span className="eyebrow">فرآیند کار</span>
          <h2 className="heading-2 mt-4">مراحل همکاری با پارس انرژی</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            از ثبت درخواست تا بهره‌برداری، در شش گام ساده.
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative hidden grid-cols-6 gap-4 lg:grid"
        >
          <div
            className="absolute top-9 h-0.5 bg-slate-200"
            style={{ right: "8.333%", left: "8.333%" }}
            aria-hidden="true"
          />
          {STEPS.map(({ icon: Icon, title }, i) => (
            <motion.li
              key={title}
              variants={node}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full border-2 border-accent bg-white text-primary shadow-soft transition-transform duration-300 hover:-translate-y-1">
                <Icon className="h-8 w-8" strokeWidth={2} />
                <span className="absolute -top-2 -left-2 grid h-7 w-7 place-items-center rounded-full bg-accent text-xs font-extrabold text-primary-dark shadow-soft">
                  {FA_NUM[i]}
                </span>
              </div>
              <h3 className="mt-5 text-base font-bold text-primary">{title}</h3>
            </motion.li>
          ))}
        </motion.ol>

        {/* Mobile/Tablet: vertical timeline */}
        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative space-y-7 lg:hidden"
        >
          <div
            className="absolute top-2 bottom-2 w-0.5 bg-slate-200"
            style={{ right: "1.75rem" }}
            aria-hidden="true"
          />
          {STEPS.map(({ icon: Icon, title }, i) => (
            <motion.li key={title} variants={node} className="relative flex items-center gap-5">
              <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-accent bg-white text-primary shadow-soft">
                <Icon className="h-6 w-6" strokeWidth={2} />
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-lg font-extrabold text-accent-dark">{FA_NUM[i]}</span>
                <h3 className="text-lg font-bold text-primary">{title}</h3>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
