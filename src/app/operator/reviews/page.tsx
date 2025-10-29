"use client";

import { useEffect, useState } from "react";
import styles from "./reviews.module.css";

interface Review {
  _id: string;
  tourName: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export default function OperatorReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // loading state

  // Get token from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:4000/operator/reviews", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log(data); // <- check what fields you actually get
        setReviews(data);

        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false); // stop loading once fetch completes
      }
    };

    fetchReviews();
  }, [token]);

  return (
    <div className={styles.container}>
      <h2>Tour Reviews</h2>

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <div className={styles.reviewList}>
          {reviews.map((r) => (
            <div key={r._id} className={styles.reviewCard}>
              <h3>{r.tourName}</h3> {/* tourName from formatted backend response */}
              <p>
                <strong>{r.reviewerName}</strong> ({r.rating}⭐)
              </p>
              <p>{r.comment}</p>
              <small>{new Date(r.date).toLocaleDateString()}</small>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
