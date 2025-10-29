"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import styles from "./review.module.css";

interface ReviewFormProps {
  tourId: string;
  onReviewAdded?: () => void;
}

export default function ReviewForm({ tourId, onReviewAdded }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      toast.warning("Please add a rating and comment");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("Login to add a review");
        return;
      }

      await axios.post(
        "http://localhost:4000/reviews",
        { tourId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Review added successfully!");
      setRating(0);
      setComment("");
      onReviewAdded?.();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.reviewForm}>
      <h3 className={styles.reviewTitle}>Rate and Review</h3>

      <div className={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={28}
            onClick={() => setRating(star)}
            fill={star <= rating ? "#00c3b3" : "none"}
            stroke="#00c3b3"
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your experience..."
        className={styles.commentBox}
      />

      <div className={styles.btnGroup}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={() => {
            setComment("");
            setRating(0);
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={styles.submitBtn}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}
