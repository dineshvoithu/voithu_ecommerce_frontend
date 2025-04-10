import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  const token = localStorage.getItem("token");

  // Fetch product by ID
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/products/seller", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const selected = res.data.find((p) => p.id === parseInt(id));
        if (!selected) {
          alert("Product not found!");
          navigate("/seller/dashboard");
          return;
        }
        setProduct(selected);
      })
      .catch((err) => console.error("Error loading product", err));
  }, [id]);

  const handleChange = (e) => {
    setProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product updated successfully");
      navigate("/seller-dashboard");
    } catch (err) {
      console.error("Error updating product", err);
      alert("Failed to update product");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
