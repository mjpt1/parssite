"use client";

import { motion } from "framer-motion";
import { Factory, Users } from "lucide-react";

type Row = {
  feature: string;
  dedicated: string;
  shared: string;
};

const ROWS: Row[] = [
  {
    feature: "مناسب برای",
    dedicated: "صاحبان زمین، کارخانه‌ها و کسب‌وکارهای پرمصرف",
    shared: "سرمایه‌گذارانی که زمین یا فضای کافی ندارند",
  },
  {
    feature: "محل احداث",
    dedicated: "زمین یا سقف ملک متقاضی",
    shared: "زمین و سایت‌های پارس انرژی",
  },
  {
    feature: "استفاده از برق تولیدی",
    dedicated: "مصرف مستقیم + فروش مازاد به شبکه",
    shared: "فروش کامل برق به شبکه",
  },
  {
    feature: "مالکیت پروژه",
    dedicated: "۱۰۰٪ متعلق به متقاضی",
    shared: "سهم مشخص بر اساس میزان سرمایه‌گذاری",
  },
  {
    feature: "مدیریت نیروگاه",
    dedicated: "با پشتیبانی کامل پارس انرژی",
    shared: "مدیریت کامل توسط تیم پارس انرژی",
  },
];

export default function ComparisonTable() {
  return (
    <section id="comparison" className="section-padding bg-background">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow">مقایسه</span>
          <h2 className="heading-2 mt-4">کدام مدل برای شما مناسب‌تر است؟</h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            تفاوت نیروگاه اختصاصی و مشارکتی را در یک نگاه ببینید.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft md:block">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="w-1/4 px-6 py-5 text-base font-bold">ویژگی</th>
                  <th className="w-[37.5%] px-6 py-5 text-base font-bold">
                    <span className="inline-flex items-center gap-2">
                      <Factory className="h-5 w-5 text-accent" />
                      نیروگاه اختصاصی
                    </span>
                  </th>
                  <th className="w-[37.5%] px-6 py-5 text-base font-bold">
                    <span className="inline-flex items-center gap-2">
                      <Users className="h-5 w-5 text-accent" />
                      نیروگاه مشارکتی
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-white" : "bg-slate-50/70"}
                  >
                    <td className="px-6 py-5 font-bold text-primary">{row.feature}</td>
                    <td className="border-r border-slate-100 px-6 py-5 leading-relaxed text-ink">
                      {row.dedicated}
                    </td>
                    <td className="border-r border-slate-100 px-6 py-5 leading-relaxed text-ink">
                      {row.shared}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards */}
          <div className="grid grid-cols-1 gap-6 md:hidden">
            {[
              { title: "نیروگاه اختصاصی", icon: Factory, key: "dedicated" as const },
              { title: "نیروگاه مشارکتی", icon: Users, key: "shared" as const },
            ].map(({ title, icon: Icon, key }) => (
              <div key={title} className="card overflow-hidden">
                <div className="flex items-center gap-2 bg-primary px-5 py-4 text-white">
                  <Icon className="h-5 w-5 text-accent" />
                  <h3 className="font-bold">{title}</h3>
                </div>
                <dl className="divide-y divide-slate-100">
                  {ROWS.map((row) => (
                    <div key={row.feature} className="px-5 py-4">
                      <dt className="text-sm font-bold text-muted">{row.feature}</dt>
                      <dd className="mt-1 leading-relaxed text-ink">{row[key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
