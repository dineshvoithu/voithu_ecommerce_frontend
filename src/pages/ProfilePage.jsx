import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import instance from "../utils/axiosInstance";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await instance.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserDetails((prev) => ({
        ...prev,
        name: response.data.fullName || "",
        email: response.data.email || "",
        phone_number: response.data.phone || "",
        address: response.data.address || "",
      }));
    } catch (error) {
      console.error("Failed to fetch user details", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (isChangingPassword) {
      if (userDetails.newPassword !== userDetails.confirmNewPassword) {
        alert("New passwords do not match");
        return;
      }

      try {
        const response = await instance.put(
          "/api/users/update-password",
          {
            currentPassword: userDetails.currentPassword,
            newPassword: userDetails.newPassword,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Password updated:", response.data);
        setIsChangingPassword(false);
        alert("Password updated successfully");
      } catch (error) {
        console.error("Failed to update password", error);
        alert("Failed to update password");
      }
    }

    if (isEditing) {
      try {
        const { name, phone_number, address } = userDetails;
        const response = await instance.put(
          "/api/users/me",
          { fullName: name, phone: phone_number, address },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log("Profile updated:", response.data);
        setIsEditing(false);
        alert("Profile updated successfully");
      } catch (error) {
        console.error("Failed to update profile", error);
        alert("Failed to update profile");
      }
    }
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
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              disabled
              className="w-full border px-4 py-2 rounded-lg"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              value={userDetails.phone_number}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          {/* Address */}
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

          {/* Password Change Toggle */}
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

          {/* Password Change Fields */}
          {isChangingPassword && (
            <>
              <div>
                <label className="block mb-1 font-medium">
                  Current Password
                </label>
                <input
                  type="password"
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
                  type="password"
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
                  type="password"
                  name="confirmNewPassword"
                  value={userDetails.confirmNewPassword}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg"
                  required
                />
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            {(isEditing || isChangingPassword) && (
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg mt-4"
              >
                Save Changes
              </button>
            )}

            {!isEditing && !isChangingPassword && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg mt-4"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
