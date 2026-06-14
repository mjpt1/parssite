/**
 * Lead notification email.
 *
 * Two providers are supported and chosen automatically based on which env
 * vars are present:
 *   1. Resend   -> RESEND_API_KEY
 *   2. SMTP     -> SMTP_HOST (via Nodemailer)
 *
 * If neither is configured the function logs the lead and resolves without
 * throwing, so submitting the form never fails just because email isn't set up.
 */

export type LeadNotification = {
  id?: number;
  name: string;
  phone: string;
  city: string;
  investmentType: string;
  powerUsage?: string | null;
  spaceSize?: string | null;
  description?: string | null;
  createdAt?: Date;
};

function buildHtml(lead: LeadNotification): string {
  const row = (label: string, value?: string | null) =>
    value
      ? `<tr>
           <td style="padding:8px 12px;background:#F1F5F9;font-weight:bold;color:#1E3A5F;white-space:nowrap;">${label}</td>
           <td style="padding:8px 12px;color:#2C2C2C;">${escapeHtml(value)}</td>
         </tr>`
      : "";

  return `
  <div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;background:#F8FAFC;padding:24px;">
    <div style="max-width:560px;margin:auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #E2E8F0;">
      <div style="background:linear-gradient(120deg,#1E3A5F,#2C5282);padding:20px 24px;color:#fff;">
        <h2 style="margin:0;font-size:18px;">☀️ درخواست مشاوره جدید — پارس انرژی</h2>
        <p style="margin:6px 0 0;opacity:.85;font-size:13px;">یک لید جدید از فرم ارزیابی رایگان ثبت شد.</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${row("نام و نام خانوادگی", lead.name)}
        ${row("شماره موبایل", lead.phone)}
        ${row("شهر", lead.city)}
        ${row("نوع سرمایه‌گذاری", lead.investmentType)}
        ${row("توان مصرف برق", lead.powerUsage)}
        ${row("متراژ زمین / سقف", lead.spaceSize)}
        ${row("توضیحات", lead.description)}
        ${row("کد لید", lead.id ? `#${lead.id}` : null)}
      </table>
      <div style="padding:14px 24px;color:#6B7280;font-size:12px;border-top:1px solid #E2E8F0;">
        این ایمیل به صورت خودکار از وب‌سایت پارس انرژی ارسال شده است.
      </div>
    </div>
  </div>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendLeadNotification(lead: LeadNotification): Promise<void> {
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM || "Pars Energy <onboarding@resend.dev>";
  const subject = `لید جدید: ${lead.name} — ${lead.investmentType}`;
  const html = buildHtml(lead);

  if (!to) {
    console.warn(
      "[email] LEAD_NOTIFICATION_EMAIL is not set — skipping notification. Lead:",
      lead
    );
    return;
  }

  // --- Option A: Resend ---
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({ from, to, subject, html });
    if (error) throw new Error(`Resend error: ${error.message}`);
    return;
  }

  // --- Option B: SMTP / Nodemailer ---
  if (process.env.SMTP_HOST) {
    const nodemailer = (await import("nodemailer")).default;
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    });
    await transport.sendMail({ from, to, subject, html });
    return;
  }

  console.warn(
    "[email] No email provider configured (set RESEND_API_KEY or SMTP_HOST). Lead:",
    lead
  );
}
