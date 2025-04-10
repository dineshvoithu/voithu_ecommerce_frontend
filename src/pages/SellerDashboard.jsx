import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Add this import statement

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || user?.role !== "SELLER") {
      navigate("/login"); // Redirect to login if not logged in or not a seller
    } else {
      // Fetch seller's products
      axios
        .get("http://localhost:8080/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProducts(res.data);
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove token and user from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Show a success toast
    toast.success("Logged out successfully!");

    // Redirect to login page
    navigate("/");
  };

  return (
    <div>
      <h1>Seller Dashboard</h1>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-800 mb-4"
      >
        Logout
      </button>

      <div>
        <h2>Your Products</h2>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
