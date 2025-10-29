// "use client";

// import { useState } from "react";
// import styles from "./TourCard.module.css";

// interface Tour {
//   _id?: string;
//   destination: string;
//   duration: string;
//   packageType: string;
//   itinerary?: string;
//   highlights?: string;
//   activities?: string;
//   inclusions?: string[];
//   exclusions?: string[];
//   price: string;
//   availability: string;
//   mainImage: string;
//   description?: string;
//   moreImages?: string[];
// }

// interface TourCardProps {
//   tour: Tour;
//   onEdit?: (tour: Tour) => void;
//   onDelete?: (id?: string) => void;
//   onAddToWishlist?: (id?: string) => void;
//   onRemoveFromWishlist?: (id?: string) => void;
//   onBookNow?: (id?: string) => void;
//   mode?: "admin" | "operator" | "dashboard" | "wishlist"; 
// }

// export default function TourCard({
//   tour,
//   onEdit,
//   onDelete,
//   onAddToWishlist,
//   onRemoveFromWishlist,
//   onBookNow,
//   mode = "dashboard",
// }: TourCardProps) {
//   const images = [tour.mainImage, ...(tour.moreImages || [])];
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
//   const prevImage = () =>
//     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

//   return (
//     <div className={styles.card}>
//       {/* ✅ Image Slider */}
//       <div className={styles.slider}>
//         <img
//           src={`http://localhost:4000${images[currentIndex]}`}
//           alt={`${tour.destination} ${currentIndex + 1}`}
//           className={styles.slideImage}
//         />

//         {images.length > 1 && (
//           <>
//             <button className={styles.prevBtn} onClick={prevImage}>‹</button>
//             <button className={styles.nextBtn} onClick={nextImage}>›</button>
//           </>
//         )}

//         <div className={styles.dots}>
//           {images.map((_, idx) => (
//             <span
//               key={idx}
//               className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ""}`}
//               onClick={() => setCurrentIndex(idx)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* ✅ Tour Details */}
//       <div className={styles.cardContent}>
//         <h3>{tour.destination}</h3>
//         <p><strong>Duration:</strong> {tour.duration}</p>
//         <p><strong>Package:</strong> {tour.packageType}</p>
//         <p className={styles.price}><strong>Price:</strong> ₹{tour.price}</p>
//         <p className={`${styles.availability} ${tour.availability === "Available" ? styles.available : styles.notAvailable}`}>
//           {tour.availability}
//         </p>

//         {/* ✅ Buttons change by mode */}
//         <div className={styles.cardButtons}>
//  {(mode === "admin" || mode === "operator") && (
//   <>
//     <button className={styles.editBtn} onClick={() => onEdit?.(tour)}>
//       Edit
//     </button>
//     <button className={styles.deleteBtn} onClick={() => onDelete?.(tour._id)}>
//       Delete
//     </button>
//   </>
// )}


//   {mode === "dashboard" && (
//     <button
//       className={styles.wishlistBtn}
//       onClick={() => onAddToWishlist?.(tour._id)}
//     >
//       ❤️ Add to Wishlist
//     </button>
//   )}

//   {mode === "wishlist" && (
//     <>
//       <button
//         className={styles.deleteBtn}
//         onClick={() => onRemoveFromWishlist?.(tour._id)}
//       >
//          Remove
//       </button>
//       <button
//         className={styles.editBtn}
//         onClick={() => onBookNow?.(tour._id)}
//       >
//          Book Now
//       </button>
//     </>
//   )}
// </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import styles from "./TourCard.module.css";

interface Tour {
  _id?: string;
  destination: string;
  duration: string;
  packageType: string;
  itinerary?: string;
  highlights?: string;
  activities?: string;
  inclusions?: string[];
  exclusions?: string[];
  price: string;
  availability: string;
  mainImage: string;
  description?: string;
  moreImages?: string[];
}

interface TourCardProps {
  tour: Tour;
  onEdit?: (tour: Tour) => void;
  onDelete?: (id?: string) => void;
  onAddToWishlist?: (id?: string) => void;
  onRemoveFromWishlist?: (id?: string) => void;
  onBookNow?: (id?: string) => void;
  mode?: "admin" | "operator" | "dashboard" | "wishlist";
}

export default function TourCard({
  tour,
  onEdit,
  onDelete,
  onAddToWishlist,
  onRemoveFromWishlist,
  onBookNow,
  mode = "dashboard",
}: TourCardProps) {
  const images = [tour.mainImage, ...(tour.moreImages || [])];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false); // ✅ Modal visibility state

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleDeleteClick = () => {
    setShowModal(true); // ✅ Open modal
  };

  const confirmDelete = () => {
    onDelete?.(tour._id);
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={styles.card}>
        {/* ✅ Image Slider */}
        <div className={styles.slider}>
          <img
            src={`http://localhost:4000${images[currentIndex]}`}
            alt={`${tour.destination} ${currentIndex + 1}`}
            className={styles.slideImage}
          />

          {images.length > 1 && (
            <>
              <button className={styles.prevBtn} onClick={prevImage}>
                ‹
              </button>
              <button className={styles.nextBtn} onClick={nextImage}>
                ›
              </button>
            </>
          )}

          <div className={styles.dots}>
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`${styles.dot} ${
                  idx === currentIndex ? styles.activeDot : ""
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>

        {/* ✅ Tour Details */}
        <div className={styles.cardContent}>
          <h3>{tour.destination}</h3>
          <p>
            <strong>Duration:</strong> {tour.duration}
          </p>
          <p>
            <strong>Package:</strong> {tour.packageType}
          </p>
          <p className={styles.price}>
            <strong>Price:</strong> ₹{tour.price}
          </p>
          <p
            className={`${styles.availability} ${
              tour.availability === "Available"
                ? styles.available
                : styles.notAvailable
            }`}
          >
            {tour.availability}
          </p>

          {/* ✅ Buttons */}
          <div className={styles.cardButtons}>
            {(mode === "admin" || mode === "operator") && (
              <>
                <button
                  className={styles.editBtn}
                  onClick={() => onEdit?.(tour)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteBtn}
                  onClick={handleDeleteClick} // ✅ open modal first
                >
                  Delete
                </button>
              </>
            )}

            {mode === "dashboard" && (
              <button
                className={styles.wishlistBtn}
                onClick={() => onAddToWishlist?.(tour._id)}
              >
                ❤️ Add to Wishlist
              </button>
            )}

            {mode === "wishlist" && (
              <>
                <button
                  className={styles.deleteBtn}
                  onClick={() => onRemoveFromWishlist?.(tour._id)}
                >
                  Remove
                </button>
                <button
                  className={styles.editBtn}
                  onClick={() => onBookNow?.(tour._id)}
                >
                  Book Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Delete Confirmation Modal */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>Delete Package?</h3>
            <p>
              Are you sure you want to delete this package?
              <br />
              <strong>This package will be permanently deleted.</strong>
            </p>
            <div className={styles.modalActions}>
              <button className={styles.confirmBtn} onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className={styles.cancelBtn} onClick={cancelDelete}>
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
