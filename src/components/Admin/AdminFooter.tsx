"use client";

import React from "react";
import styles from "./AdminFooter.module.css";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Left Section */}
        <div className={styles.left}>
          <h4>Admin Panel</h4>
          <p>© {currentYear} Explorely. All rights reserved.</p>
        </div>

        {/* Center Section */}
        <div className={styles.center}>
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/tourists">Tourists</a>
          <a href="/admin/operators">Operators</a>
          <a href="/admin/packages">Packages</a>
          <a href="/admin/bookings">Bookings</a>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <Github size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <Twitter size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
