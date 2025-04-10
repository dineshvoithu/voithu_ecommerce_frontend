import React, { useState, useEffect } from "react";
import { ShoppingCart, User, Menu } from "lucide-react";
import SellerModal from "./SellerModal";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ROLES } from "../constants/roles";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getDashboardPath = () => {
    if (userRole === ROLES.CUSTOMER) return "/";
    if (userRole === ROLES.SELLER) return "/seller-dashboard";
    if (userRole === ROLES.ADMIN) return "/admin-dashboard";
    return "/";
  };

  return (
    <header className="bg-black text-white shadow-md w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          VoithuCart
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 font-medium">
          <Link to="/">Home</Link>
          <Link to="#">Mobiles</Link>
          <Link to="#">Tablets</Link>
          <Link to="#">TVs</Link>
          <Link to="#">Watches</Link>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex gap-4 items-center">
          <ShoppingCart className="cursor-pointer" />

          {isLoggedIn && (
            <Link
              to={getDashboardPath()}
              className="text-white hover:underline text-sm"
            >
              Dashboard
            </Link>
          )}

          {!isLoggedIn ? (
            <Link to="/login">
              <User className="cursor-pointer" />
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white hover:underline text-sm"
            >
              Logout
            </button>
          )}

          {userRole !== ROLES.SELLER && (
            <button
              onClick={() => setShowSellerModal(true)}
              className="bg-white text-[#101828] px-4 py-2 rounded hover:bg-[#ff6f61] hover:text-white"
            >
              Become a Seller
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={toggleMenu} className="md:hidden">
          <Menu />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-3 space-y-2 bg-black">
          <Link to="/" className="block">
            Home
          </Link>
          <Link to="#" className="block">
            Mobiles
          </Link>
          <Link to="#" className="block">
            Tablets
          </Link>
          <Link to="#" className="block">
            TVs
          </Link>
          <Link to="#" className="block">
            Watches
          </Link>

          <div className="flex flex-col gap-3 pt-3 border-t border-gray-700">
            {isLoggedIn && (
              <Link to={getDashboardPath()} className="text-white">
                Dashboard
              </Link>
            )}

            {!isLoggedIn ? (
              <Link to="/login" className="flex items-center gap-2">
                <User />
                <span>Login</span>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="text-white text-left hover:underline"
              >
                Logout
              </button>
            )}

            <div className="flex items-center gap-2 text-white">
              <ShoppingCart />
              <span>Cart</span>
            </div>

            {userRole !== ROLES.SELLER && (
              <button
                onClick={() => setShowSellerModal(true)}
                className="bg-white text-[#101828] px-4 py-2 rounded hover:bg-[#ff6f61] hover:text-white"
              >
                Become a Seller
              </button>
            )}
          </div>
        </div>
      )}

      {/* Seller Modal */}
      {showSellerModal && (
        <SellerModal onClose={() => setShowSellerModal(false)} />
      )}
    </header>
  );
};

export default Header;
