
// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import TouristNav from "@/components/Tourist/TouristNav";
// import styles from "./Bookings.module.css";
// import { useRouter } from "next/navigation";


// interface Tour {
//   _id: string;
//   destination: string;
//   duration: string;
//   price: string;
//   mainImage?: string;
//   image?: string;
//   images?: string[];
// }

// interface Booking {
//   _id: string;
//   tour: Tour | null;
//   date: string;
//   people: number;
//   paymentStatus?: string;
// }

// export default function TouristBookings() {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();


//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           toast.warning("⚠️ Please login to view your bookings");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get("http://localhost:4000/bookings/my", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data && res.data.length > 0) {
//           const validBookings = res.data.filter((b: any) => b.tour !== null);
//           setBookings(validBookings);
//         } else {
//           setBookings([]);
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("❌ Failed to load bookings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const handleCancel = async (bookingId: string) => {
//     if (!confirm("Are you sure you want to cancel this booking?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`http://localhost:4000/bookings/${bookingId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setBookings((prev) => prev.filter((b) => b._id !== bookingId));
//       toast.success("✅ Booking cancelled successfully");
//     } catch (err) {
//       console.error(err);
//       toast.error("❌ Failed to cancel booking");
//     }
//   };

// const handleViewDetails = (bookingId: string) => {
//   const booking = bookings.find(b => b._id === bookingId);
//   if (booking && booking.tour) {
//     router.push(`/tourist/tour/${booking.tour._id}`);
//   } else {
//     toast.error("Tour not found for this booking");
//   }
// };




//   if (loading) return <p className={styles.heading}>Loading...</p>;

//   return (
//     <>
//       <TouristNav />

//       <div className={styles.container}>
//         <h2 className={styles.heading}>Your Booked Journeys</h2>
//         <ToastContainer position="top-right" autoClose={3000} />

//         {bookings.length === 0 ? (
//           <p className={styles.emptyState}>You haven't booked any tours yet.</p>
//         ) : (
//           <div className={styles.cardGrid}>
//             {bookings.map((booking) =>
//               booking.tour ? (
//                 <div key={booking._id} className={styles.card}>
//                   <img
//                     src={
//                       booking.tour.mainImage?.startsWith("http")
//                         ? booking.tour.mainImage
//                         : `http://localhost:4000/${booking.tour.mainImage?.replace(
//                             /^\/+/,
//                             ""
//                           )}`
//                     }
//                     alt={booking.tour.destination}
//                     className={styles.image}
//                   />

//                   <div className={styles.info}>
//                     <div>
//                       <h3>{booking.tour.destination}</h3>
//                       <p className={styles.dateRange}>
//                         {new Date(booking.date).toLocaleDateString("en-US", {
//                           month: "short",
//                           day: "numeric"
//                         })} – {new Date(new Date(booking.date).setDate(
//                           new Date(booking.date).getDate() + parseInt(booking.tour.duration)
//                         )).toLocaleDateString("en-US", {
//                           month: "short",
//                           day: "numeric"
//                         })}
//                       </p>
//                       <div className={styles.details}>
//                         <p>
//                           <span className={styles.label}>Duration:</span> {booking.tour.duration}
//                         </p>
//                         <p>
//                           <span className={styles.label}>People:</span> {booking.people}
//                         </p>
//                         <p>
//                           <span className={styles.label}>Payment:</span>{" "}
//                           <span
//                             className={
//                               booking.paymentStatus === "Paid"
//                                 ? styles.statusPaid
//                                 : booking.paymentStatus === "Pending"
//                                 ? styles.statusPending
//                                 : styles.statusFailed
//                             }
//                           >
//                             {booking.paymentStatus || "Pending"}
//                           </span>
//                         </p>
//                       </div>
//                     </div>

//                     <div className={styles.actions}>
//                       <button
//                         className={styles.cancelButton}
//                         onClick={() => handleCancel(booking._id)}
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         className={styles.viewButton}
//                         onClick={() => handleViewDetails(booking._id)}
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TouristNav from "@/components/Tourist/TouristNav";
import styles from "./Bookings.module.css";
import { useRouter } from "next/navigation";

interface Tour {
  _id: string;
  destination: string;
  duration: string;
  price: string;
  mainImage?: string;
  image?: string;
  images?: string[];
}

interface Booking {
  _id: string;
  tour: Tour | null;
  date: string;
  people: number;
  paymentStatus?: string;
}

export default function TouristBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.warning("⚠️ Please login to view your bookings");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:4000/bookings/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.length > 0) {
          const validBookings = res.data.filter((b: any) => b.tour !== null);
          setBookings(validBookings);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (bookingId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:4000/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      toast.success("✅ Booking cancelled successfully");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to cancel booking");
    }
  };

  const openCancelModal = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setShowModal(true);
  };

  const confirmCancel = () => {
    if (selectedBookingId) {
      handleCancel(selectedBookingId);
    }
    setShowModal(false);
    setSelectedBookingId(null);
  };

  const handleViewDetails = (bookingId: string) => {
    const booking = bookings.find((b) => b._id === bookingId);
    if (booking && booking.tour) {
      router.push(`/tourist/tour/${booking.tour._id}`);
    } else {
      toast.error("Tour not found for this booking");
    }
  };

  if (loading) return <p className={styles.heading}>Loading...</p>;

  return (
    <>
      <TouristNav />
      <div className={styles.container}>
        <h2 className={styles.heading}>Your Booked Journeys</h2>
        <ToastContainer position="top-right" autoClose={3000} />

        {bookings.length === 0 ? (
          <p className={styles.emptyState}>You haven't booked any tours yet.</p>
        ) : (
          <div className={styles.cardGrid}>
            {bookings.map((booking) =>
              booking.tour ? (
                <div key={booking._id} className={styles.card}>
                  <img
                    src={
                      booking.tour.mainImage?.startsWith("http")
                        ? booking.tour.mainImage
                        : `http://localhost:4000/${booking.tour.mainImage?.replace(
                            /^\/+/,
                            ""
                          )}`
                    }
                    alt={booking.tour.destination}
                    className={styles.image}
                  />

                  <div className={styles.info}>
                    <div>
                      <h3>{booking.tour.destination}</h3>
                      <p className={styles.dateRange}>
                        {new Date(booking.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        –{" "}
                        {new Date(
                          new Date(booking.date).setDate(
                            new Date(booking.date).getDate() +
                              parseInt(booking.tour.duration)
                          )
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      <div className={styles.details}>
                        <p>
                          <span className={styles.label}>Duration:</span>{" "}
                          {booking.tour.duration}
                        </p>
                        <p>
                          <span className={styles.label}>People:</span>{" "}
                          {booking.people}
                        </p>
                        <p>
                          <span className={styles.label}>Payment:</span>{" "}
                          <span
                            className={
                              booking.paymentStatus === "Paid"
                                ? styles.statusPaid
                                : booking.paymentStatus === "Pending"
                                ? styles.statusPending
                                : styles.statusFailed
                            }
                          >
                            {booking.paymentStatus || "Pending"}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className={styles.actions}>
                      <button
                        className={styles.cancelButton}
                        onClick={() => openCancelModal(booking._id)}
                      >
                        Cancel
                      </button>
                      <button
                        className={styles.viewButton}
                        onClick={() => handleViewDetails(booking._id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ) : null
            )}
          </div>
        )}
      </div>

      {/* ✅ Cancel Confirmation Modal */}
      {showModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h3>Cancel Booking?</h3>
            <p>
              Are you sure you want to cancel this booking?
              <br />
              <strong>Your amount will be refunded within 7 days.</strong>
            </p>
            <div className={styles.modalActions}>
              <button className={styles.confirmBtn} onClick={confirmCancel}>
                Yes, Cancel
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowModal(false)}
              >
                No, Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
