import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import { ROLES } from "./constants/roles";
import Unauthorized from "./pages/Unauthorized";
import AddProduct from "./pages/seller/AddProduct";
import EditProduct from "./pages/seller/EditProduct";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import SearchResults from "./pages/SearchResults";
import CategoryProducts from "./pages/CategoryProductsPage";
import CartPage from "./pages/CartPage";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/category/:category"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]}>
              <div>
                <Layout>
                  <CategoryProducts />
                </Layout>
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller-dashboard"
          element={
            <ProtectedRoute allowedRoles={[ROLES.SELLER]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]}>
              <Layout>
                <ProductsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]}>
              <Layout>
                <ProductDetailsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/seller/add-product" element={<AddProduct />} />
        <Route path="/seller/edit-product/:id" element={<EditProduct />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER, ROLES.ADMIN]}>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute allowedRoles={[ROLES.CUSTOMER]}>
              <Layout>
                <CartPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default App;
