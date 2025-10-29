// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import TourCard from "@/components/Operator/TourCard";
// import styles from "./Wishlist.module.css"; 
// import TouristNav from "@/components/Tourist/TouristNav"; 
// import { useRouter } from "next/navigation";


// interface Tour {
//   _id: string;
//   destination: string;
//   packageType: string;
//   duration: string;
//   price: string;
//   availability: string;
//   mainImage: string;
//   description: string;
//   moreImages: string[];
// }

// export default function WishlistPage() {
//   const [wishlist, setWishlist] = useState<Tour[]>([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();


//   useEffect(() => {
//     const fetchWishlist = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           toast.warning("⚠️ Please login to view your wishlist");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get("http://localhost:4000/wishlist/my", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data && res.data.length > 0) {
//           setWishlist(res.data.map((w: any) => w.tour));
//         } else {
//           setWishlist([]);
//         }
//       } catch (error: any) {
//         toast.error("❌ Failed to load wishlist");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWishlist();
//   }, []);

//   if (loading) return <p className={styles.heading}>Loading...</p>;

//   return (
//   <>
//    <TouristNav isWishlistPage />

 
//     <div className={styles.container}>
//       <h2 className={styles.heading}> Adventures Waiting to Happen!</h2>
//       <ToastContainer position="top-right" autoClose={3000} />

//       {wishlist.length === 0 ? (
//         <p className={styles.emptyState}>No tours in your wishlist yet.</p>
//       ) : (
//         <div className={styles.cardGrid}>
//           {wishlist.map((tour) => (
// <TourCard
//   key={tour._id}
//   tour={tour}
//   onRemoveFromWishlist={async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         toast.warning("⚠️ Please login first");
//         return;
//       }

//       await axios.post(
//         "http://localhost:4000/wishlist/remove",
//         { tourId: id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setWishlist((prev) => prev.filter((t) => t._id !== id));
//       toast.success("✅ Removed from wishlist");
//     } catch (error: any) {
//       toast.error("❌ Failed to remove from wishlist");
//     }
//   }}
//  onBookNow={(id) => router.push(`/tourist/booking/${tour._id}/confirm`)}

//   mode="wishlist"
// />


//           ))}
//         </div>
//       )}
//     </div>
//      </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TourCard from "@/components/Operator/TourCard";
import styles from "./Wishlist.module.css"; 
import TouristNav from "@/components/Tourist/TouristNav"; 
import { useRouter } from "next/navigation";

interface Tour {
  _id: string;
  destination: string;
  packageType: string;
  duration: string;
  price: string;
  availability: string;
  mainImage: string;
  description: string;
  moreImages: string[];
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.warning("⚠️ Please login to view your wishlist");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:4000/wishlist/my", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data && res.data.length > 0) {
          // Filter out invalid tours
          const validTours = res.data
            .map((w: any) => w.tour)
            .filter((t: any) => t && t._id);
          
          setWishlist(validTours);
        } else {
          setWishlist([]);
        }
      } catch (error) {
        console.error(error);
        toast.error("❌ Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Add tour to wishlist (optional)
  const handleAddToWishlist = async (tourId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("⚠️ Please login to add to wishlist");
        return;
      }

      const res = await axios.post(
        "http://localhost:4000/wishlist/add",
        { tourId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201) {
        toast.success(res.data.message);
        // Optionally, refresh wishlist
        setWishlist((prev) => [...prev, { _id: tourId } as any]);
      }
    } catch (err: any) {
      const msg =
        err.response?.data?.message || "❌ Failed to add to wishlist";
      toast.error(msg);
      console.error(err);
    }
  };

  // Remove tour from wishlist
  const handleRemoveFromWishlist = async (tourId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("⚠️ Please login first");
        return;
      }

      await axios.post(
        "http://localhost:4000/wishlist/remove",
        { tourId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setWishlist((prev) => prev.filter((t) => t._id !== tourId));
      toast.success("✅ Removed from wishlist");
    } catch (error) {
      console.error(error);
      toast.error("❌ Failed to remove from wishlist");
    }
  };

  if (loading) return <p className={styles.heading}>Loading...</p>;

  return (
    <>
      <TouristNav isWishlistPage />

      <div className={styles.container}>
        <h2 className={styles.heading}>Adventures Waiting to Happen!</h2>
        <ToastContainer position="top-right" autoClose={3000} />

        {wishlist.length === 0 ? (
          <p className={styles.emptyState}>No tours in your wishlist yet.</p>
        ) : (
          <div className={styles.cardGrid}>
            {wishlist.map((tour) =>
              tour ? (
                <TourCard
                  key={tour._id}
                  tour={tour}
                  onRemoveFromWishlist={() => handleRemoveFromWishlist(tour._id)}
                  onBookNow={() => router.push(`/tourist/booking/${tour._id}/confirm`)}
                  onAddToWishlist={() => handleAddToWishlist(tour._id)}
                  mode="wishlist"
                />
              ) : null
            )}
          </div>
        )}
      </div>
    </>
  );
}
