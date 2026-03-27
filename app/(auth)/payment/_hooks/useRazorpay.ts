import { createOrder, verifyPayment } from "@/lib/payment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useRazorpay(onSuccess?: () => void) {
  const router = useRouter();
  const loadScript = () =>
    new Promise<boolean>((resolve) => {
      if (document.querySelector('script[src*="razorpay"]'))
        return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const pay = async (price: number, planId: string, itemName: string) => {
    await loadScript();

    let order;
    try {
      order = await createOrder(planId, price);
      console.log("ORDER FROM BACKEND:", order);
    } catch (err: any) {
      toast.error(err.message || "Failed to create order");
      return;
    }

    const rzp = new (window as any).Razorpay({
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Subscription Plan",
      description: itemName,
      order_id: order.order_id,
      
      handler: async (response: any) => {
        console.log("Razorpay Response:", response);

        try {
          const result = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });
if (result.data?.message) {
            toast.success("Payment Successful");
             onSuccess?.();
             router.push("/premium");
          } else {
            toast.error("Payment Failed");
          }
        } catch (err: any) {
          toast.error(err.message || "You Have Already Purchased This Plan");
        }
      },
      theme: { color: "#7c3aed" },
    });

    rzp.open();
  };

  return { pay };
}