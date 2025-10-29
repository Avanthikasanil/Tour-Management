// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import styles from "./review.module.css";

// interface Review {
//   _id: string;
//   rating: number;
//   comment: string;
//   user?: {
//     name: string;
//     profilePic?: string;
//   };
//   tour?: {
//     name: string;
//   };
// }

// export default function AllReviewsPage() {
//   const [reviews, setReviews] = useState<Review[]>([]);

//   const fetchAllReviews = async () => {
//     try {
//       const res = await axios.get("http://localhost:4000/reviews/all");
//       setReviews(res.data);
//     } catch (err) {
//       console.error("Failed to fetch reviews", err);
//     }
//   };

//   useEffect(() => {
//     fetchAllReviews();
//   }, []);

//   return (
//     <div className={styles.allReviewsContainer}>
//       <h2 className={styles.allReviewsTitle}>All User Reviews</h2>

//       {reviews.length === 0 ? (
//         <p className={styles.reviewText}>No reviews yet.</p>

//       ) : (
//         reviews.map((r) => (
//           <div key={r._id} className={styles.reviewCard}>
// <img
//   src={r.user?.profilePic || "/avatar.png"}
//   alt={r.user?.name || "User"}
//   className={styles.userAvatar}
// />

//             <div className={styles.reviewBody}>
//               <p className={styles.reviewerName}>
//   {r.user?.name || "Anonymous"} reviewed <strong>{r.tour?.name}</strong>
// </p>
//               <p className={styles.reviewRating}>{"⭐".repeat(r.rating)}</p>
//               <p className={styles.reviewComment}>{r.comment}</p>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }
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
  tour?: {
    name: string;
  };
}

export default function AllReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const fetchAllReviews = async () => {
    try {
      const res = await axios.get("http://localhost:4000/reviews/all");
      setReviews(res.data);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  return (
    <div className={styles.allReviewsContainer}>
      <div className={styles.headerSection}>
        <p className={styles.subtitle}>EXPLORELY</p>
        <h2 className={styles.allReviewsTitle}>
          Take a Look at What Our Amazing<br />Clients Have said
        </h2>
      </div>

      {reviews.length === 0 ? (
        <p className={styles.reviewText}>No reviews yet.</p>
      ) : (
        <div className={styles.reviewsGrid}>
          {reviews.map((r, index) => (
            <div key={r._id} className={styles.reviewCard}>
              <div className={styles.cardNumber}>{index + 1}</div>
              <p className={styles.reviewComment}>"{r.comment}"</p>
              <div className={styles.avatarWrapper}>
                <img
                  src={r.user?.profilePic || "/avatar.png"}
                  alt={r.user?.name || "User"}
                  className={styles.userAvatar}
                />
              </div>
              <p className={styles.reviewerName}>
                {r.user?.name || "Anonymous"}
              </p>
              <p className={styles.tourName}>{r.tour?.name}</p>
              <p className={styles.reviewRating}>{"⭐".repeat(r.rating)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}