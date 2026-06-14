import type { Metadata, Viewport } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-vazir",
});

const siteUrl = "https://parsenergy.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "پارس انرژی | سرمایه‌گذاری در نیروگاه خورشیدی",
    template: "%s | پارس انرژی",
  },
  description:
    "پارس انرژی، همراه شما در احداث نیروگاه خورشیدی اختصاصی و مشارکتی. کاهش هزینه برق، فروش برق به شبکه و بازگشت سرمایه کمتر از ۴ سال. مشاوره رایگان بگیرید.",
  keywords: [
    "نیروگاه خورشیدی",
    "انرژی خورشیدی",
    "پنل خورشیدی",
    "سرمایه‌گذاری خورشیدی",
    "فروش برق به شبکه",
    "پارس انرژی",
  ],
  authors: [{ name: "Pars Energy" }],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "پارس انرژی",
    title: "پارس انرژی | سرمایه‌گذاری هوشمند در انرژی خورشیدی",
    description:
      "احداث نیروگاه خورشیدی اختصاصی و مشارکتی با بازگشت سرمایه سریع. مشاوره رایگان.",
    images: [{ url: "/poster.jpg", width: 1920, height: 1080, alt: "پارس انرژی" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "پارس انرژی | سرمایه‌گذاری در انرژی خورشیدی",
    description: "احداث نیروگاه خورشیدی اختصاصی و مشارکتی با بازگشت سرمایه سریع.",
    images: ["/poster.jpg"],
  },
  icons: {
    icon: "/logo.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#1E3A5F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="bg-background text-ink">
        <a href="#evaluation" className="sr-only-focusable btn-primary fixed right-4 top-4 z-[100]">
          رفتن به فرم ارزیابی
        </a>
        {children}
      </body>
    </html>
  );
}
