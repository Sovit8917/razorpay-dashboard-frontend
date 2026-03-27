"use client";
import { useEffect, useState, useCallback } from "react";
import { cardData } from "@/data/courseData";
import { useRazorpay } from "../_hooks/useRazorpay";
import { getUserSubscription } from "@/lib/payment";
import CourseCard from "./CourseCard";

export default function PaymentView() {
  const [currentPlanId, setCurrentPlanId] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    try {
      const sub = await getUserSubscription();
      console.log("SUBSCRIPTION RESPONSE:", sub);

const planId = sub?.plan_id ?? null;

      if (planId) {
        setCurrentPlanId(planId);
      } else {
        const freePlan = cardData.find((c) => c.price === 0);
        if (freePlan) setCurrentPlanId(freePlan.planId);
      }
    } catch {
      const freePlan = cardData.find((c) => c.price === 0);
      if (freePlan) setCurrentPlanId(freePlan.planId);
    }
  }, []);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  const { pay } = useRazorpay(fetchSubscription); //as callback fetchSubscription

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl text-gray-600 font-bold mb-8 text-center">
          Explore Courses
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {cardData.map((item) => (
            <CourseCard
              key={item.title}
              item={item}
              onBuy={pay}
              isCurrentPlan={item.planId === currentPlanId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}