"use client";
import { cardData } from "@/data/courseData";
import { useRazorpay } from "../_hooks/useRazorpay";
import CourseCard from "./CourseCard";

export default function PaymentView() {
  const { pay } = useRazorpay();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl text-gray-600 font-bold mb-8 text-center">
          Explore Courses
        </h1>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {cardData.map((item) => (
            <CourseCard key={item.title} item={item} onBuy={pay} />
          ))}
        </div>
      </div>
    </div>
  );
}