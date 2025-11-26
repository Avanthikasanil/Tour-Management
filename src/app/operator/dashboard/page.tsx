"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../components/Operator/OperatorProfile.module.css";


export default function OperatorProfilePage() {
  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
    role: "Operator",
    phone: "",
    location: "",
    profilePic: "/profile.webp",
  });

  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem("token"); // JWT from login

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
    fetchProfile();
  }, []);

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
      const isChanged = JSON.stringify(values) !== JSON.stringify(initialData);
      if (!isChanged) {
        toast.info("No changes made");
        setEditMode(false);
        return;
      }

      try {
        const res = await axios.put(
          "http://localhost:4000/users/profile",
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInitialData(res.data);
        toast.success("✅ Profile updated successfully!");
        setTimeout(() => setEditMode(false), 1500);
      } catch (error: any) {
        toast.error(error.response?.data?.message || "❌ Failed to update profile");
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      formik.setFieldValue("profilePic", imageUrl);
    }
  };

  return (
    <div className={styles.drawer}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.drawerContent}>
        <h2>Operator Profile</h2>

        <div className={styles.picWrapper}>
          <img src={formik.values.profilePic} alt="Profile" className={styles.profilePic} />
          {editMode && <input type="file" accept="image/*" onChange={handleImageChange} />}
        </div>

        <div className={styles.editBtnWrapper}>
          {!editMode && <button onClick={() => setEditMode(true)}>Edit Profile</button>}
        </div>

        {!editMode ? (
          <div>
            <p><strong>Name:</strong> {formik.values.name}</p>
            <p><strong>Email:</strong> {formik.values.email}</p>
            <p><strong>Role:</strong> {formik.values.role}</p>
            <p><strong>Phone:</strong> {formik.values.phone || "Not provided"}</p>
            <p><strong>Location:</strong> {formik.values.location || "Not provided"}</p>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <label>Name</label>
            <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} className={styles.inputField} />
            {formik.touched.name && formik.errors.name && <p className={styles.error}>{formik.errors.name}</p>}

            <label>Email</label>
            <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={styles.inputField} />
            {formik.touched.email && formik.errors.email && <p className={styles.error}>{formik.errors.email}</p>}

            <label>Phone</label>
            <input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} className={styles.inputField} />
            {formik.touched.phone && formik.errors.phone && <p className={styles.error}>{formik.errors.phone}</p>}

            <label>Location</label>
            <input type="text" name="location" value={formik.values.location} onChange={formik.handleChange} className={styles.inputField} />

            <div className={styles.btnGroup}>
              <button type="submit">Save Changes</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
