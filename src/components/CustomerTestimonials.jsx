// src/components/CustomerTestimonials.jsx

import React, { useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    id: 1,
    name: "Dinesh Voithu",
    rating: 5,
    comment:
      "Absolutely loved the products! Delivery was super fast and packaging was excellent.",
  },
  {
    id: 2,
    name: "Sai Ayyappa",
    rating: 4,
    comment:
      "Great quality and service. I’ll definitely shop again from this store.",
  },
  {
    id: 3,
    name: "Mahanya Shree",
    rating: 5,
    comment:
      "I’m really impressed with the customer support and return policy. Hassle-free shopping!",
  },
  {
    id: 4,
    name: "Pavani Rao",
    rating: 5,
    comment: "Amazing experience and excellent product quality. Loved it!",
  },
];

const CustomerTestimonials = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="bg-gray-100 py-10 px-4 relative">
      <h2 className="text-2xl font-bold mb-6 text-center poppins-500">
        What Our Customers Say
      </h2>

      <div className="relative">
        {/* Navigation Arrows */}
        <div
          ref={prevRef}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 cursor-pointer"
        >
          <ChevronLeft size={20} />
        </div>
        <div
          ref={nextRef}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 cursor-pointer"
        >
          <ChevronRight size={20} />
        </div>

        {/* Swiper with Navigation */}
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          loop={true}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((review) => (
            <SwiperSlide key={review.id}>
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition text-center h-full">
                <h3 className="font-semibold text-lg">{review.name}</h3>
                <div className="flex justify-center gap-1 my-2 text-yellow-500">
                  {Array(review.rating)
                    .fill()
                    .map((_, index) => (
                      <Star key={index} size={18} fill="currentColor" />
                    ))}
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CustomerTestimonials;
