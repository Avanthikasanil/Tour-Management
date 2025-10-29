"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TouristNav from "@/components/Tourist/TouristNav";
import styles from "./confirm.module.css";
import StepProgress from "@/components/Booking/StepProgress";


interface Tour {
  _id: string;
  destination: string;
  duration: string;
  price: string;
  packageType: string;
}

interface User {
  name: string;
  email: string;
  phone: string;
  location: string;
}

export default function ConfirmBookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tour, setTour] = useState<Tour | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please login first");
          return;
        }

        const tourRes = await fetch(`http://localhost:4000/tours/public/${id}`);
        const tourData = await tourRes.json();

        const userRes = await fetch("http://localhost:4000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();

        setTour(tourData);
        setUser(userData);
      } catch (err) {
        console.error("Error loading booking data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>;
  }

  if (!tour || !user) {
    return <p style={{ textAlign: "center", marginTop: "20px" }}>No details found</p>;
  }

  const handleContinue = () => {
    router.push(`/tourist/booking/${id}/details`);
  };

  return (
    <>
      <TouristNav isTourDetailsPage />
      <StepProgress currentStep={2} bookingId={id as string} />
      <div className={styles.container}>
        <h2 className={styles.title}>Confirm Your Booking</h2>

        <div className={styles.section}>
          <h3>Personal Details</h3>
          <p className={styles.detail}><strong>Name:</strong> {user.name}</p>
          <p className={styles.detail}><strong>Email:</strong> {user.email}</p>
          <p className={styles.detail}><strong>Phone:</strong> {user.phone}</p>
          <p className={styles.detail}><strong>Current location:</strong> {user.location}</p>
        </div>

        <div className={styles.section}>
          <h3>Tour Package</h3>
          <p className={styles.detail}><strong>Destination:</strong> {tour.destination}</p>
          <p className={styles.detail}><strong>Duration:</strong> {tour.duration}</p>
          <p className={styles.detail}><strong>Package:</strong> {tour.packageType}</p>
          <p className={styles.detail}><strong>Price:</strong> ₹{tour.price}</p>
        </div>

        <button className={styles.confirmBtn} onClick={handleContinue}>
          Confirm & Continue
        </button>
      </div>


    </>
  );
}
