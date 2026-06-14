import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { evaluationSchema } from "@/lib/validation";
import { sendLeadNotification } from "@/lib/email";

// Prisma and Nodemailer require the Node.js runtime (not Edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "داده‌های ارسالی نامعتبر است." },
      { status: 400 }
    );
  }

  const parsed = evaluationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "لطفاً خطاهای فرم را برطرف کنید.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        phone: data.phone,
        city: data.city,
        investmentType: data.investmentType,
        powerUsage: data.powerUsage || null,
        spaceSize: data.spaceSize || null,
        description: data.description || null,
      },
    });

    // Email notification must never block or fail the submission.
    try {
      await sendLeadNotification(lead);
    } catch (emailError) {
      console.error("[evaluation] notification email failed:", emailError);
    }

    return NextResponse.json(
      {
        success: true,
        id: lead.id,
        message: "درخواست شما با موفقیت ثبت شد. کارشناسان ما به‌زودی با شما تماس می‌گیرند.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[evaluation] failed to store lead:", error);
    return NextResponse.json(
      {
        success: false,
        message: "خطا در ثبت اطلاعات. لطفاً کمی بعد دوباره تلاش کنید.",
      },
      { status: 500 }
    );
  }
}
