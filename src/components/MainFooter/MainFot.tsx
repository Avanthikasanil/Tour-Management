"use client";

import styles from "./MainFot.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* About Section */}
        <div className={styles.section}>
          <div className={styles.logofot}>
            <img src="/explorely.png" alt="logo" />
        </div>
          <p>Explorely helps you plan unforgettable journeys with curated tours, 
            detailed itineraries, and hassle-free bookings.</p>
        </div>

        {/* Quick Links */}
        <div className={styles.section}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#services">services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className={styles.section}>
          <h4>Contact</h4>
          <p>Email: explorely@gmail.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Address: 123, Explorely Street, India</p>
        </div>

        {/* Social Links */}
        <div className={styles.section}>
          <h4>Follow Us</h4>
          <div className={styles.socialIcons}>
            <a href="https://www.facebook.com/" aria-label="Facebook">
                <img src="/facebook (2).png" alt="facebook" />
            </a>
            <a href="https://www.instagram.com/" aria-label="Instagram">
                <img src="/insta (2).png" alt="instagram" />
            </a>
            <a href="https://x.com/" aria-label="Twitter">
                <img src="/twiter.png" alt="twitter" />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 Explorely. All rights reserved.</p>
      </div>
    </footer>
  );
}
