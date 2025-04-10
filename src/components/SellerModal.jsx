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

      console.log("Login response:", res);

      // If backend returns just token (as string), handle accordingly
      const responseData = res.data;
      let token = responseData?.token || responseData;
      let user = responseData?.user || { email, role: "SELLER" }; // Fallback

      if (!token) {
        toast.error("Token missing in response");
        return;
      }

      if (user?.role !== "SELLER") {
        toast.error("Access denied. Not a seller.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");

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
      // Register the seller
      const res = await axios.post(
        "http://localhost:8080/api/users/register/seller",
        {
          name,
          email,
          password,
          role: "SELLER",
        }
      );

      console.log("✅ Registration response:", res.data);

      toast.success("Registration successful!");

      // Auto-login after registration
      const loginRes = await axios.post(
        "http://localhost:8080/api/users/login",
        {
          email,
          password,
        }
      );

      console.log("✅ Auto-login response:", loginRes.data);

      const token = loginRes.data?.token;
      const user = loginRes.data?.user;

      if (!token) {
        toast.error("Token missing during auto-login");
        return;
      }

      if (user?.role !== "SELLER") {
        console.warn("❌ Not a seller:", user);
        toast.error("Click to Login");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Auto-login successful!");

      setTimeout(() => {
        navigate("/seller-dashboard");
        onClose();
      }, 1000);
    } catch (err) {
      console.error("❌ Registration/Login error:", err);
      toast.error(err.response?.data?.message || "Registration/Login failed");
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
