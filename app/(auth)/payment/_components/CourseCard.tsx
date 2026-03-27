import Image from "next/image";
import { Check } from "lucide-react";

interface Course {
  title: string;
  image: string;
  description: string;
  price: number;
  planId: string;
  features: string[];
}

interface Props {
  item: Course;
  onBuy: (price: number, planId: string, itemName: string) => void;
  isCurrentPlan: boolean;
}

export default function CourseCard({ item, onBuy,isCurrentPlan }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden hover:scale-105 border border-gray-100 flex flex-col">

      

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold text-gray-800 text-center py-5 mb-1">
          {item.title}
        </h2>

        <p className="text-gray-500 text-sm mb-4">
          {item.description}
        </p>

        <ul className="space-y-2 mb-5 flex-grow">
          {item.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <Check className="text-green-500 mr-2" size={16} />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-blue-600">
            ₹{item.price}
          </span>
<button
  onClick={() => onBuy(item.price, item.planId, item.title)}
  disabled={item.price === 0 || isCurrentPlan}
  className={`px-4 py-2 rounded-lg text-sm font-medium transition text-white ${
    isCurrentPlan
      ? "bg-green-500 cursor-not-allowed opacity-80"
      : item.price === 0
      ? "bg-gray-300 cursor-not-allowed opacity-60 text-gray-500"
      : "bg-blue-400 hover:opacity-90"
  }`}
>
  {isCurrentPlan ? "✓ Your Current Plan" : item.price === 0 ? "Free" : "Buy Now"}
</button>
        </div>
      </div>
    </div>
  );
}