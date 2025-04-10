import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ Auto-fill remembered email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail }));
      setRememberMe(true);
    }

    // ✅ Redirect if already logged in
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

    // ✅ Save or remove email for remember me
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", formData.email);
    } else {
      localStorage.removeItem("rememberedEmail");
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        formData
      );

      const token = response.data.token;
      const role = response.data.role?.toUpperCase();

      if (token && role) {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "user",
          JSON.stringify({ email: formData.email, role })
        );

        toast.success("Login successful!");

        // ✅ Role-based navigation
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
      toast.error("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 mb-2 border rounded"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="text-sm text-blue-600 hover:underline mb-4"
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

        <label className="flex items-center mb-4 text-sm">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe((prev) => !prev)}
            className="mr-2"
          />
          Remember Me
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Already have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
