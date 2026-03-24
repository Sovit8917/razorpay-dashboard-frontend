import Image from "next/image";
interface Course {
  title: string;
  image: string;
  description: string;
  price: number;
}


interface Props {
  item: Course;
  onBuy: (price: number, itemName: string) => void;
}

export default function CourseCard({ item, onBuy }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden hover:scale-105">
      <Image
        src={item.image}
        alt={item.title}
        height={200}
        width={200}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg text-gray-700 font-semibold mb-2">
          {item.title}
        </h2>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-bold text-lg">₹{item.price}</span>
          <button
            onClick={() => onBuy(item.price, item.title)}
            className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}