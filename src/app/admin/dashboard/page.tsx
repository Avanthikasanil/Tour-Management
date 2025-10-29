"use client";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import AdminNavbar from "@/components/Admin/AdminNav";
import AdminFooter from "@/components/Admin/AdminFooter";
import styles from "./admindas.module.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Stats {
  tourists: number;
  operators: number;
  packages: number;
  bookings: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("http://localhost:4000/admin/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  const data = {
    labels: ["Tourists", "Operators", "Packages", "Bookings"],
    datasets: [
      {
        data: [
          stats?.tourists || 0,
          stats?.operators || 0,
          stats?.packages || 0,
          stats?.bookings || 0,
        ],
        backgroundColor: ["#007bff", "#28a745", "#ffc107", "#dc3545"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
    <div className={styles.adminLayout}>
      <AdminSidebar />

      <div className={styles.mainContent}>
        <AdminNavbar />

        <div className={styles.cards}>
          <div className={styles.card}>
            <h4>Tourists</h4>
            <p>{stats?.tourists ?? "..."}</p>
          </div>
          <div className={styles.card}>
            <h4>Operators</h4>
            <p>{stats?.operators ?? "..."}</p>
          </div>
          <div className={styles.card}>
            <h4>Packages</h4>
            <p>{stats?.packages ?? "..."}</p>
          </div>
          <div className={styles.card}>
            <h4>Bookings</h4>
            <p>{stats?.bookings ?? "..."}</p>
          </div>
        </div>

        <div className={styles.chartBox}>
          <h4>Total Distribution</h4>
          <div className={styles.chartContainer}>
            <Doughnut data={data} />
          </div>
        </div>
      </div>
    </div>
    <AdminFooter />
    </>
  );
}
