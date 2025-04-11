import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axiosInstance from "../utils/axiosInstance";
import { Loader2, AlertCircle } from "lucide-react"; // Optional: icons

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `/api/products/category/${category}` // ✅ fixed path
        );
        setProducts(res.data);
      } catch (err) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Shop by <span className="text-[#ff6f61] capitalize">{category}</span>
      </h2>

      {loading && (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
          <p className="ml-2 text-lg">Loading products...</p>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center bg-red-100 text-red-700 p-4 rounded mb-6">
          <AlertCircle className="mr-2" />
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="text-center text-gray-500 text-lg">No products found.</p>
      )}

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;
