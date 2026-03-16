import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, business, phone, pain } = body;

  if (!name || !business || !phone || !pain) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const timestamp = new Date().toISOString();

  // Store leads in a simple JSON file for now.
  // In production, this would go to Supabase or Google Sheets.
  // For MVP: we'll also log to console so we can check Vercel logs.
  console.log("NEW LEAD:", JSON.stringify({ timestamp, name, business, phone, pain }));

  // If GOOGLE_SHEETS_WEBHOOK is set, forward the lead there
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timestamp, name, business, phone, pain }),
      });
    } catch {
      console.error("Failed to forward lead to Google Sheets");
    }
  }

  return NextResponse.json({ success: true });
}
