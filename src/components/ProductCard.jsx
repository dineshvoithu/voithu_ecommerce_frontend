import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="bg-white rounded-xl shadow hover:shadow-lg transition-all overflow-hidden cursor-pointer"
      onClick={handleViewProduct}
    >
      <img
        src={`http://localhost:8080${product.imageUrl}`}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{product.name}</h3>
        <p className="text-[#ff6f61] font-bold text-md mt-1">
          ₹{product.price}
        </p>

        <div className="mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent outer div click
              handleViewProduct();
            }}
            className="w-full text-center bg-[#ff6f61] text-white px-4 py-2 rounded hover:bg-red-600"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
