"use client";

import { useSearchParams, useRouter } from "next/navigation";
import styles from "./PaymentSuccess.module.css";

export default function PaymentSuccessComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tourName = searchParams.get("tourName");
  const date = searchParams.get("date");
  const people = searchParams.get("people");
  const price = searchParams.get("price");

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>🎉 Payment Successful!</h1>
        <p className={styles.text}>Your booking has been confirmed.</p>

        <div className={styles.info}>
          <p><strong>Tour:</strong> {tourName}</p>
          <p>
  <strong>Date:</strong>{" "}
  {date
    ? new Date(date).toLocaleDateString("en-GB") // or "en-IN"
    : "-"}
</p>

          <p><strong>Number of people:</strong> {people}</p>
          <p><strong>Total Price:</strong> ₹{price}</p>
        </div>

        <button className={styles.button} onClick={() => router.push("/tourist/dashboard")}>
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}
