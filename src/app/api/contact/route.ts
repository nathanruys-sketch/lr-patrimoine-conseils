import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations/contact";
import { createLead } from "@/services/lead.service";
import { notifyLeadWebhook } from "@/lib/notify";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Formulaire invalide" }, { status: 400 });
  }

  const { name, email, phone, message } = parsed.data;

  await createLead({
    name,
    email,
    phone: phone || undefined,
    message,
    source: "CONTACT_FORM",
  });

  await notifyLeadWebhook({
    name,
    email,
    phone: phone || undefined,
    message,
    source: "Formulaire de contact",
  });

  return NextResponse.json({ success: true });
}
