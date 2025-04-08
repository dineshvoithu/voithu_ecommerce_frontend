import React from "react";

const CategoryCard = ({ title, image }) => {
  return (
    <div className="flex flex-col items-center bg-191919 p-4 rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer">
      <img src={image} alt={title} className=" object-contain mb-2" />
      <h2 className="text-sm font-semibold">{title}</h2>
    </div>
  );
};

export default CategoryCard;
