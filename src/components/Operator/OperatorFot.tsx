"use client";
import styles from "./OperatorFot.module.css";

export default function OperatorFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* About */}
        <div className={styles.section}>
          <h4>Explorely</h4>
          <p>
            Discover the beauty of the world with curated travel packages.
            Explore, dream, and create memories that last forever.
          </p>
        </div>

        {/* Links */}
        <div className={styles.section}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#">Bookings</a></li>
            <li><a href="#">Reviews</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>

        {/* Social */}
        <div className={styles.section}>
          <h4>Follow Us</h4>
          <div className={styles.social}>
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

      {/* Bottom */}
      <div className={styles.bottom}>
        <p>© 2025 Explorely. Made with for Travelers.</p>
      </div>
    </footer>
  );
}
