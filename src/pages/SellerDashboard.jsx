import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchSellerProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axiosInstance.get("/api/products/seller", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching seller products", err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirm) return;

    const token = localStorage.getItem("token");
    try {
      axiosInstance.delete(`api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product deleted successfully");
      fetchSellerProducts(); // Refresh list
    } catch (err) {
      alert("Failed to delete product");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    alert("Logged out successfully!");
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!token || user?.role !== "SELLER") {
      navigate("/unauthorized");
      return;
    }

    fetchSellerProducts();
  }, [navigate]);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Seller Dashboard</h1>
        <div className="space-x-3">
          <button
            onClick={() => navigate("/seller/add-product")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            + Add Product
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-600 col-span-full">No products found.</p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow p-4 bg-white flex flex-col justify-between"
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${product.imageUrl}`}
                alt={product.name}
                className="w-full h-40 object-cover rounded mb-4"
              />

              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold">₹{product.price}</p>
              <p className="text-sm text-gray-500">
                Category: {product.category}
              </p>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/seller/edit-product/${product.id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
