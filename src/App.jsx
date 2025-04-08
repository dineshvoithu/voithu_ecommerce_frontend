import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./sections/Categories";
import Marquee from "./components/Marquee";
import TrendingProducts from "./components/TrendingProducts";
import PromoSection from "./components/PromoSection";
import PopularCategories from "./components/PopularCategories";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Marquee />
      <Categories />
      <TrendingProducts />
      <PromoSection />
      <PopularCategories />

      {/* Add Routes or HomePage below */}
    </>
  );
}

export default App;
