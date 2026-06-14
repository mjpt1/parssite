import { z } from "zod";

/** Investment types offered by Pars Energy. */
export const INVESTMENT_TYPES = [
  "نیروگاه اختصاصی",
  "نیروگاه مشارکتی",
] as const;

/** Approximate power-usage buckets shown in the form. */
export const POWER_USAGE_OPTIONS = [
  "کمتر از ۱۰ کیلووات",
  "۱۰ تا ۵۰ کیلووات",
  "۵۰ تا ۲۰۰ کیلووات",
  "۲۰۰ تا ۵۰۰ کیلووات",
  "بیشتر از ۵۰۰ کیلووات",
] as const;

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/** Convert Persian/Arabic digits to their ASCII equivalents. */
export function normalizeDigits(input: string): string {
  return input.replace(/[۰-۹٠-٩]/g, (ch) => {
    const p = PERSIAN_DIGITS.indexOf(ch);
    if (p > -1) return String(p);
    const a = ARABIC_DIGITS.indexOf(ch);
    if (a > -1) return String(a);
    return ch;
  });
}

/** Normalize an Iranian mobile number to the local `09xxxxxxxxx` form. */
export function normalizePhone(input: string): string {
  let v = normalizeDigits(input).replace(/[\s\-()]/g, "");
  if (v.startsWith("+98")) v = "0" + v.slice(3);
  else if (v.startsWith("0098")) v = "0" + v.slice(4);
  else if (v.startsWith("98") && v.length === 12) v = "0" + v.slice(2);
  else if (/^9\d{9}$/.test(v)) v = "0" + v;
  return v;
}

export const evaluationSchema = z.object({
  name: z
    .string({ required_error: "نام و نام خانوادگی الزامی است" })
    .trim()
    .min(3, "نام و نام خانوادگی را کامل وارد کنید")
    .max(80, "نام بیش از حد طولانی است"),

  phone: z.preprocess(
    (v) => (typeof v === "string" ? normalizePhone(v) : v),
    z
      .string({ required_error: "شماره موبایل الزامی است" })
      .regex(/^09\d{9}$/, "شماره موبایل معتبر نیست (مثال: ۰۹۱۲۱۲۳۴۵۶۷)")
  ),

  city: z
    .string({ required_error: "شهر الزامی است" })
    .trim()
    .min(2, "نام شهر را وارد کنید")
    .max(50, "نام شهر بیش از حد طولانی است"),

  investmentType: z.enum(INVESTMENT_TYPES, {
    required_error: "نوع سرمایه‌گذاری را انتخاب کنید",
    invalid_type_error: "نوع سرمایه‌گذاری نامعتبر است",
  }),

  powerUsage: z
    .string({ required_error: "توان مصرف برق را انتخاب کنید" })
    .trim()
    .min(1, "توان مصرف برق را انتخاب کنید"),

  spaceSize: z
    .string()
    .trim()
    .max(50, "مقدار واردشده بیش از حد طولانی است")
    .optional()
    .or(z.literal("")),

  description: z
    .string()
    .trim()
    .max(1000, "توضیحات نباید بیش از ۱۰۰۰ کاراکتر باشد")
    .optional()
    .or(z.literal("")),
});

export type EvaluationInput = z.infer<typeof evaluationSchema>;
