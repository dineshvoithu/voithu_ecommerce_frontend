import React, { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation hook

import "swiper/css";
import "swiper/css/navigation";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // ✅ Hook for redirect

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch trending products", error);
      }
    };

    fetchTrendingProducts();
  }, []);

  // ✅ Handle product click to navigate
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="px-4 py-8 bg-gray-100 pt-[80px] pb-[80px] relative">
      <h2 className="text-2xl font-bold mb-4 poppins-500">Trending Products</h2>
      <p className="text-[#545454] mb-10">
        Explore our most popular pieces that customers can't get enough of
      </p>

      <div className="absolute top-[90px] right-4 z-10 flex gap-2">
        <button className="swiper-button-prev-trending bg-white p-2 rounded-full shadow hover:bg-gray-200">
          <ChevronLeft size={20} />
        </button>
        <button className="swiper-button-next-trending bg-white p-2 rounded-full shadow hover:bg-gray-200">
          <ChevronRight size={20} />
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        navigation={{
          nextEl: ".swiper-button-next-trending",
          prevEl: ".swiper-button-prev-trending",
        }}
        loop={products.length >= 4}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div
              className="relative group bg-white rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer"
              onClick={() => handleProductClick(product.id)} // ✅ Now clickable
            >
              <div className="relative">
                <img
                  src={`http://localhost:8080${product.imageUrl}`}
                  alt={product.name}
                  className="w-full aspect-[3/2] object-cover rounded"
                />
                <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center opacity-0 group-hover:opacity-80 transition">
                  <button className="bg-white p-3 rounded-full shadow-md">
                    <ShoppingCart size={20} className="text-black" />
                  </button>
                </div>
              </div>

              <h3 className="mt-2 font-semibold text-lg text-center hover:text-[#ff6f61]">
                {product.name}
              </h3>
              <p className="text-black text-center hover:text-[#545454]">
                ₹{product.price.toLocaleString()}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingProducts;
