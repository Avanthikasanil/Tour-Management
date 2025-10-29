"use client";

import { useEffect, useState } from "react";
import styles from "./bookings.module.css";

interface Booking {
  _id: string;
  tour?: {
    destination: string;
    price: number;
  };
  user?: {
    name: string;
    email: string;
  };
  people: number;
  date: string;
  paymentStatus: string;
}


export default function OperatorBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [token, setToken] = useState<string | null>(null);

  // ✅ Get token safely in browser
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const fetchBookings = async (authToken: string) => {
    try {
      const res = await fetch("http://localhost:4000/operator/bookings", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  // ✅ Fetch bookings only after token is loaded
  useEffect(() => {
    if (token) {
      fetchBookings(token);
    }
  }, [token]);

  return (
    <div className={styles.container}>
      <h2>Your Tour Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found yet.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Tour Name</th>
              <th>Customer</th>
              <th>People</th>
              <th>Date</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
  {bookings.map((b) => (
    <tr key={b._id}>
      <td data-label="Tour Name">{b.tour?.destination}</td>
      <td data-label="Customer">{b.user?.name}</td>
      <td data-label="People">{b.people}</td>
      <td data-label="Date">{new Date(b.date).toLocaleDateString()}</td>
      <td data-label="Total Price">₹{(b.tour?.price || 0) * b.people}</td>
      <td data-label="Status">{b.paymentStatus}</td>
    </tr>
  ))}
</tbody>

        </table>
      )}
    </div>
  );
}
