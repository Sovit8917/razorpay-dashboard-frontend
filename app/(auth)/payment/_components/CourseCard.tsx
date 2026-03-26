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
}

export default function CourseCard({ item, onBuy }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden hover:scale-105 border border-gray-100 flex flex-col">

      <Image
        src={item.image}
        alt={item.title}
        height={500}
        width={500}
        className="h-50 w-full object-cover"
      />

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
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
            className="bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}