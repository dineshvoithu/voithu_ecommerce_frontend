import React from "react";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Apple iPhone 14",
    price: 79999,
    rating: 4.5,
    image: "/images/ss-s21-grey.jpg",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    price: 69999,
    rating: 4.3,
    image: "/images/ipad-pro11-mini.jpg",
  },
  {
    id: 3,
    name: "Redmi Note 12 Pro",
    price: 17999,
    rating: 4.2,
    image: "/images/ss-smart-watch-white.jpg",
  },
  {
    id: 4,
    name: "OnePlus Nord CE 3",
    price: 21999,
    rating: 4.4,
    image: "/images/ss-smart-watch-white.jpg",
  },
];

const TrendingProducts = () => {
  return (
    <div className="px-4 py-8 bg-gray-100 pt-[80px] pb-[80px]">
      <h2 className="text-2xl font-bold mb-4 poppins-500">Trending Products</h2>
      <p className="text-[#545454] mb-10">
        Explore our most popular pieces that customers can't get enough of
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative group bg-white rounded-xl shadow hover:shadow-lg transition p-4"
          >
            {/* Image and Hover Add to Cart Icon */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-[3/2] object-cover rounded"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center opacity-0 group-hover:opacity-80 transition">
                <button className="bg-white p-3 rounded-full shadow-md">
                  <ShoppingCart size={20} className="text-black" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <h3 className="mt-2 font-semibold text-lg text-center hover:text-[#ff6f61] cursor-pointer">
              {product.name}
            </h3>
            <p className="text-black text-center hover:text-[#545454]">
              ₹{product.price.toLocaleString()}
            </p>
            {/* <p className="text-yellow-500">⭐ {product.rating}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
