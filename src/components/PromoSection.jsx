import React from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PromoSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <section
      className="overflow-hidden rounded-2xl p-4 md:p-8 my-10  flex flex-col md:flex-row items-center justify-between gap-6"
      style={{
        background:
          "linear-gradient(67.69deg, #eeefff 11.66%, #f6f0f0 47.21%, #ffeff6 82.77%)",
      }}
    >
      <div className="flex-1 text-center md:text-left pt-[50px] pb-[50px]">
        <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-4">
          Special Offers Just for You!
        </h2>
        <p className="text-gray-700 mb-6">
          Discover exclusive deals and new arrivals that suit your style.
        </p>
        <button
          onClick={handleShopNow}
          className="bg-[#101828] hover:bg-[#101828] text-white px-6 py-3 rounded-lg transition flex items-center gap-2"
        >
          Shop Now <ArrowRight size={20} />
        </button>
      </div>

      <div className="flex-1 pb-[50px] pt-[50px]">
        <img
          src="/images/promo-image.png"
          alt="Promo"
          className="w-full h-auto max-w-md mx-auto rounded-xl"
        />
      </div>
    </section>
  );
};

export default PromoSection;
