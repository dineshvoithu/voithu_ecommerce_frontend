import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import instance from "../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await instance.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Log the response to verify the structure of the response data
      console.log("Fetched User Details:", response.data);

      setUserDetails((prev) => ({
        ...prev,
        fullName: response.data.name || "", // Adjusted field name
        email: response.data.email || "",
        phone: response.data.phone_number || "", // Adjusted field name
        address: response.data.address || "",
      }));
    } catch (error) {
      console.error("Failed to fetch user details", error);
      toast.error("Failed to fetch user details");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    setIsSubmitting(true);

    if (isChangingPassword) {
      if (userDetails.newPassword !== userDetails.confirmNewPassword) {
        toast.warning("New passwords do not match");
        setIsSubmitting(false);
        return;
      }

      try {
        await instance.put(
          "/api/users/update-password",
          {
            currentPassword: userDetails.currentPassword,
            newPassword: userDetails.newPassword,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Password updated successfully");
        setUserDetails((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        }));
        setIsChangingPassword(false);
      } catch (error) {
        console.error("Failed to update password", error);
        toast.error("Failed to update password");
      }
    } else if (isEditing) {
      try {
        const { fullName, phone, address } = userDetails;
        // Update API call with correct mapping
        await instance.put(
          "/api/users/me",
          {
            name: fullName, // Match backend field name 'name'
            phone_number: phone, // Match backend field name 'phone_number'
            address, // 'address' is fine as it is
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Profile updated successfully");
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to update profile", error);
        toast.error("Failed to update profile");
      }
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">👤 Profile</h2>

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
              disabled={!isEditing}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              disabled
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Address</label>
            <textarea
              name="address"
              value={userDetails.address}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your address"
              className="w-full border px-4 py-2 rounded-lg"
              rows={3}
              required
            />
          </div>

          <div>
            <button
              type="button"
              onClick={() => setIsChangingPassword(!isChangingPassword)}
              className="text-blue-600 hover:text-blue-800"
            >
              {isChangingPassword
                ? "Cancel Password Change"
                : "Change Password"}
            </button>
          </div>

          {isChangingPassword && (
            <>
              <div>
                <label className="block mb-1 font-medium">
                  Current Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="currentPassword"
                  value={userDetails.currentPassword}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={userDetails.newPassword}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  value={userDetails.confirmNewPassword}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                <label htmlFor="showPassword" className="text-sm">
                  Show Passwords
                </label>
              </div>
            </>
          )}

          <div className="flex gap-4">
            {(isEditing || isChangingPassword) && (
              <button
                type="submit"
                className={`bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg mt-4 ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
            )}

            {!isEditing && !isChangingPassword && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mt-4"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>

      <Footer />
      <ToastContainer position="top-right" />
    </>
  );
};

export default ProfilePage;
