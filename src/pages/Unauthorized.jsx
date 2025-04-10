// src/pages/Unauthorized.jsx
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Unauthorized Access
      </h2>
      <p className="mb-6 text-gray-700">
        You are not allowed to view this page.
      </p>
      <button
        onClick={handleGoBack}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Go to Login
      </button>
    </div>
  );
};

export default Unauthorized;
