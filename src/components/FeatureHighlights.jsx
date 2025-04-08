import React from "react";
import { Truck, Gift, RotateCcw, ShieldCheck } from "lucide-react";

const features = [
  {
    id: 1,
    icon: <Truck size={28} className="text-blue-600" />,
    title: "Free Shipping",
    desc: "On orders over ₹999",
  },
  {
    id: 2,
    icon: <Gift size={28} className="text-pink-600" />,
    title: "Gift Package",
    desc: "Perfect for your loved ones",
  },
  {
    id: 3,
    icon: <RotateCcw size={28} className="text-green-600" />,
    title: "Easy Returns",
    desc: "Hassle-free 7-day returns",
  },
  {
    id: 4,
    icon: <ShieldCheck size={28} className="text-purple-600" />,
    title: "1 Year Warranty",
    desc: "On selected products",
  },
];

const FeatureHighlights = () => {
  return (
    <div className="py-10 px-4 bg-[#f9f9f9]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex items-center gap-4 p-4 bg-white rounded-xl shadow hover:shadow-md transition"
          >
            <div>{feature.icon}</div>
            <div>
              <h4 className="font-semibold text-lg">{feature.title}</h4>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;
