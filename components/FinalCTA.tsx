"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Sun } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-3xl bg-solar-gradient px-6 py-16 text-center shadow-card md:px-16 md:py-20"
        >
          {/* Decorative glows */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <span className="relative grid mx-auto mb-6 h-16 w-16 place-items-center rounded-2xl bg-white/15 text-accent-light backdrop-blur">
            <Sun className="h-8 w-8" strokeWidth={2.4} />
          </span>

          <h2 className="relative mx-auto max-w-3xl text-balance text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-[2.75rem]">
            آمادهٔ سرمایه‌گذاری در انرژی خورشیدی هستید؟
          </h2>
          <p className="relative mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            همین حالا فرم ارزیابی رایگان را تکمیل کنید تا کارشناسان ما بهترین طرح را به شما پیشنهاد دهند.
          </p>

          <a
            href="#evaluation"
            className="btn relative mt-9 bg-white px-8 py-4 text-lg text-primary shadow-soft hover:bg-accent hover:text-primary-dark"
          >
            دریافت مشاوره رایگان
            <ChevronLeft className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
