import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axiosInstance from "../utils/axiosInstance";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(
          `/api/products/search?query=${searchTerm}`
        );
        setProducts(res.data);
      } catch (err) {
        setError("Something went wrong while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchResults();
    }
  }, [searchTerm]);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-6">
        Search Results for:{" "}
        <span className="text-[#ff6f61] underline">{searchTerm}</span>
      </h2>

      {loading && (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg animate-pulse">
            Loading products...
          </p>
        </div>
      )}

      {error && (
        <div className="text-center py-10">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
