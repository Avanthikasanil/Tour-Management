"use client";

import { useEffect, useState } from "react";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import styles from "./bookings.module.css";
import { FaCalendarAlt, FaUser, FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";

interface Booking {
  _id: string;
  user: { name: string; email: string };
  tour: { title: string; location: string };
  date: string;
  people: number;
  amount: number;
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/admin/bookings")
      .then((res) => res.json())
      .then((data: Booking[]) => setBookings(data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await fetch(`http://localhost:4000/admin/bookings/${id}`, {
        method: "DELETE",
      });
      if (res.ok) setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting booking:", err);
    }
  };

  return (
    <div className={styles.container}>
      <AdminSidebar />
      <main className={styles.main}>
        <h2 className={styles.heading}>Bookings</h2>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th><FaUser /> User</th>
              <th><FaMapMarkerAlt /> Tour</th>
              <th><FaCalendarAlt /> Date</th>
              <th>People</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((b, index) => (
                <tr key={b._id}>
                  <td>{index + 1}</td>
                  <td>
                    {b.user?.name || "N/A"} <br />
                    <small className={styles.email}>{b.user?.email}</small>
                  </td>
                  <td>
                    {b.tour?.title || "N/A"} <br />
                    <small className={styles.location}>{b.tour?.location}</small>
                  </td>
                  <td>{new Date(b.date).toLocaleDateString()}</td>
                  <td>{b.people}</td>
                  <td>₹{(b.amount || 0).toFixed(2)}</td>
                  <td className={styles.actions}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(b._id)}
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className={styles.empty}>
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
