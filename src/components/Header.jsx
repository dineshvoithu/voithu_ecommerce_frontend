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
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (token && user) {
        setIsLoggedIn(true);
        setUserRole(user.role);
      }
    } catch (error) {
      console.error("Invalid user JSON in localStorage", error);
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
    if (!userRole) return "/";
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // clear after navigating
    }
  };

  return (
    <header className="bg-black text-white shadow-md w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          VoithuCart
        </Link>

        <div className="hidden md:flex items-center gap-6 font-medium">
          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-md overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="px-3 py-1 text-black outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-[#ff6f61] text-white px-3 py-1 hover:bg-red-600"
            >
              Search
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex gap-6 font-medium">
            <Link to="/">Home</Link>
            <Link to="#">Mobiles</Link>
            <Link to="#">Tablets</Link>
            <Link to="#">TVs</Link>
            <Link to="#">Watches</Link>
          </nav>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex gap-4 items-center">
          <Link to="/cart">
            <ShoppingCart className="cursor-pointer" />
          </Link>

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
          {/* Mobile Search Bar */}
          <div className="flex gap-2 py-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-1 rounded text-black"
            />
            <button
              onClick={handleSearch}
              className="bg-[#ff6f61] text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Go
            </button>
          </div>

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

            <div>
              <Link to="/cart" className="flex items-center gap-2 text-white">
                <ShoppingCart />
                <span>Cart</span>
              </Link>
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
