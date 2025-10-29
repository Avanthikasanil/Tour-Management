
// 'use client';

// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { useState, FormEvent } from "react";

// // Define the type for your props
// interface PaymentFormProps {
//   clientSecret: string;
//   tour: {
//     _id: string;
//     name?: string;
//     price?: number;
//   };
// }

// export default function PaymentForm({ clientSecret, tour }: PaymentFormProps) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);
//     setMessage("");

//     const cardElement = elements.getElement(CardElement);

//     // 1️⃣ Confirm payment with Stripe
//     const { paymentIntent, error } = await stripe!.confirmCardPayment(clientSecret, {
//       payment_method: { card: cardElement! },
//     });

//     if (error) {
//       setMessage(error.message || "Payment failed.");
//       setLoading(false);
//       return;
//     }

//     // 2️⃣ If Stripe payment successful → create booking in backend
//     if (paymentIntent && paymentIntent.status === "succeeded") {
//       const token = localStorage.getItem("token");

//       try {
//         const res = await fetch("http://localhost:4000/bookings", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             tourId: tour._id,
//             paymentMethod: "card",
//             paymentStatus: "paid",
//           }),
//         });

//         if (res.ok) {
//           setMessage("✅ Payment successful! Booking created.");
//         } else {
//           const data = await res.json();
//           setMessage("⚠️ Booking creation failed: " + data.error);
//         }
//       } catch (err) {
//         setMessage("Server error while creating booking.");
//       }
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <CardElement className="border p-3 rounded-md" />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
//       >
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//       {message && <p className="text-center text-sm mt-2">{message}</p>}
//     </form>
//   );
// }
'use client';

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState, FormEvent } from "react";

interface PaymentFormProps {
  clientSecret: string;
  tour: { _id: string; name?: string; price?: number };
}

export default function PaymentForm({ clientSecret, tour }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setMessage("");

    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe!.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement! },
    });

    if (error) {
      setMessage(error.message || "Payment failed.");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      const token = localStorage.getItem("token");
      const tourDate = localStorage.getItem("tourDate");
      const tourPeople = Number(localStorage.getItem("tourPeople")) || 1;

      try {
        const res = await fetch("http://localhost:4000/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            tourId: tour._id,
            date: tourDate,
            people: tourPeople,
            paymentMethod: "card",
            paymentStatus: "Paid",
          }),
        });

        const data = await res.json();
        if (res.ok) setMessage("✅ Payment successful! Booking created.");
        else setMessage("⚠️ Booking failed: " + data.error);

      } catch (err) {
        setMessage("Server error while creating booking.");
      }
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-3 rounded-md" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {message && <p className="text-center text-sm mt-2">{message}</p>}
    </form>
  );
}
