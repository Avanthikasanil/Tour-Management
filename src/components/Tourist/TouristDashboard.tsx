
// "use client";

// import { useRouter } from "next/navigation";
// import { toast, ToastContainer } from "react-toastify";
// import { Clock, IndianRupee, Briefcase } from "lucide-react";
// import styles from "./TouristDashboard.module.css";
// import "react-toastify/dist/ReactToastify.css";

// export interface Tour {
//   _id?: string;
//   destination: string;
//   duration: string;
//   packageType: string;
//   itinerary: string;
//   highlights: string;
//   activities: string;
//   inclusions: string[];
//   exclusions: string[];
//   price: string;
//   availability: string;
//   mainImage: string;
//   description: string;
//   moreImages: string[];
// }

// // ✅ Accept tours as prop
// interface TouristDashboardProps {
//   tours: Tour[];
// }

// export default function TouristDashboard({ tours }: TouristDashboardProps) {
//   const router = useRouter();

//   const handleAddToWishlist = async (tourId: string) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.warning("⚠️ Please login to add to wishlist");
//         return;
//       }

//       const res = await fetch("http://localhost:4000/wishlist/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ tourId }),
//       });

//       const data = await res.json();
//       toast.success(data.message || "✅ Added to wishlist");
//     } catch (err: any) {
//       console.error("Error adding to wishlist:", err);
//       toast.error("❌ Failed to add to wishlist");
//     }
//   };

//   if (!tours.length)
//     return <p className={styles.heading}>No packages found.</p>;

//   return (
//     <div className={styles.container} id="package">
//       <h2 className={styles.heading}>All Tour Packages</h2>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <div className={styles.cardGrid}>
//         {tours.map((tour) => (
//           <div key={tour._id} className={styles.card}>
//             <div className={styles.imageWrapper}>
//               <img
//                 src={`http://localhost:4000${tour.mainImage}`}
//                 alt={tour.destination}
//                 className={styles.cardImage}
//               />
//               <span className={styles.durationBadge}>
//                 <Clock className={styles.icon} /> {tour.duration}
//               </span>
//               <span className={styles.priceBadge}>
//                 <IndianRupee className={styles.icon} /> {tour.price}
//               </span>
//             </div>

//             <div className={styles.cardContent}>
//               <h3>{tour.destination}</h3>
//               <p className={styles.description}>{tour.description}</p>
//               <p className={styles.packageType}>
//                 <Briefcase className={styles.icon} /> {tour.packageType}
//               </p>

//               <p
//                 className={
//                   tour.availability === "Available"
//                     ? styles.available
//                     : styles.notAvailable
//                 }
//               >
//                 {tour.availability}
//               </p>

//               <div className={styles.actionRow}>
//                 <button
//                   className={styles.viewMoreBtn}
//                   onClick={() => router.push(`/tourist/tour/${tour._id}`)}
//                 >
//                   View Details
//                 </button>

//                 <img
//                   src="/wishlist.png"
//                   alt="Add to Wishlist"
//                   className={styles.heartIcon}
//                   onClick={() => handleAddToWishlist(tour._id!)}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { Clock, IndianRupee, Briefcase } from "lucide-react";
import styles from "./TouristDashboard.module.css";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

export interface Tour {
  _id?: string;
  destination: string;
  duration: string;
  packageType: string;
  itinerary: string;
  highlights: string;
  activities: string;
  inclusions: string[];
  exclusions: string[];
  price: string;
  availability: string;
  mainImage: string;
  description: string;
  moreImages: string[];
}

interface TouristDashboardProps {
  tours: Tour[];
}

export default function TouristDashboard({ tours }: TouristDashboardProps) {
  const router = useRouter();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(tours.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTours = tours.slice(startIndex, startIndex + itemsPerPage);

  // Wishlist function
  const handleAddToWishlist = async (tourId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("⚠️ Please login to add to wishlist");
        return;
      }

      const res = await fetch("http://localhost:4000/wishlist/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tourId }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "✅ Added to wishlist");
      } else {
        toast.error(data.message || "❌ Failed to add to wishlist");
      }
    } catch (err: any) {
      console.error("Error adding to wishlist:", err);
      toast.error("❌ Failed to add to wishlist");
    }
  };

  if (!tours.length) return <p className={styles.heading}>No packages found.</p>;

  return (
    <div className={styles.container} id="package">
      <h2 className={styles.heading}>All Tour Packages</h2>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className={styles.cardGrid}>
        {currentTours.map((tour) => (
          <div key={tour._id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={`http://localhost:4000${tour.mainImage}`}
                alt={tour.destination}
                className={styles.cardImage}
              />
              <span className={styles.durationBadge}>
                <Clock className={styles.icon} /> {tour.duration}
              </span>
              <span className={styles.priceBadge}>
                <IndianRupee className={styles.icon} /> {tour.price}
              </span>
            </div>

            <div className={styles.cardContent}>
              <h3>{tour.destination}</h3>
              <p className={styles.description}>{tour.description}</p>
              <p className={styles.packageType}>
                <Briefcase className={styles.icon} /> {tour.packageType}
              </p>

              <p
                className={
                  tour.availability === "Available"
                    ? styles.available
                    : styles.notAvailable
                }
              >
                {tour.availability}
              </p>

              <div className={styles.actionRow}>
                <button
                  className={styles.viewMoreBtn}
                  onClick={() => router.push(`/tourist/tour/${tour._id}`)}
                >
                  View Details
                </button>

                <img
                  src="/wishlist.png"
                  alt="Add to Wishlist"
                  className={styles.heartIcon}
                  onClick={() => handleAddToWishlist(tour._id!)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? styles.activePage : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
