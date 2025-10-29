"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./TouristProfile.module.css";

interface TouristProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TouristProfile({ isOpen, onClose }: TouristProfileProps) {
  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
    role: "Tourist",
    phone: "",
    location: "",
    profilePic: "/profile.webp",
  });

  const [editMode, setEditMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 🔹 Fetch user profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:4000/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInitialData(res.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    }
  };

  useEffect(() => {
    if (isOpen) fetchProfile();
  }, [isOpen]);

  // 🔹 Formik setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialData,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().matches(/^\d*$/, "Phone must be numbers only"),
      location: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("location", values.location);

        if (selectedImage) {
          formData.append("profilePic", selectedImage);
        }

        const res = await axios.put("http://localhost:4000/users/profile", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setInitialData(res.data.user || res.data);
        toast.success("✅ Profile updated successfully!");
        setTimeout(() => {
          setEditMode(false);
          onClose();
        }, 1500);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "❌ Failed to update profile");
      }
    },
  });

  // 🔹 Handle image preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const preview = URL.createObjectURL(file);
      formik.setFieldValue("profilePic", preview);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.drawerContent}>
        <span className={styles.closeIcon} onClick={onClose}>
          &times;
        </span>
        <h2>My Profile</h2>

          <div className={styles.picWrapper}>
 <img
  src={
    formik.values.profilePic
      ? formik.values.profilePic.startsWith("http")
        ? formik.values.profilePic
        : `http://localhost:4000/uploads/${formik.values.profilePic}`
      : `http://localhost:4000/public/profile.webp`
  }
  alt="Profile"
  className={styles.profilePic}
/>


          {editMode && (
            <input type="file" accept="image/*" onChange={handleImageChange} />
          )}
        </div>

        {!editMode ? (
          <div>
            <p>
              <strong>Name:</strong> {formik.values.name}
            </p>
            <p>
              <strong>Email:</strong> {formik.values.email}
            </p>
            <p>
              <strong>Role:</strong> {formik.values.role}
            </p>
            <p>
              <strong>Phone:</strong> {formik.values.phone || "Not provided"}
            </p>
            <p>
              <strong>Location:</strong> {formik.values.location || "Not provided"}
            </p>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <p className={styles.error}>{formik.errors.name}</p>
            )}

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <p className={styles.error}>{formik.errors.email}</p>
            )}

            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className={styles.error}>{formik.errors.phone}</p>
            )}

            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
            />

            <div className={styles.btnGroup}>
              <button type="submit">Save Changes</button>
            </div>
          </form>
        )}

        {!editMode && (
          <div className={styles.editBtnWrapper}>
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
}
