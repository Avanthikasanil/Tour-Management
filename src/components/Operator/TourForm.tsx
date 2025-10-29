"use client";

import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./TourForm.module.css";

interface TourFormProps {
  onAddTour: (tourData: FormData) => Promise<boolean> | void;
  editData?: any | null;
}

// Validation schema
const TourSchema = Yup.object().shape({
  destination: Yup.string().required("Destination is required"),
  duration: Yup.string().required("Duration is required"),
  packageType: Yup.string().required("Package is required"),
  itinerary: Yup.string().required("Itinerary is required"),
  highlights: Yup.string().required("Highlights are required"),
  activities: Yup.string().required("Activities are required"),
  inclusions: Yup.string().required("Inclusions are required"),
  exclusions: Yup.string().required("Exclusions are required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  availability: Yup.string().required("Availability is required"),
  description: Yup.string().required("Description is required"),
});

export default function TourForm({ onAddTour, editData }: TourFormProps) {
  const [mainPreview, setMainPreview] = useState<string | null>(null);
  const [morePreviews, setMorePreviews] = useState<{ src: string; file?: File }[]>([]);

  const initialValues = {
    destination: editData?.destination || "",
    duration: editData?.duration || "",
    packageType: editData?.packageType || "",
    itinerary: editData?.itinerary || "",
    highlights: editData?.highlights || "",
    activities: editData?.activities || "",
    inclusions:
      typeof editData?.inclusions === "string"
        ? editData.inclusions
        : (editData?.inclusions || []).join(", "),
    exclusions:
      typeof editData?.exclusions === "string"
        ? editData.exclusions
        : (editData?.exclusions || []).join(", "),
    price: editData?.price || "",
    availability: editData?.availability || "Available",
    mainImage: null as File | null,
    moreImages: [] as File[],
    description: editData?.description || "",
  };

  useEffect(() => {
    if (editData) {
      setMainPreview(editData.mainImage ? `http://localhost:4000${editData.mainImage}` : null);
      const existingMore = editData.moreImages?.map((img: string) => ({
        src: `http://localhost:4000${img}`,
      })) || [];
      setMorePreviews(existingMore);
    }
  }, [editData]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TourSchema}
      enableReinitialize
      onSubmit={async (values, { resetForm }) => {
        const data = new FormData();
        data.append("destination", values.destination);
        data.append("duration", values.duration);
        data.append("packageType", values.packageType);
        data.append("itinerary", values.itinerary);
        data.append("highlights", values.highlights);
        data.append("activities", values.activities);
        data.append("inclusions", values.inclusions);
        data.append("exclusions", values.exclusions);
        data.append("price", values.price.toString());
        data.append("availability", values.availability);
        data.append("description", values.description);

        // Main image
        if (values.mainImage) {
          data.append("images", values.mainImage);
        } else if (editData?.mainImage) {
          data.append("existingMainImage", editData.mainImage);
        }

        // More images
        morePreviews.forEach((item) => {
          if (item.file) {
            data.append("images", item.file); // new file
          } else {
            // existing image
            data.append("existingMoreImages", item.src.replace("http://localhost:4000", ""));
          }
        });

        try {
          const result = await onAddTour(data);
          if (result !== false) {
            toast.success(editData ? "Package updated successfully!" : "Package added successfully!");
          }
          if (!editData) {
            resetForm();
            setMainPreview(null);
            setMorePreviews([]);
          }
        } catch {
          toast.error("Failed to save package. Try again!");
        }
      }}
    >
      {({ setFieldValue, values }) => (
        <Form className={styles.formContainer}>
          <h2>{editData ? "Edit Tour" : "Create New Tour"}</h2>

          <Field type="text" name="destination" placeholder="Destination" />
          <ErrorMessage name="destination" component="div" className={styles.error} />

          <Field type="text" name="duration" placeholder="Duration" />
          <ErrorMessage name="duration" component="div" className={styles.error} />

          <Field as="select" name="packageType">
            <option value="">Select Package</option>
            <option value="Honeymoon Package">Honeymoon Package</option>
            <option value="Family Package">Family Package</option>
            <option value="Hill-Station Package">Hill-Station Package</option>
            <option value="Luxury Tour Package">Luxury Tour Package</option>
            <option value="Solo Tour Package">Solo Tour Package</option>
          </Field>
          <ErrorMessage name="packageType" component="div" className={styles.error} />

          <Field as="textarea" name="itinerary" placeholder="Itinerary details" />
          <ErrorMessage name="itinerary" component="div" className={styles.error} />

          <Field as="textarea" name="highlights" placeholder="Highlights" />
          <ErrorMessage name="highlights" component="div" className={styles.error} />

          <Field as="textarea" name="activities" placeholder="Activities" />
          <ErrorMessage name="activities" component="div" className={styles.error} />

          <Field as="textarea" name="inclusions" placeholder="Inclusions" />
          <ErrorMessage name="inclusions" component="div" className={styles.error} />

          <Field as="textarea" name="exclusions" placeholder="Exclusions" />
          <ErrorMessage name="exclusions" component="div" className={styles.error} />

          <Field type="text" name="price" placeholder="Price" />
          <ErrorMessage name="price" component="div" className={styles.error} />

          <Field as="select" name="availability">
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </Field>
          <ErrorMessage name="availability" component="div" className={styles.error} />

          {/* Main Image */}
          <label>Main Image</label>
          {mainPreview && (
            <div style={{ marginBottom: 10 }}>
              <img src={mainPreview} alt="Main Preview" style={{ width: "100%", maxHeight: 250, objectFit: "cover" }} />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.currentTarget.files?.[0] || null;
              setFieldValue("mainImage", file);
              if (file) setMainPreview(URL.createObjectURL(file));
            }}
          />

          {/* More Images */}
          <label>Additional Images</label>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
            {morePreviews.map((item, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                <img src={item.src} alt={`Preview ${idx}`} style={{ width: 100, height: 100, objectFit: "cover" }} />
                <button
                  type="button"
                  onClick={() => setMorePreviews((prev) => prev.filter((_, i) => i !== idx))}
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    background: "red",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: 20,
                    height: 20,
                    cursor: "pointer",
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.currentTarget.files || []);
              const newPreviews = files.map((f) => ({ src: URL.createObjectURL(f), file: f }));
              setMorePreviews((prev) => [...prev, ...newPreviews]);
              setFieldValue("moreImages", [...values.moreImages, ...files]);
            }}
          />

          <Field as="textarea" name="description" placeholder="Description" />
          <ErrorMessage name="description" component="div" className={styles.error} />

          <button type="submit" className={styles.submitBtn}>
            {editData ? "Update Package" : "Save Package"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
