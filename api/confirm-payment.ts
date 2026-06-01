import Stripe from "stripe";
import { getOrderById, updateOrder } from "../lib/storage/reportStore";
import { generateAndSendReport } from "../lib/report/processOrder";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { orderId, sessionId, token } = (req.body ?? {}) as { orderId?: string; sessionId?: string; token?: string };
  if (!orderId) return res.status(400).json({ message: "orderId is required." });

  const order = await getOrderById(orderId);
  if (!order) return res.status(404).json({ message: "Order not found." });
  if (order.paymentStatus === "paid") return res.status(200).json({ message: "Payment already confirmed." });

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (stripeSecretKey && sessionId) {
    const stripe = new Stripe(stripeSecretKey);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return res.status(400).json({ message: "Payment not completed yet." });
    }
    await updateOrder(orderId, {
      paymentStatus: "paid",
      paymentSessionId: session.id,
      reportGenerationStatus: "paid",
    });
  } else {
    // Placeholder mode: this confirms payment for local/dev flow only.
    // TODO: Remove placeholder mode in production once Stripe is configured.
    if (!token) return res.status(400).json({ message: "Missing placeholder payment token." });
    await updateOrder(orderId, { paymentStatus: "paid", reportGenerationStatus: "paid" });
  }

  try {
    await generateAndSendReport(orderId);
    return res.status(200).json({ message: "Payment confirmed and report workflow started." });
  } catch (error) {
    console.error("Report generation failed", error);
    return res.status(200).json({ message: "Payment confirmed. Report is being prepared." });
  }
}
