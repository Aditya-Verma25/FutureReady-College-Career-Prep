import crypto from "node:crypto";
import Stripe from "stripe";
import { saveOrder, updateOrder } from "../lib/storage/reportStore";
import type { ReportIntake, ReportOrderRecord } from "../lib/types";

function getBaseUrl(req: { headers: Record<string, string | string[] | undefined> }) {
  const origin = req.headers.origin;
  if (typeof origin === "string") return origin;
  const host = req.headers.host;
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  return `${protocol}://${host}`;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const intake = req.body as ReportIntake;
  if (!intake?.studentName || !intake?.email || !intake?.intendedMajor) {
    return res.status(400).json({ message: "Missing required intake fields." });
  }

  const orderId = crypto.randomUUID();
  const order: ReportOrderRecord = {
    orderId,
    createdAt: new Date().toISOString(),
    intake,
    paymentStatus: "pending",
    reportGenerationStatus: "pending_payment",
    emailSentStatus: "pending",
  };
  await saveOrder(order);

  const baseUrl = getBaseUrl(req);
  const successUrl = `${baseUrl}/#/report-success?orderId=${encodeURIComponent(orderId)}&session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${baseUrl}/#/report`;

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripePriceId = process.env.STRIPE_PRICE_ID;

  if (!stripeSecretKey || !stripePriceId) {
    // TODO: Configure Stripe credentials:
    // STRIPE_SECRET_KEY
    // STRIPE_PRICE_ID (one-time product price ID)
    // STRIPE_WEBHOOK_SECRET
    const token = crypto.randomBytes(16).toString("hex");
    await updateOrder(orderId, { paymentSessionId: `placeholder_${token}` });
    return res.status(200).json({
      checkoutUrl: `${baseUrl}/#/report-success?orderId=${encodeURIComponent(orderId)}&token=${token}`,
      placeholderMode: true,
    });
  }

  const stripe = new Stripe(stripeSecretKey);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: stripePriceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: intake.email,
    metadata: { orderId },
  });

  await updateOrder(orderId, { paymentSessionId: session.id });
  return res.status(200).json({ checkoutUrl: session.url });
}
