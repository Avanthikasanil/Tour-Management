// "use client";

// import Link from "next/link";
// import styles from "./MainNav.module.css";

// export default function Navbar() {
//   return (
//     <nav className={styles.navbar}>
//       <div className={styles.logo}>
//         <img src="/explorely.png" alt="logo" />
//       </div>

//       {/* Links + Buttons together */}
//       <div className={styles.rightSection}>
//         <ul className={styles.navLinks}>
//           <li><Link href="/">Home</Link></li>
//           <li><Link href="#about">About Us</Link></li>
//           <li><Link href="#services">Services</Link></li>
//           <li><Link href="#benefits">Benefits</Link></li>
//           <li><Link href="#contact">Contact Us</Link></li>
//         </ul>

//          <div className={styles.buttons}>
//           <Link href="/register">
//             <button className={styles.register}>Register</button>
//           </Link>
//           <Link href="/login">
//             <button className={styles.login}>Login</button>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }
"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./MainNav.module.css";
import { Menu, X } from "lucide-react"; // ✅ Lucide icons for hamburger

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/explorely.png" alt="logo" />
      </div>

      {/* Hamburger icon for mobile */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Right section */}
      <div className={`${styles.rightSection} ${isOpen ? styles.active : ""}`}>
        <ul className={styles.navLinks}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="#about">About Us</Link></li>
          <li><Link href="#services">Services</Link></li>
          <li><Link href="#benefits">Benefits</Link></li>
          <li><Link href="#contact">Contact Us</Link></li>
        </ul>

        <div className={styles.buttons}>
          <Link href="/register">
            <button className={styles.register}>Register</button>
          </Link>
          <Link href="/login">
            <button className={styles.login}>Login</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
