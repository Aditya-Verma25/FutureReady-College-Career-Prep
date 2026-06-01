import Stripe from "stripe";
import { updateOrder } from "../lib/storage/reportStore";
import { generateAndSendReport } from "../lib/report/processOrder";

async function readRawBody(req: any): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).send("Method not allowed");

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripeSecretKey || !stripeWebhookSecret) {
    // TODO: Configure STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET.
    return res.status(200).send("Webhook placeholder mode");
  }

  const signature = req.headers["stripe-signature"];
  if (!signature) return res.status(400).send("Missing stripe signature");

  const stripe = new Stripe(stripeSecretKey);
  const rawBody = await readRawBody(req);
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, stripeWebhookSecret);
  } catch {
    return res.status(400).send("Invalid webhook signature");
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (orderId && session.payment_status === "paid") {
      await updateOrder(orderId, { paymentStatus: "paid", reportGenerationStatus: "paid", paymentSessionId: session.id });
      try {
        await generateAndSendReport(orderId);
      } catch (error) {
        console.error("Webhook report generation error", error);
      }
    }
  }

  return res.status(200).send("ok");
}
