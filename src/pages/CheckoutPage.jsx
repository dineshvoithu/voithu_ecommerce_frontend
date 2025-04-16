import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import instance from "../utils/axiosInstance";

const CheckoutPage = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phone: "",
    address: "",
    paymentMode: "card", // default to card
  });

  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting:", userDetails);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchCartItems();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await instance.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserDetails({
        fullName: response.data.name,
        phone: response.data.phone_number,
        address: response.data.address,
        paymentMode: "card",
      });
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

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

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  const deleteItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    calculateTotal(updatedCart);
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
          🧾 Checkout
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-6 space-y-6"
        >
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={userDetails.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Shipping Address
            </label>
            <textarea
              name="address"
              value={userDetails.address}
              onChange={handleChange}
              placeholder="Enter delivery address"
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium text-gray-700">
              Payment Mode
            </label>
            <select
              name="paymentMode"
              value={userDetails.paymentMode}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-3 px-8 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 w-full mt-4"
          >
            Continue to Payment
          </button>
        </form>

        {/* Product Summary Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            🧾 Order Summary
          </h3>

          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white border rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`http://localhost:8080${item.product.imageUrl}`}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-green-600">
                      Delivery in 2–4 days
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="text-xl text-gray-600 hover:text-red-600 focus:outline-none"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="text-xl text-gray-600 hover:text-green-600 focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                  <p className="mt-2 text-right text-green-600 font-semibold">
                    ₹{item.product.price} x {item.quantity} ={" "}
                    <span className="font-bold">
                      ₹{item.product.price * item.quantity}
                    </span>
                  </p>
                </div>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-red-600 hover:text-red-800 ml-6 focus:outline-none"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 text-right text-xl font-semibold text-gray-900">
            Net Total: ₹{totalAmount}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
