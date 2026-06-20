# نصب روی هاست cPanel (CloudLinux / Node.js)

این پروژه **Next.js (Node.js)** است؛ پس در cPanel سراغ **«Setup Node.js App»** برو، نه «Setup Python App».

> اگر روی Vercel هم می‌خواهی بماند، مشکلی نیست؛ این روش مستقل است.

---

## ⚠️ سه نکتهٔ مهم قبل از شروع

1. **دیتابیس:** این پروژه اکنون برای **MySQL** تنظیم شده (`prisma/schema.prisma`). فقط کافی است در cPanel یک دیتابیس MySQL بسازی (گام ۱). اگر روزی خواستی روی PostgreSQL ببری، در `schema.prisma` پروایدر را به `postgresql` برگردان.
2. **نصب باید شامل devDependencies باشد.** برای `build` به ابزارهایی مثل TypeScript و Tailwind نیاز است. هنگام نصب، `NODE_ENV=production` نگذار، وگرنه این‌ها نصب نمی‌شوند و build شکست می‌خورد.
3. **دانلود موتور Prisma:** اگر هاست به `binaries.prisma.sh` دسترسی نداشت، قبل از نصب این را ست کن:
   ```bash
   export PRISMA_ENGINES_MIRROR="https://registry.npmmirror.com/-/binary/prisma"
   ```

---

## گام ۱ — دیتابیس MySQL بساز

> `schema.prisma` از قبل روی `provider = "mysql"` تنظیم شده؛ نیازی به تغییر کد نیست.

1. در cPanel → **MySQL® Databases**: یک **Database** بساز (مثلاً `pars`).
2. یک **User** بساز (با رمز قوی) و در بخش **Add User To Database** آن را با **ALL PRIVILEGES** به دیتابیس وصل کن.
3. connection string را بساز:
   ```
   mysql://CPUSER_dbuser:PASSWORD@localhost:3306/CPUSER_dbname
   ```

> نام database و user در cPanel معمولاً با نام کاربری هاست پیشوند می‌گیرند (مثل `myuser_pars`).
> اگر رمز کاراکتر خاص دارد (`@ : / #`)، باید URL-encode شود (مثلاً `@` → `%40`).

---

## گام ۲ — اپ Node.js بساز

cPanel → **Setup Node.js App** → **Create Application**:

| فیلد | مقدار |
|---|---|
| Node.js version | بالاترین نسخهٔ موجود (حداقل **18.17**؛ ترجیحاً 20) |
| Application mode | **Production** |
| Application root | مثلاً `parssite` |
| Application URL | دامنه یا ساب‌دامنه‌ات |
| Application startup file | `server.js` |

بعد از ساخت، cPanel یک دستور **«Enter to the virtual environment»** نشان می‌دهد؛ آن را نگه دار (برای گام ۶ لازم است). شبیه این است:
```bash
source /home/CPUSER/nodevenv/parssite/20/bin/activate && cd /home/CPUSER/parssite
```

---

## گام ۳ — کد را روی هاست بیاور

**روش A (پیشنهادی، اگر SSH/Terminal و git داری):**
```bash
cd ~
rm -rf parssite           # اگر cPanel پوشهٔ خالی ساخته
git clone https://github.com/mjpt1/parssite.git parssite
```

**روش B (بدون SSH):** پروژه را ZIP کن (بدون `node_modules` و `.next`)، در **File Manager** داخل پوشهٔ `parssite` آپلود و Extract کن. پوشهٔ `public/frames` (۲۴۱ فایل) حتماً باید بیاید.

> ⚠️ `node_modules` لوکال (ویندوزی) را آپلود نکن؛ باینری‌های Prisma/sharp مخصوص لینوکس باید روی خود هاست نصب شوند.

---

## گام ۴ — فایل server.js

این فایل در ریپو هست (`server.js`). اگر با ZIP آوردی و نبود، در ریشهٔ اپ بسازش:
```js
const { createServer } = require("http");
const next = require("next");
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(process.env.PORT || 3000);
});
```

---

## گام ۵ — متغیرهای محیطی

در صفحهٔ اپ Node.js → بخش **Environment variables**، اضافه کن:

| نام | مقدار |
|---|---|
| `DATABASE_URL` | همان رشتهٔ اتصال گام ۱ |
| `NODE_ENV` | `production` |
| `LEAD_NOTIFICATION_EMAIL` | (اختیاری) ایمیل دریافت لید |
| `RESEND_API_KEY` یا `SMTP_*` | (اختیاری) برای ارسال ایمیل |

> اگر `binaries.prisma.sh` فیلتر است، `PRISMA_ENGINES_MIRROR` را هم این‌جا اضافه کن.

---

## گام ۶ — نصب، Prisma، و build

از طریق **Terminal** (با دستور activate گام ۲) — مطمئن‌ترین راه:
```bash
source /home/CPUSER/nodevenv/parssite/20/bin/activate && cd /home/CPUSER/parssite

npm install              # شامل devDependencies (NODE_ENV را production نکن)
npx prisma generate
npx prisma db push       # جدول‌ها را در دیتابیس می‌سازد
npm run build            # خروجی production در .next
```

> اگر Terminal نداری: در صفحهٔ اپ Node.js دکمهٔ **Run NPM Install** را بزن، سپس در بخش **Run JS script** گزینهٔ `build` را اجرا کن. برای `prisma db push` معمولاً به Terminal نیاز است (در نبودش از طریق Vercel/لوکال هم می‌توان جدول‌ها را روی همان دیتابیس ساخت).

اگر هنگام build با کمبود حافظه (out of memory) مواجه شدی:
```bash
NODE_OPTIONS="--max-old-space-size=512" npm run build
```
یا build را لوکال بگیر و فقط پوشهٔ `.next` را آپلود کن (بعد از اینکه `npm install` روی هاست انجام شده باشد).

---

## گام ۷ — اجرا

به صفحهٔ اپ Node.js برگرد و **Restart** بزن. سپس دامنه را باز کن. ✅

برای دیدن لیدها: cPanel → **phpPgAdmin/phpMyAdmin** یا `npx prisma studio` (اگر Terminal و tunnel داری).

---

## رفع اشکال سریع

- **502/خطای Passenger:** معمولاً build انجام نشده یا `server.js` اشتباه است. لاگ: `~/parssite/stderr.log`.
- **خطای دیتابیس هنگام ارسال فرم:** `DATABASE_URL` غلط است یا `prisma db push` اجرا نشده.
- **`prisma: command not found`:** نصب با `NODE_ENV=production` انجام شده؛ دوباره با devDependencies نصب کن.
- **فونت/تصاویر نمی‌آید:** مطمئن شو `public/` کامل (به‌خصوص `frames/`) آپلود شده.
