type LeadNotificationPayload = {
  name: string;
  email: string;
  phone?: string;
  message: string;
  source: string;
};

export async function notifyLeadWebhook(payload: LeadNotificationPayload) {
  const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!webhookUrl) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("N8N lead webhook failed", error);
  }
}
