import React from "react";

const categories = [
  {
    name: "Mobile",
    image: "/images/Mobile_sdtrdf.webp",
  },
  {
    name: "TV",
    image: "/images/tab.webp",
  },
  {
    name: "Tablet",
    image: "/images/tablet.jpg",
  },
  {
    name: "Watch",
    image: "/images/watch.jpg",
  },
];

const CategoryCards = () => {
  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center cursor-pointer"
          >
            <img
              src={category.image}
              alt={category.name}
              className=" object-cover rounded"
            />
            <h3 className="mt-2 font-semibold text-lg">{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
