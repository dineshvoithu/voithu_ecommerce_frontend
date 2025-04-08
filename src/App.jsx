import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categories from "./sections/Categories";

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Categories />
      {/* Add Routes or HomePage below */}
    </>
  );
}

export default App;
