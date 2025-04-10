// PopularCategories.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance"; // 👈 important
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

const PopularCategories = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/products"); // 👈 using axiosInstance
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-4 py-8 bg-gray-100 pt-[80px] pb-[80px] relative">
      <h2 className="text-2xl font-bold mb-4 poppins-500">
        Popular Categories
      </h2>
      <p className="text-[#545454] mb-10">
        Explore top categories people love to shop
      </p>

      <div className="absolute top-[90px] right-4 z-10 flex gap-2">
        <button className="swiper-button-prev-custom bg-white p-2 rounded-full shadow hover:bg-gray-200">
          <ChevronLeft size={20} />
        </button>
        <button className="swiper-button-next-custom bg-white p-2 rounded-full shadow hover:bg-gray-200">
          <ChevronRight size={20} />
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={products.length >= 4}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="relative group bg-white rounded-xl shadow hover:shadow-lg transition p-4">
              <div className="relative">
                <img
                  src={`http://localhost:8080${product.imageUrl}`}
                  alt={product.name}
                  className="w-full aspect-[3/2] object-cover rounded"
                />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition">
                  <ShoppingCart size={20} className="text-black" />
                </button>
              </div>
              <h3 className="mt-2 font-semibold text-lg text-center hover:text-[#ff6f61] cursor-pointer">
                {product.name}
              </h3>
              <p className="text-black text-center">
                ₹{product.price.toLocaleString()}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularCategories;
