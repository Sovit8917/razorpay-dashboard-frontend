const PAYMENT_BASE = process.env.NEXT_PUBLIC_RAZORPAY_BACKEND;

export async function createOrder(courseId: number, amount: number) {
  const res = await fetch(`${PAYMENT_BASE}/api/createOrder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courseId, amount }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Order creation failed");
  return data.data;
}

export async function verifyPayment(payload: {
  order_id: string;
  payment_id: string;
  signature: string;
}) {
  const res = await fetch(`${PAYMENT_BASE}/api/verifyPayment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Verification failed");
  return data;
}