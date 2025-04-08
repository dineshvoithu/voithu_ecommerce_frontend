import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const sliderImages = [
  {
    url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1744090546/Croma%20Assets/CMS/LP%20Page%20Banners/2025/Sanity/HP/April/08042025/HP_Rotating_Redmi_8April2025_rmau36.jpg",
    alt: "Slide 1",
  },
  {
    url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1744007867/Croma%20Assets/CMS/LP%20Page%20Banners/2025/HP%20Rotating%20Banners/April/07042025/HP_Banner_2163x1050_desktop_lel9dm.jpg",
    alt: "Slide 2",
  },
  {
    url: "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1744029221/Croma%20Assets/CMS/LP%20Page%20Banners/2025/HP%20Rotating%20Banners/April/08042025/Desktop/HP_Rotating_TV_8April2025_kf9w15.jpg",
    alt: " Slide 3",
  },
];

const Hero = () => {
  return (
    <div className="w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper w-full"
      >
        {sliderImages.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              src={slide.url}
              alt={slide.alt}
              className="w-full h-screen object-inherit"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
