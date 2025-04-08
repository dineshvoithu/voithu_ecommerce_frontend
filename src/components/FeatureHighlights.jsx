// src/components/FeatureHighlights.jsx

import React from "react";
import { Truck, Gift, RefreshCcw, ShieldCheck } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Free Shipping",
    icon: <Truck size={32} className="text-blue-600" />,
  },
  {
    id: 2,
    title: "Gift Package",
    icon: <Gift size={32} className="text-pink-500" />,
  },
  {
    id: 3,
    title: "Easy Returns",
    icon: <RefreshCcw size={32} className="text-green-500" />,
  },
  {
    id: 4,
    title: "1 Year Warranty",
    icon: <ShieldCheck size={32} className="text-purple-600" />,
  },
];

const FeatureHighlights = () => {
  return (
    <div className="py-10 px-4 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center gap-3 bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            {feature.icon}
            <h3 className="text-lg font-medium">{feature.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;
