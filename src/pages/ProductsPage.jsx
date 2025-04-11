import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="px-6 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Explore All Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition duration-300 cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              <img
                src={`http://localhost:8080${product.imageUrl}`}
                alt={product.name}
                className="w-full aspect-[3/2] object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-bold text-lg">
                    ₹{product.price}
                  </span>
                  <button className="text-sm text-blue-600 hover:underline">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
