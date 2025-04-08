import React from "react";

const Marquee = () => {
  return (
    <div
      style={{ backgroundColor: "#74da30" }}
      className="relative overflow-hidden whitespace-nowrap text-black py-2 w-full"
    >
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .marquee-track {
            display: inline-block;
            white-space: nowrap;
            animation: marquee 20s linear infinite;
          }

          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="inline-block marquee-track text-base sm:text-lg md:text-xl lg:text-2xl">
        <span className="mx-4">🔥 Flat 50% OFF on Electronics!</span>
        <span className="mx-4">📱 New Arrivals - POCO, Nokia, Samsung</span>
        <span className="mx-4">🚚 Free Delivery on Orders Above ₹999</span>
        <span className="mx-4">🎁 Festival Offers Ending Soon!</span>
      </div>
    </div>
  );
};

export default Marquee;
