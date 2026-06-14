import { Instagram, Linkedin, Mail, MapPin, Phone, Send, Sun } from "lucide-react";

const QUICK_LINKS = [
  { label: "خدمات", href: "#services" },
  { label: "مقایسه", href: "#comparison" },
  { label: "مراحل همکاری", href: "#process" },
  { label: "اخبار", href: "#news" },
  { label: "فرم ارزیابی", href: "#evaluation" },
];

const SOCIALS = [
  { label: "اینستاگرام", href: "#", icon: Instagram },
  { label: "لینکدین", href: "#", icon: Linkedin },
  { label: "تلگرام", href: "#", icon: Send },
];

export default function Footer() {
  const year = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date());

  return (
    <footer className="bg-primary-dark text-white/80">
      <div className="container py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-primary-dark">
                <Sun className="h-6 w-6" strokeWidth={2.5} />
              </span>
              <span className="text-lg font-extrabold text-white">پارس انرژی</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              همراه شما در مسیر سرمایه‌گذاری هوشمند در انرژی خورشیدی؛ از مشاوره تا اجرا و پشتیبانی.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 font-bold text-white">دسترسی سریع</h3>
            <ul className="space-y-3 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-accent">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-bold text-white">تماس با ما</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent" />
                <a href="tel:+982100000000" dir="ltr" className="transition-colors hover:text-accent">
                  ۰۲۱-۰۰۰۰۰۰۰۰
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:info@parsenergy.example" className="transition-colors hover:text-accent">
                  info@parsenergy.example
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>تهران، خیابان ولیعصر، پلاک ۰۰۰</span>
              </li>
            </ul>
          </div>

          {/* Social + CTA */}
          <div>
            <h3 className="mb-4 font-bold text-white">ما را دنبال کنید</h3>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white transition-colors hover:bg-accent hover:text-primary-dark"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <a href="#evaluation" className="btn-primary mt-6 w-full">
              مشاوره رایگان
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row">
          <p>© {year} پارس انرژی — تمامی حقوق محفوظ است.</p>
          <p>طراحی و توسعه با ☀️ برای آینده‌ای پاک</p>
        </div>
      </div>
    </footer>
  );
}
