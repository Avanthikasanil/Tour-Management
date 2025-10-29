"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import styles from "./packages.module.css";

interface Operator {
  name: string;
  email: string;
}

interface Package {
  _id: string;
  destination: string;
  duration: number;
  price: number;
  operator: Operator;
  bookingsCount: number;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/admin/packages")
      .then((res) => res.json())
      .then((data: Package[]) => setPackages(data))
      .catch((err) => console.error("Error fetching packages:", err));
  }, []);

  return (
    <div className={styles.adminContainer}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className={styles.content}>
        <h2 className={styles.heading}>Packages 📦</h2>

        <div className={styles.tableContainer}>
          <table className={styles.adminTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Destination</th>
                <th>Operator</th>
                <th>Price</th>
                <th>Duration</th>
                <th>Bookings</th>
              </tr>
            </thead>
            <tbody>
              {packages.length > 0 ? (
                packages.map((pkg, index) => (
                  <tr key={pkg._id}>
                    <td>{index + 1}</td>
                    <td>{pkg.destination}</td>
                    <td>{pkg.operator?.name || "Unknown"}</td>
                    <td>₹{pkg.price}</td>
                    <td>{pkg.duration} days</td>
                    <td>{pkg.bookingsCount || 0}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "15px" }}>
                    No packages found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
