"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./review.module.css";

interface Review {
  _id: string;
  rating: number;
  comment: string;
  user?: {
    name: string;
    profilePic?: string;
  };
}

export default function ReviewList({ tourId }: { tourId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchReviews = async () => {
    if (!tourId) return;
    try {
      const res = await axios.get(`http://localhost:4000/reviews/${tourId}`);
      setReviews(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [tourId]);

  return (
    <div style={{ marginTop: "30px" }}>
      <h3 className={styles.reviewTitle}>User Reviews</h3>

      {reviews.length === 0 ? (
        <p style={{ color: "#666", marginTop: "10px" }}>No reviews yet.</p>
      ) : (
        reviews.map((r) => (
          <div key={r._id} className={styles.reviewCard}>
            <img
  src={
    r.user?.profilePic
      ? r.user.profilePic.startsWith("http")
        ? r.user.profilePic
        : `http://localhost:4000/uploads/${r.user.profilePic}`
      : "/avatar.png"
  }
  alt={r.user?.name || "User"}
  className={styles.userAvatar}
/>

            <div className={styles.reviewBody}>
              <p className={styles.reviewerName}>{r.user?.name || "Anonymous"}</p>
              <p className={styles.reviewRating}>{"⭐".repeat(r.rating)}</p>
              <p className={styles.reviewComment}>{r.comment}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
