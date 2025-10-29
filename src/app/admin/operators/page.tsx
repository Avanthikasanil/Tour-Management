"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import styles from "./operators.module.css";
import { FaBoxOpen, FaClipboardList, FaTrashAlt } from "react-icons/fa";

interface Operator {
  _id: string;
  name: string;
  email: string;
  location?: string;
  packageCount: number;
  bookingCount: number;
}

export default function OperatorsPage() {
  const [operators, setOperators] = useState<Operator[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/admin/operators")
      .then((res) => res.json())
      .then((data: Operator[]) => setOperators(data))
      .catch((err) => console.error("Error fetching operators:", err));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this operator?")) return;
    try {
      const res = await fetch(`http://localhost:4000/admin/operators/${id}`, {
        method: "DELETE",
      });
      if (res.ok) setOperators(operators.filter((op) => op._id !== id));
    } catch (err) {
      console.error("Error deleting operator:", err);
    }
  };

  return (
    <div className={styles.container}>
      <AdminSidebar />
      <main className={styles.main}>
        <h2 className={styles.heading}>Operators </h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Location</th>
              <th><FaBoxOpen /> Packages</th>
              <th><FaClipboardList /> Bookings</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {operators.length > 0 ? (
              operators.map((op, index) => (
                <tr key={op._id}>
                  <td>{index + 1}</td>
                  <td>{op.name}</td>
                  <td>{op.email}</td>
                  <td>{op.location || "—"}</td>
                  <td>{op.packageCount ?? 0}</td>
                  <td>{op.bookingCount ?? 0}</td>
                  <td className={styles.actions}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(op._id)}
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className={styles.empty}>
                  No operators found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
