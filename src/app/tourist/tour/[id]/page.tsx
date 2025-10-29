"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./TourDetailsPage.module.css";
import TouristNav from "@/components/Tourist/TouristNav";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReviewForm from "@/components/Tourist/ReviewForm";
import ReviewList from "@/components/Tourist/ReviewList";

interface Tour {
  _id: string;
  destination: string;
  duration: string;
  packageType: string;
  itinerary: string;
  highlights: string;
  activities: string;
  inclusions: string[];
  exclusions: string[];
  description: string;
  price: string;
  availability: string;
  mainImage: string;
  moreImages: string[];
}

export default function TourDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tour, setTour] = useState<Tour | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Helper to remove empty lines for lists
  const getListItems = (text?: string) =>
    text?.split(/\r?\n/).filter(line => line.trim() !== "") || [];

  const fetchTour = async () => {
    try {
      const res = await fetch(`http://localhost:4000/tours/public/${id}`);
      if (!res.ok) throw new Error("Failed to fetch tour details");
      const data = await res.json();
      setTour(data);
    } catch (err) {
      console.error("Error fetching tour:", err);
      toast.error("❌ Failed to load tour details");
    }
  };

  useEffect(() => {
    if (id) fetchTour();
  }, [id]);

  // Wishlist
  const handleAddToWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("⚠️ Please login to add to wishlist");
        return;
      }

      const res = await axios.post(
        "http://localhost:4000/wishlist/add",
        { tourId: tour?._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "✅ Tour added to wishlist");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const msg =
          error.response?.data?.message ||
          (typeof error.response?.data === "string"
            ? error.response?.data
            : "❌ Failed to add to wishlist");
        toast.error(msg);
      } else {
        toast.error("Unexpected error occurred ❌");
      }
    }
  };

  if (!tour)
    return <p style={{ textAlign: "center", marginTop: "20px" }}>Loading...</p>;

  const allImages = [tour.mainImage, ...(tour.moreImages || [])];
  const currentImage = allImages[currentIndex] || "";

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <>
      <TouristNav isTourDetailsPage />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className={styles.tourContainer}>
        {/* Image Slider */}
        <div className={styles.imageSlider}>
          <img
            src={`http://localhost:4000${currentImage}`}
            alt={`Tour Image ${currentIndex + 1}`}
            className={styles.sliderMainImage}
          />
          {allImages.length > 1 && (
            <>
              <button className={styles.prevBtn} onClick={prevImage}>&lt;</button>
              <button className={styles.nextBtn} onClick={nextImage}>&gt;</button>
            </>
          )}
        </div>

        {/* Description */}
        <h2 className={styles.tourHeading}>{tour.destination}</h2>
        <p>{tour.description}</p>

        {/* Tour Details */}
        <div className={styles.tourInfo}>
          <div className={styles.detailSection}>
            <h3 className={styles.mainHeading}>Duration</h3>
            <p className={styles.subItem}>{tour.duration}</p>
          </div>

          <div className={styles.detailSection}>
            <h3 className={styles.mainHeading}>Package Type</h3>
            <p className={styles.subItem}>{tour.packageType}</p>
          </div>

          <div className={styles.detailSection}>
            <h3 className={styles.mainHeading}>Highlights</h3>
            <ul className={styles.list}>
              {getListItems(tour.highlights).map((item, idx) => (
                <li key={idx} className={styles.subItem}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.detailSection}>
            <h3 className={styles.mainHeading}>Activities</h3>
            <ul className={styles.list}>
              {getListItems(tour.activities).map((item, idx) => (
                <li key={idx} className={styles.subItem}>{item}</li>
              ))}
            </ul>
          </div>

          {tour.inclusions?.length > 0 && (
            <div className={styles.detailSection}>
              <h3 className={styles.mainHeading}>Inclusions</h3>
              <ul className={styles.list}>
                {tour.inclusions.map((item, idx) => (
                  <li key={idx} className={styles.subItem}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {tour.exclusions?.length > 0 && (
            <div className={styles.detailSection}>
              <h3 className={styles.mainHeading}>Exclusions</h3>
              <ul className={styles.list}>
                {tour.exclusions.map((item, idx) => (
                  <li key={idx} className={styles.subItem}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {tour.itinerary && (
            <div className={styles.detailSection}>
              <h3 className={styles.mainHeading}>Itinerary</h3>
              <ul className={styles.list}>
                {getListItems(tour.itinerary).map((item, idx) => (
                  <li key={idx} className={styles.subItem}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.detailSection}>
  <h3 className={styles.mainHeading}>Price</h3>
  <p className={tour.availability === "Available" ? styles.available : styles.notAvailable}>
    ₹{tour.price}
  </p>
</div>

<div className={styles.detailSection}>
  <h3 className={styles.mainHeading}>Availability</h3>
  <p className={tour.availability === "Available" ? styles.available : styles.notAvailable}>
    {tour.availability}
  </p>
</div>

        </div>

        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <button
            className={styles.closeBtn}
            onClick={() => router.push("/tourist/dashboard#package")}
          >
            Go Back
          </button>
          <button className={styles.wishlistBtn} onClick={handleAddToWishlist}>
            Add to Wishlist
          </button>
          <button
            className={styles.bookBtn}
            onClick={() => router.push(`/tourist/booking/${tour._id}/confirm`)}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Reviews */}
      <div style={{ marginTop: "40px" }}>
        <ReviewForm tourId={tour._id} />
        <ReviewList tourId={tour._id} />
      </div>
    </>
  );
}
