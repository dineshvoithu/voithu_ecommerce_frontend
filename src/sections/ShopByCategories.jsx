import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Mobiles", image: "/images/smartphone.png" },
  { name: "TV", image: "/images/smartphone.png" },
  { name: "Tablets", image: "/images/smartphone.png" },
  { name: "Watches", image: "/images/smart-watch.png" },
];

const ShopByCategories = () => {
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate(`category/${categoryName}`);
  };

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 poppins-500">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleClick(category.name)}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className="object-cover rounded bg-gray-100"
            />
            <h3 className="mt-2 font-semibold text-lg">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategories;
