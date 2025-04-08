import React, { useState } from "react";
import { ShoppingCart, User, Menu } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-black text-white shadow-md w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-3 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold">VoithuCart</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 font-medium">
          <a href="#">Home</a>
          <a href="#">Mobiles</a>
          <a href="#">Tablets</a>
          <a href="#">TVs</a>
          <a href="#">Watches</a>
        </nav>

        {/* Icons */}
        <div className="hidden md:flex gap-4 items-center">
          <ShoppingCart className="cursor-pointer" />
          <User className="cursor-pointer" />
        </div>

        {/* Mobile Menu Button */}
        <button onClick={toggleMenu} className="md:hidden">
          <Menu />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2 bg-black">
          <a href="#" className="block">
            Home
          </a>
          <a href="#" className="block">
            Mobiles
          </a>
          <a href="#" className="block">
            Tablets
          </a>
          <a href="#" className="block">
            TVs
          </a>
          <a href="#" className="block">
            Watches
          </a>
          <div className="flex gap-4 pt-2 border-t border-gray-700 text-white">
            <ShoppingCart className="cursor-pointer" />
            <User className="cursor-pointer" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
