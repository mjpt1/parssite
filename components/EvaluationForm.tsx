"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Factory,
  Loader2,
  PhoneCall,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  evaluationSchema,
  INVESTMENT_TYPES,
  POWER_USAGE_OPTIONS,
  type EvaluationInput,
} from "@/lib/validation";

const INVESTMENT_ICONS = {
  "نیروگاه اختصاصی": Factory,
  "نیروگاه مشارکتی": Users,
} as const;

const HIGHLIGHTS = [
  "مشاورهٔ کاملاً رایگان و بدون تعهد",
  "تماس کارشناسان در کمتر از ۲۴ ساعت",
  "پیشنهاد طرح متناسب با شرایط شما",
];

const inputBase =
  "w-full rounded-xl border bg-white px-4 py-3 text-ink outline-none transition placeholder:text-muted/60 focus:ring-4 focus:ring-accent/15";

function fieldClass(hasError: boolean) {
  return `${inputBase} ${hasError ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:border-accent"}`;
}

export default function EvaluationForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EvaluationInput>({
    resolver: zodResolver(evaluationSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      powerUsage: "",
      spaceSize: "",
      description: "",
    },
  });

  const onSubmit = async (data: EvaluationInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/evaluation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setServerError(json?.message ?? "خطا در ثبت اطلاعات. دوباره تلاش کنید.");
        return;
      }
      setSubmitted(true);
      reset();
    } catch {
      setServerError("ارتباط با سرور برقرار نشد. لطفاً اتصال خود را بررسی کنید.");
    }
  };

  return (
    <section id="evaluation" className="section-padding bg-background">
      <div className="container">
        <div className="grid items-stretch gap-10 lg:grid-cols-5">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <span className="eyebrow">فرم ارزیابی رایگان</span>
            <h2 className="heading-2 mt-4">چند قدم تا نیروگاه خورشیدی شما</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              اطلاعات خود را وارد کنید تا کارشناسان پارس انرژی پس از بررسی، بهترین طرح سرمایه‌گذاری را
              به شما ارائه دهند.
            </p>

            <ul className="mt-8 space-y-4">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-dark">
                    <ShieldCheck className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                  <span className="font-medium text-ink">{h}</span>
                </li>
              ))}
            </ul>

            <a
              href="tel:+982100000000"
              className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-soft transition-colors hover:border-accent"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-accent">
                <PhoneCall className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">تماس مستقیم</span>
                <span dir="ltr" className="block font-bold text-primary">
                  ۰۲۱-۰۰۰۰۰۰۰۰
                </span>
              </span>
            </a>
          </motion.div>

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="card p-6 md:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-11 w-11" />
                  </span>
                  <h3 className="mt-6 text-2xl font-extrabold text-primary">
                    درخواست شما ثبت شد!
                  </h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-muted">
                    از اعتماد شما سپاسگزاریم. کارشناسان پارس انرژی به‌زودی با شما تماس می‌گیرند.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="btn-outline mt-8"
                  >
                    ثبت درخواست جدید
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-bold text-primary">
                      نام و نام خانوادگی <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="مثال: علی رضایی"
                      className={fieldClass(!!errors.name)}
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Phone + City */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-sm font-bold text-primary">
                        شماره موبایل <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="tel"
                        dir="ltr"
                        placeholder="09121234567"
                        className={`${fieldClass(!!errors.phone)} text-left`}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="city" className="mb-2 block text-sm font-bold text-primary">
                        شهر <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="city"
                        type="text"
                        placeholder="مثال: تهران"
                        className={fieldClass(!!errors.city)}
                        {...register("city")}
                      />
                      {errors.city && (
                        <p className="mt-1.5 text-sm text-red-500">{errors.city.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Investment type */}
                  <div>
                    <span className="mb-2 block text-sm font-bold text-primary">
                      نوع سرمایه‌گذاری <span className="text-red-500">*</span>
                    </span>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {INVESTMENT_TYPES.map((type) => {
                        const Icon = INVESTMENT_ICONS[type];
                        return (
                          <label
                            key={type}
                            className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 transition-all hover:border-accent/60 has-[:checked]:border-accent has-[:checked]:bg-accent/10 has-[:checked]:ring-2 has-[:checked]:ring-accent/30"
                          >
                            <input
                              type="radio"
                              value={type}
                              className="sr-only"
                              {...register("investmentType")}
                            />
                            <Icon className="h-5 w-5 text-accent-dark" />
                            <span className="font-bold text-ink">{type}</span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.investmentType && (
                      <p className="mt-1.5 text-sm text-red-500">
                        {errors.investmentType.message}
                      </p>
                    )}
                  </div>

                  {/* Power usage */}
                  <div>
                    <label htmlFor="powerUsage" className="mb-2 block text-sm font-bold text-primary">
                      توان مصرف برق تقریبی <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="powerUsage"
                      className={fieldClass(!!errors.powerUsage)}
                      defaultValue=""
                      {...register("powerUsage")}
                    >
                      <option value="" disabled>
                        یک گزینه را انتخاب کنید
                      </option>
                      {POWER_USAGE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {errors.powerUsage && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.powerUsage.message}</p>
                    )}
                  </div>

                  {/* Space size (optional) */}
                  <div>
                    <label htmlFor="spaceSize" className="mb-2 block text-sm font-bold text-primary">
                      متراژ زمین یا سقف{" "}
                      <span className="font-medium text-muted">(اختیاری)</span>
                    </label>
                    <input
                      id="spaceSize"
                      type="text"
                      placeholder="مثال: ۵۰۰ متر مربع"
                      className={fieldClass(!!errors.spaceSize)}
                      {...register("spaceSize")}
                    />
                    {errors.spaceSize && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.spaceSize.message}</p>
                    )}
                  </div>

                  {/* Description (optional) */}
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block text-sm font-bold text-primary"
                    >
                      توضیحات <span className="font-medium text-muted">(اختیاری)</span>
                    </label>
                    <textarea
                      id="description"
                      rows={4}
                      placeholder="هرگونه توضیح یا سؤالی دارید بنویسید..."
                      className={`${fieldClass(!!errors.description)} resize-none`}
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.description.message}</p>
                    )}
                  </div>

                  {serverError && (
                    <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        در حال ارسال...
                      </>
                    ) : (
                      "ارسال درخواست مشاوره"
                    )}
                  </button>

                  <p className="text-center text-xs leading-relaxed text-muted">
                    با ارسال این فرم، با تماس کارشناسان پارس انرژی موافقت می‌کنید.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
