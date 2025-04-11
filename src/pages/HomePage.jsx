import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Categories from "../sections/ShopByCategories";
import Marquee from "../components/Marquee";
import TrendingProducts from "../components/TrendingProducts";
import PromoSection from "../components/PromoSection";
import PopularCategories from "../components/PopularCategories";
import FeatureHighlights from "../components/FeatureHighlights";
import CustomerTestimonials from "../components/CustomerTestimonials";
import Footer from "../components/Footer";
import ShopByCategories from "../sections/ShopByCategories";

const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Marquee />
      <ShopByCategories />
      <TrendingProducts />
      <PromoSection />
      <PopularCategories />
      <FeatureHighlights />
      <CustomerTestimonials />
      <Footer />

      {/* Add Routes or HomePage below */}
    </>
  );
};

export default HomePage;
