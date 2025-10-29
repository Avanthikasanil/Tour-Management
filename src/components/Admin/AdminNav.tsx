"use client";
import React, { useState } from "react";
import styles from "./AdminNav.module.css";
import AdminProfile from "./AdminProfile";
import { FaUserCircle } from "react-icons/fa";

export default function AdminNavbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <h4>Dashboard</h4>
        </div>

        <div className={styles.right}>
          {/* Clickable Profile Icon */}
          <div
            className={styles.adminInfo}
            onClick={() => setIsProfileOpen(true)}
          >
            <FaUserCircle size={28} />
            <span>Admin</span>
          </div>

          {/* Logout Button */}
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Profile Drawer */}
      <AdminProfile
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </>
  );
}
