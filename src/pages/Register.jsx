import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const { name, email, password } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      role: "ROLE_CUSTOMER",
    };

    try {
      console.log("Sending registration data:", payload);
      const response = await axios.post(
        "http://localhost:8080/api/users/register/customer",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token, role } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      toast.success("Registration successful!");

      setFormData({ name: "", email: "", password: "" });

      setTimeout(() => {
        navigate("/"); // or "/customer-dashboard"
      }, 1500);
    } catch (error) {
      console.error("Registration Error:", error.response || error.message);
      toast.error(
        error.response?.data?.message || "Registration failed. Try again!"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer />
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md relative">
        <Link
          to="/"
          className="absolute top-2 right-2 text-xl hover:text-red-500 transition"
        >
          ✖
        </Link>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
