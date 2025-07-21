import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      const role = savedUser.role?.toUpperCase();
      if (role === "ROLE_ADMIN") navigate("/admin-dashboard");
      else if (role === "ROLE_SELLER" || role === "SELLER")
        navigate("/seller-dashboard");
      else if (role === "ROLE_CUSTOMER" || role === "CUSTOMER") navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", formData.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    try {
      const response = await axiosInstance.post("/api/users/login", formData);
      const token = response.data.token;
      const role = response.data.role?.toUpperCase();

      if (token && role) {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ email: formData.email, role })
        );

        toast.success("Login successful!");

        if (role === "ROLE_CUSTOMER" || role === "CUSTOMER") {
          navigate("/");
        } else if (role === "ROLE_SELLER" || role === "SELLER") {
          navigate("/seller-dashboard");
        } else if (role === "ROLE_ADMIN" || role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          toast.error("Unknown role: " + role);
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(
        error.response?.data?.message || "Invalid email or password!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6 text-black">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-sm text-blue-600 hover:underline mt-1"
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </button>

            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 hover:underline mt-2 block"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">Remember Me</label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition ${
              isLoading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
