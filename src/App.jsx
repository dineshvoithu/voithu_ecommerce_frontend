import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./sections/Categories";
import Marquee from "./components/Marquee";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Marquee />
      <Categories />

      {/* Add Routes or HomePage below */}
    </>
  );
}

export default App;
