"use client";

import Link from "next/link";
import { useState } from "react";
import OperatorProfile from "./OperatorProfile";
import styles from "./OperatorNav.module.css";
import { useRouter } from "next/navigation";

export default function OperatorNav() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For hamburger
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src="/explorely.png" alt="logo" />
        </div>

        {/* Hamburger icon */}
        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`${styles.navList} ${menuOpen ? styles.active : ""}`}>
          <li><Link href="/operator/dashboard">Home</Link></li>
          <li><Link href="/operator/bookings">Bookings</Link></li>
          <li><Link href="/operator/reviews">Reviews</Link></li>
          <li><button onClick={() => setIsProfileOpen(true)}>Profile</button></li>
        </ul>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Profile Drawer */}
      <OperatorProfile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
