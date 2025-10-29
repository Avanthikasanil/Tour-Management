"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AdminSidebar.module.css";
import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaBoxOpen,
  FaClipboardList,
  FaHeadset,
} from "react-icons/fa";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, link: "/admin/dashboard" },
    { name: "Tourists", icon: <FaUsers />, link: "/admin/tourists" },
    { name: "Operators", icon: <FaBuilding />, link: "/admin/operators" },
    { name: "Packages", icon: <FaBoxOpen />, link: "/admin/packages" },
    { name: "Bookings", icon: <FaClipboardList />, link: "/admin/bookings" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoSection}>
        <img src="/explorely.png" alt="Logo" className={styles.logoImage} />
      </div>

      <ul className={styles.menu}>
        {menuItems.map((item) => {
          const isActive = pathname === item.link;
          return (
            <li
              key={item.name}
              className={`${styles.menuItem} ${isActive ? styles.active : ""}`}
            >
              <Link href={item.link} className={styles.link}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className={styles.supportBox}>
        <FaHeadset /> <span>24/7 Support</span>
      </div>
    </aside>
  );
}
