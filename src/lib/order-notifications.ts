import { formatPesoAmount } from "@/lib/money";

export type OrderNotificationDetails = {
  id: string;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string | null;
  pickupTime: string;
  paymentMethod: string;
  totalAmount: number;
  status: string;
};

const statusMessages: Record<string, string> = {
  new: "Your order request has been received.",
  confirmed: "Your order has been confirmed.",
  ready: "Your order is ready for pickup.",
  completed: "Your order has been completed. Thank you!",
  cancelled: "Your order has been cancelled. Please contact the shop for details.",
};

const statusLabels: Record<string, string> = {
  new: "Received",
  confirmed: "Confirmed",
  ready: "Ready for Pickup",
  completed: "Completed",
  cancelled: "Cancelled",
};

function getOrderMessage(order: OrderNotificationDetails) {
  const statusMessage = statusMessages[order.status] ?? `Your order status is now ${order.status}.`;
  const paymentLabel = order.paymentMethod === "bank" ? "Bank Transfer" : "GCash";

  return `${statusMessage}\n\nOrder total: ${formatPesoAmount(order.totalAmount)}\nPickup: ${order.pickupTime}\nPayment: ${paymentLabel}\n\n- Ember & Bean`;
}

export async function sendOrderStatusNotifications(order: OrderNotificationDetails) {
  await Promise.allSettled([
    sendOrderEmail(order),
    sendOrderSms(order),
  ]);
}

async function sendOrderEmail(order: OrderNotificationDetails) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = order.customerEmail?.trim();

  if (!apiKey || !to) {
    return;
  }

  const subject = `Your Order Has Been ${statusLabels[order.status] ?? order.status}`;
  const message = getOrderMessage(order).replace(/\n/g, "<br />");
  const from = process.env.RESEND_FROM_EMAIL || "Ember & Bean <onboarding@resend.dev>";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#2B1E18"><h2>${subject}</h2><p>${message}</p></div>`,
    }),
  });
}

async function sendOrderSms(order: OrderNotificationDetails) {
  const apiKey = process.env.SEMAPHORE_API_KEY;
  const number = order.customerPhone?.trim();

  if (!apiKey || !number) {
    return;
  }

  const body = new URLSearchParams({
    apikey: apiKey,
    number,
    message: getOrderMessage(order),
  });

  const senderName = process.env.SEMAPHORE_SENDER_NAME;

  if (senderName) {
    body.set("sendername", senderName);
  }

  await fetch("https://api.semaphore.co/api/v4/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
}
