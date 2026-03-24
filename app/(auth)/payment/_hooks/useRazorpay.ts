import { createOrder, verifyPayment } from "@/lib/payment";
import { toast } from "sonner";
export function useRazorpay() {
  const loadScript = () =>
    new Promise<boolean>((resolve) => {
      if (document.querySelector('script[src*="razorpay"]')) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const pay = async (price: number, itemName: string) => {
    await loadScript();
    const order = await createOrder(1, price);

    const rzp = new (window as any).Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Sovit Courses",
      description: itemName,
      order_id: order.id,
      handler: async (response: any) => {
        const result = await verifyPayment({
          order_id: response.razorpay_order_id,
          payment_id: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });
        if (result.success) {
  toast.success("Payment Successful");
} else {
  toast.error("Payment Failed");
}
      },
      theme: { color: "#2563eb" },
    });

    rzp.open();
  };

  return { pay };
}