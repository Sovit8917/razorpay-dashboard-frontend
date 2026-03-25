import { getSession } from "next-auth/react";

function extractError(data: any): string {
  if (typeof data.message === "string") return data.message;
  if (Array.isArray(data.message)) {
    return data.message
      .map((m: any) => (typeof m === "string" ? m : m?.message || JSON.stringify(m)))
      .join(", ");
  }
  return JSON.stringify(data);
}

export async function createOrder(planId: string, amount: number) {
  const session = await getSession();

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/orders/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({ planId, amount }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(extractError(data));
  return data.data; // { order_id, amount, currency }
}

export async function verifyPayment(payload: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) {
  const session = await getSession();

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/orders/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(extractError(data));
  return data;
}