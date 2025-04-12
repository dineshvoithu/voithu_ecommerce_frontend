import React, { useEffect, useState } from "react";
import instance from "../utils/axiosInstance";
import { Trash2, Plus, Minus } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await instance.get("/api/cart");
      setCartItems(response.data);
      calculateTotal(response.data);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await instance.put(`/api/cart/update/${cartItemId}`, {
        quantity: newQuantity,
      });
      fetchCartItems();
    } catch (error) {
      console.error("Error updating quantity", error);
    }
  };

  const handleDelete = async (cartItemId) => {
    try {
      await instance.delete(`/api/cart/delete/${cartItemId}`);
      fetchCartItems();
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  return (
    <>
      <Header />
      <div className="p-4 md:p-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          🛒 Your Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center justify-between bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
                >
                  {/* Left Side: Image & Details */}
                  <div className="flex items-center space-x-4 w-full md:w-2/3">
                    {/* Replace with actual image if available */}
                    <img
                      src={`http://localhost:8080${item.product.imageUrl}`}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        ₹{item.product.price}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Qty & Remove */}
                  <div className="flex items-center mt-4 md:mt-0 space-x-4">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg"
                      >
                        <Minus size={16} />
                      </button>
                      <div className="px-4 py-1 text-md">{item.quantity}</div>
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-lg"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-600"
                      title="Remove"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Place Order */}
            <div className="mt-8 bg-gray-50 p-6 rounded-xl shadow text-right">
              <h3 className="text-2xl font-bold mb-2">Total: ₹{totalAmount}</h3>
              <button
                onClick={() => navigate("/checkout")}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Proceed to Buy
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
