"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./OperatorDashboard.module.css";
import TourForm from "./TourForm";
import TourCard from "./TourCard";

interface Tour {
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

export default function OperatorDashboard() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editTourId, setEditTourId] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  // 🔹 Fetch tours from backend
  const fetchTours = async () => {
    try {
      const res = await fetch("http://localhost:4000/tours", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch tours");
      const data = await res.json();
      setTours(data);
    } catch (err) {
      toast.error("Error fetching tours. Try again!");
      console.error("Error fetching tours:", err);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

// 🔹 Save or update a tour
const handleSaveTour = async (tourData: FormData, tourId?: string) => {
  const url = tourId
    ? `http://localhost:4000/tours/${tourId}`
    : "http://localhost:4000/tours/addTour";
  const method = tourId ? "PUT" : "POST";

  try {
    let options: RequestInit;

    if (tourId) {
  // 🟢 Convert FormData to plain object (JSON-safe)
  const jsonData: Record<string, any> = {};
  tourData.forEach((value, key) => {
    if (key === "existingMoreImages") {
      try {
        // If it's already a stringified JSON array, skip re-stringifying
        const parsed = JSON.parse(value as string);
        jsonData[key] = JSON.stringify(parsed);
      } catch {
        // Otherwise, convert comma-separated string → proper JSON string
        const arr =
          typeof value === "string"
            ? value.split(",").map((v) => v.trim())
            : value;
        jsonData[key] = JSON.stringify(arr);
      }
    } else if (key !== "mainImage" && key !== "moreImages") {
      jsonData[key] = value;
    }
  });

  options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonData),
  };
}
 else {
      // 🟢 Add new package (with images)
      options = {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: tourData,
      };
    }

    const res = await fetch(url, options);

    if (!res.ok) {
      const errorText = await res.text();
      toast.error("Failed to save package!");
      console.error("Save tour failed:", res.status, errorText);
      return false;
    }

    const savedTour = await res.json();

    if (tourId) {
      setTours((prev) =>
        prev.map((t) => (t._id === tourId ? savedTour : t))
      );
      toast.success("Package updated successfully!");
    } else {
      setTours((prev) => [savedTour, ...prev]);
      toast.success("Package added successfully!");
    }

    setShowForm(false);
    setEditTourId(null);
    return true;
  } catch (err) {
    toast.error("Error saving tour!");
    console.error("Error saving tour:", err);
    return false;
  }
};


  // 🔹 Delete a tour
  const handleDeleteTour = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:4000/tours/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        toast.error("Failed to delete package!");
        console.error("Delete failed");
        return;
      }

      setTours((prev) => prev.filter((t) => t._id !== id));
      toast.success("Package deleted successfully!");
    } catch (err) {
      toast.error("Error deleting tour!");
      console.error("Error deleting tour:", err);
    }
  };

  // 🔹 Edit
  const handleEditTour = (tour: Tour) => {
    setEditTourId(tour._id || null);
    setShowForm(true);
  };

  const tourToEdit = editTourId ? tours.find((t) => t._id === editTourId) : null;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button
          className={styles.addButton}
          onClick={() => {
            setShowForm(!showForm);
            setEditTourId(null);
          }}
        >
          {showForm ? "Close Form" : "Add Package"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <TourForm
          onAddTour={(data: FormData) => handleSaveTour(data, editTourId || undefined)}
          editData={tourToEdit || null} // ✅ Pass full tour data for pre-filling
        />
      )}

      {/* Tour Cards */}
      <div className={styles.cardGrid}>
        {tours.length > 0 ? (
          tours.map((tour) => (
           <TourCard
  key={tour._id}
  tour={tour}
  onEdit={() => handleEditTour(tour)}
  onDelete={() => handleDeleteTour(tour._id!)}
  mode="operator"   // ✅ shows Edit + Delete buttons for operator
/>

          ))
        ) : (
          <div className={styles.noTours}>
            <p>No packages added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
