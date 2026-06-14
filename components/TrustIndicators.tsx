"use client";

import { motion } from "framer-motion";
import { Building2, ShieldCheck, TrendingUp, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Indicator = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

const INDICATORS: Indicator[] = [
  {
    icon: TrendingUp,
    title: "بازگشت سرمایه کمتر از ۴ سال",
    desc: "سودآوری ملموس در کوتاه‌ترین زمان ممکن",
  },
  {
    icon: Zap,
    title: "فروش برق به شبکه",
    desc: "درآمدزایی پایدار از برق مازاد تولیدی",
  },
  {
    icon: ShieldCheck,
    title: "کاهش وابستگی به خاموشی",
    desc: "تأمین برق مطمئن و مستقل از شبکه",
  },
  {
    icon: Building2,
    title: "افزایش ارزش ملک",
    desc: "ارتقای ارزش دارایی و کسب‌وکار شما",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function TrustIndicators() {
  return (
    <section className="section-padding bg-background">
      <div className="container">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {INDICATORS.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              variants={item}
              className="group card flex flex-col items-start gap-4 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
            >
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/12 text-accent-dark transition-colors duration-300 group-hover:bg-accent group-hover:text-primary-dark">
                <Icon className="h-7 w-7" strokeWidth={2.2} />
              </span>
              <h3 className="text-lg font-bold leading-snug text-primary">{title}</h3>
              <p className="text-sm leading-relaxed text-muted">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
