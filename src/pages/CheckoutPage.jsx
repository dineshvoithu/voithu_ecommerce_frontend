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
    // Handle payment processing here
    console.log("Submitting:", userDetails);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchCartItems();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token"); // Assuming you're storing the JWT token in localStorage
      const response = await instance.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Adjusted to map backend fields correctly
      setUserDetails({
        fullName: response.data.name, // Mapping to 'name' as per backend
        phone: response.data.phone_number, // Mapping to 'phone_number' as per backend
        address: response.data.address,
        paymentMode: "card", // You can keep the default payment mode
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

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">🧾 Checkout</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-xl p-6 space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={userDetails.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Shipping Address</label>
            <textarea
              name="address"
              value={userDetails.address}
              onChange={handleChange}
              placeholder="Enter delivery address"
              className="w-full border px-4 py-2 rounded-lg"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Payment Mode</label>
            <select
              name="paymentMode"
              value={userDetails.paymentMode}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
            >
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg mt-4"
          >
            Continue to Payment
          </button>
        </form>

        {/* Product Summary Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">🧾 Order Summary</h3>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={`http://localhost:8080${item.product.imageUrl}`}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div>
                    <h4 className="font-semibold">{item.product.name}</h4>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-green-600">
                      Delivery in 2–4 days
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  ₹{item.product.price} x {item.quantity} ={" "}
                  <span className="font-bold">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 text-right text-lg font-bold">
            Net Total: ₹{totalAmount}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
