"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPremiumContent } from "@/lib/payment";
import { cardData } from "@/data/courseData";
import Image from "next/image";

interface Subscription {
  status: string;
  end_date: string;
  plan: {
    uuid: string;
    title: string;
    description: string;
    features: {
      download: boolean;
      hd_streaming: boolean;
      access_content: boolean;
      priority_support: boolean;
    };
  };
}

interface PremiumData {
  message: string;
  subscription: Subscription;
}

export function PremiumView() {
  const router = useRouter();
  const [data, setData] = useState<PremiumData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPremiumContent()
      .then((json) => {
        if (json === null) router.replace("/payment");
        else setData(json);
      })
      .finally(() => setLoading(false));
  }, []);
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-lg font-medium text-gray-700 animate-pulse">
        Loading...
      </p>
    </div>
  );
}
  if (!data) return null;

  const { plan } = data.subscription;

  const matchedCard = cardData.find((c) => c.planId === plan.uuid);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-130 text-center items-center mx-auto bg-white border rounded-xl p-6 shadow-lg">
        
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          {data.message}
        </h1>

        <p className="text-gray-500 mb-6">
          Expires:{" "}
          {new Date(data.subscription.end_date).toLocaleDateString()}
        </p>

        {matchedCard?.image && (
          <Image
            src={matchedCard.image}
            alt={plan.title}
            height={200}
            width={100}
            className="w-full h-48 object-contain rounded-lg mb-4"
          />
        )}

        <h2 className="text-xl text-blue-600 font-semibold mb-1">{plan.title}</h2>

        <p className="text-blue-500 mb-4">
          {matchedCard?.description || plan.description}
        </p>

        <ul className="space-y-2">
          {matchedCard?.features.map((f, i) => (
            <li key={i} className="text-blue-600 pl-38 text-start font-medium">
              ✓ {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}