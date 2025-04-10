import React, { useState } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SellerModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Enter a valid email");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      // Log the entire response to check its structure
      console.log("Login response:", res);

      // Since response is just the token, we directly access the token
      const token = res.data;

      if (!token) {
        toast.error("Invalid response from server");
        return;
      }

      // Save the token in localStorage
      localStorage.setItem("token", token);

      toast.success("Login successful!");

      // After a successful login, redirect to the seller dashboard
      setTimeout(() => {
        navigate("/seller-dashboard");
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Login error: ", err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/register/seller",
        {
          name,
          email,
          password,
          role: "SELLER",
        }
      );

      // Log the entire response to check its structure
      console.log("Registration response:", res);

      if (res.data === "Seller registered successfully!") {
        toast.success("Registration successful!");

        // Store the user token and user data in localStorage
        // You can adjust how you handle the response data as per your server's response
        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify({ name, email, role: "SELLER" })
        );

        // Redirect to the seller dashboard after successful registration
        setTimeout(() => {
          navigate("/seller-dashboard");
          onClose();
        }, 1000);
      } else {
        toast.error("Registration failed");
      }
    } catch (err) {
      console.error("Registration error: ", err);
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white text-black w-full max-w-md p-6 rounded-xl shadow-xl relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
          onClick={onClose}
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Seller Login" : "Seller Registration"}
        </h2>

        {/* FORM */}
        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          className="space-y-4"
        >
          {!isLogin && (
            <div>
              <label className="block text-sm mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
              placeholder="Enter password"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-md"
                placeholder="Re-enter password"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          {isLogin ? "New Seller?" : "Already have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register here" : "Login here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SellerModal;
