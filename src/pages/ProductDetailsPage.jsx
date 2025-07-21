import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { ShoppingCart, Bolt } from "lucide-react";
import toast from "react-hot-toast"; // ✅ Toaster import

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await axiosInstance.get(`/api/products/${id}`);
        setProduct(productRes.data);

        const allRes = await axiosInstance.get(`/api/products`);
        setAllProducts(allRes.data);
      } catch (err) {
        console.error("Error fetching product or all products:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add items to cart.");
      return;
    }

    try {
      await axiosInstance.post(
        "/api/cart/add",
        {
          productId: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Added to cart!");
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart.");
    }
  };

  const handleBuyNow = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to proceed.");
      return;
    }

    try {
      // Add the product directly to the cart
      await axiosInstance.post(
        "/api/cart/add",
        {
          productId: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // After adding to the cart, navigate to checkout page and pass cart data
      navigate("/checkout", {
        state: { cartItems: [{ product, quantity: 1 }] },
      });
    } catch (err) {
      console.error("Error during Buy Now process:", err);
      toast.error("Failed to proceed with Buy Now.");
    }
  };

  if (!product)
    return <div className="p-8 text-center text-xl">Loading...</div>;

  const similarProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Product Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-lg">
        <div className="w-full">
          <img
            src={`${import.meta.env.VITE_API_URL}${product.imageUrl}`}
            alt={product.name}
            className="w-full h-[400px] object-contain rounded-xl border"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-medium text-black">Category:</span>{" "}
              {product.category}
            </p>
            <p className="text-xl text-green-600 font-semibold mb-6">
              ₹{product.price.toLocaleString()}
            </p>
            <p className="text-gray-700 leading-relaxed mb-8">
              {product.description}
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow transition"
            >
              <Bolt size={18} /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      {similarProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
          >
            {similarProducts.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  onClick={() => handleProductClick(item.id)}
                  className="bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer p-4"
                >
                  <img
                    src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
                    alt={item.name}
                    className="w-full aspect-[3/2] object-cover rounded mb-2"
                  />
                  <h3 className="text-lg font-semibold hover:text-[#ff6f61] text-center">
                    {item.name}
                  </h3>
                  <p className="text-center text-green-600 font-medium">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
