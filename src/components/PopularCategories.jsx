import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const categories = [
  { id: 1, name: "Mobiles", price: 49999, image: "images/mobile-category.png" },
  { id: 2, name: "TV", price: 59999, image: "images/tv-category.jpg" },
  { id: 3, name: "Tablets", price: 25999, image: "images/tablet-category.jpg" },
  { id: 4, name: "Watches", price: 14999, image: "images/watch-category.png" },
  { id: 5, name: "Cameras", price: 34999, image: "images/camera-category.jpg" },
  { id: 6, name: "Laptops", price: 79999, image: "images/mobile-category.png" },
];

const PopularCategories = () => {
  return (
    <div className="px-4 py-8 bg-gray-100 pt-[80px] pb-[60px] relative">
      <h2 className="text-2xl font-bold mb-4 poppins-500">
        Popular Categories
      </h2>
      <p className="text-[#545454] mb-10">
        Explore top categories people love to shop
      </p>

      {/* Slider arrows */}
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
        loop={true}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <div className="relative group bg-white rounded-xl shadow hover:shadow-lg transition p-4">
              {/* Image and hover cart */}
              <div className="relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full aspect-[3/2] object-cover rounded"
                />
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow opacity-0 group-hover:opacity-100 transition">
                  <ShoppingCart size={20} className="text-black" />
                </button>
              </div>

              {/* Name and price */}
              <h3 className="mt-2 font-semibold text-lg text-center hover:text-[#ff6f61] cursor-pointer">
                {category.name}
              </h3>
              <p className="text-black text-center">
                ₹{category.price.toLocaleString()}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularCategories;
