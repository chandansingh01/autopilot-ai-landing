import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, business, phone, pain } = body;

  if (!name || !business || !phone || !pain) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const timestamp = new Date().toISOString();
  const lead = { timestamp, name, business, phone, pain };

  // Always log (visible in Vercel function logs)
  console.log("NEW LEAD:", JSON.stringify(lead));

  // 1. Store in Supabase if configured
  if (supabase) {
    try {
      await supabase.from("leads").insert([{
        name,
        business,
        phone,
        pain_point: pain,
        source: "landing_page",
        status: "new",
        created_at: timestamp,
      }]);
    } catch (err) {
      console.error("Supabase insert failed:", err);
    }
  }

  // 2. Forward to Google Sheets webhook if configured
  const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK;
  if (sheetsWebhook) {
    try {
      await fetch(sheetsWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch {
      console.error("Google Sheets webhook failed");
    }
  }

  // 3. Send email notification via Resend (free tier: 100 emails/day)
  const resendKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL || "init.chandan@gmail.com";
  if (resendKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: "AutoPilot AI <leads@autopilotai.in>",
          to: [notifyEmail],
          subject: `New Lead: ${name} — ${business}`,
          html: `
            <h2>New Lead from AutoPilot AI</h2>
            <table style="border-collapse:collapse;width:100%;max-width:500px;">
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Name</td><td style="padding:8px;border-bottom:1px solid #eee;">${name}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">Business</td><td style="padding:8px;border-bottom:1px solid #eee;">${business}</td></tr>
              <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;">WhatsApp</td><td style="padding:8px;border-bottom:1px solid #eee;"><a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}">${phone}</a></td></tr>
              <tr><td style="padding:8px;font-weight:600;">Pain Point</td><td style="padding:8px;">${pain}</td></tr>
            </table>
            <p style="margin-top:16px;color:#888;font-size:12px;">Reply to this lead within 24 hours on WhatsApp.</p>
          `,
        }),
      });
    } catch {
      console.error("Resend email notification failed");
    }
  }

  return NextResponse.json({ success: true });
}
