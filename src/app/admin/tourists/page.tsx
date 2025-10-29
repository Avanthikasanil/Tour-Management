"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import styles from "./tourists.module.css";
import { FaCheckCircle, FaTimesCircle, FaTrashAlt } from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
  location?: string;
  hasBookedTour?: boolean;
}

export default function TouristsPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/admin/users")
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`http://localhost:4000/admin/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div className={styles.container}>
      <AdminSidebar />
      <main className={styles.main}>
        <h2 className={styles.heading}>Tourists </h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th>Booked Tour</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((u, index) => (
                <tr key={u._id}>
                  <td>{index + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.location || "—"}</td>
                  <td className={styles.center}>
                    {u.hasBookedTour ? (
                      <FaCheckCircle color="#22c55e" />
                    ) : (
                      <FaTimesCircle color="#ef4444" />
                    )}
                  </td>
                  <td className={styles.actions}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(u._id)}
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.empty}>
                  No tourists found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
