
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   PaymentElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
// import axios from "axios";
// import StepProgress from "@/components/Booking/StepProgress";
// import styles from "./payment.module.css";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
// );

// interface CheckoutFormProps {
//   clientSecret: string;
//   tourId: string;
//   date: string;
//   people: number;
// }

// function CheckoutForm({ clientSecret, tourId, date, people }: CheckoutFormProps) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     // ✅ Frontend validation
//     if (!date || !people || people <= 0) {
//       toast.error("⚠️ Please select a valid date and number of people");
//       return;
//     }

//     setLoading(true);

//     try {
//       const { error, paymentIntent } = await stripe.confirmPayment({
//         elements,
//         confirmParams: {
//           return_url: `${window.location.origin}/tourist/bookings`,
//         },
//         redirect: "if_required",
//       });

//       if (error) {
//         toast.error(error.message || "❌ Payment failed");
//         setLoading(false);
//         return;
//       }

//       if (paymentIntent?.status === "succeeded") {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           toast.error("You must be logged in to book a tour");
//           setLoading(false);
//           return;
//         }

//         await axios.post(
//           "http://localhost:4000/bookings",
//           {
//             tourId,
//             paymentMethod: "card",
//             paymentStatus: "Paid", // ✅ Must match backend enum
//             date, // ✅ ISO string
//             people,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         toast.success("✅ Payment Successful & Booking Confirmed!");
//         router.push("/tourist/bookings");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("⚠️ Booking could not be saved, contact support");
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className={styles.cardForm}>
//       <PaymentElement />
//       <button disabled={!stripe || loading} type="submit" className={styles.proceed}>
//         {loading ? "Processing..." : "Pay Now"}
//       </button>
//     </form>
//   );
// }

// export default function PaymentPage() {
//   const { id } = useParams();
//   const [clientSecret, setClientSecret] = useState<string | null>(null);
//   const [bookingDate, setBookingDate] = useState<string>("");
//   const [bookingPeople, setBookingPeople] = useState<number>(1);

//   // Load from localStorage
//   useEffect(() => {
//     const storedDate = localStorage.getItem("bookingDate");
//     const storedPeople = localStorage.getItem("bookingPeople");

//     if (storedDate) setBookingDate(storedDate);
//     if (storedPeople) setBookingPeople(Number(storedPeople));
//   }, []);

//   // Fetch Stripe payment intent
//   useEffect(() => {
//     const fetchPaymentIntent = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           toast.error("You must be logged in to make a payment");
//           return;
//         }

//         const res = await axios.post(
//           "/api/create-payment-intent",
//           {
//             amount: 100, // Replace with actual tour price
//             tourId: id,
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         setClientSecret(res.data.clientSecret);
//       } catch (err) {
//         console.error(err);
//         toast.error("❌ Could not initialize payment");
//       }
//     };

//     fetchPaymentIntent();
//   }, [id]);

//   return (
//     <div className={styles.container}>
//       <StepProgress currentStep={3} bookingId={id as string} />
//       <div className={styles.card}>
//         <ToastContainer position="top-center" autoClose={2000} />
//         <h2 className={styles.title}>Complete Your Payment</h2>

//         {clientSecret ? (
//           <Elements stripe={stripePromise} options={{ clientSecret }}>
//             <CheckoutForm
//               clientSecret={clientSecret}
//               tourId={id as string}
//               date={bookingDate}
//               people={bookingPeople}
//             />
//           </Elements>
//         ) : (
//           <p>Loading payment form...</p>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe, PaymentIntent } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import StepProgress from "@/components/Booking/StepProgress";
import styles from "./payment.module.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface CheckoutFormProps {
  clientSecret: string;
  tourId: string;
  date: string;
  people: number;
}

function CheckoutForm({ clientSecret, tourId, date, people }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    if (!date || !people || people <= 0) {
      toast.error("⚠️ Please select a valid date and number of people");
      return;
    }

    setLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Not needed for manual redirect
          return_url: window.location.href,
        },
        redirect: "if_required",
      });

      // Extract error and paymentIntent safely
      const paymentIntent = (result.paymentIntent as PaymentIntent) || null;
      const error = result.error || null;

      if (error) {
        toast.error(error.message || "❌ Payment failed");
        setLoading(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in to book a tour");
          setLoading(false);
          return;
        }

        const tourPrice = Number(localStorage.getItem("tourPrice")) || 100;

        await axios.post(
          "http://localhost:4000/bookings",
          {
            tourId,
            paymentMethod: "card",
            paymentStatus: "Paid",
            date,
            people,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success("✅ Payment Successful & Booking Confirmed!");

        // Redirect to Payment Success page
       router.push(
  `/tourist/booking/payment?tourName=${encodeURIComponent(
    localStorage.getItem("tourName") || "Tour"
  )}&date=${date}&people=${people}&price=${tourPrice}`
);


      }
    } catch (err) {
      console.error(err);
      toast.error("⚠️ Booking could not be saved, contact support");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.cardForm}>
      <PaymentElement />
      <button disabled={!stripe || loading} type="submit" className={styles.proceed}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default function PaymentPage() {
  const { id } = useParams();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingPeople, setBookingPeople] = useState<number>(1);

  // Load date & people from localStorage
  useEffect(() => {
    const storedDate = localStorage.getItem("bookingDate");
    const storedPeople = localStorage.getItem("bookingPeople");

    if (storedDate) setBookingDate(storedDate);
    if (storedPeople) setBookingPeople(Number(storedPeople));
  }, []);

  // Fetch Stripe payment intent
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("You must be logged in to make a payment");
          return;
        }

        const res = await axios.post(
          "/api/create-payment-intent",
          {
            amount: 100, // Replace with actual tour price
            tourId: id,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error(err);
        toast.error("❌ Could not initialize payment");
      }
    };

    fetchPaymentIntent();
  }, [id]);

  return (
    <div className={styles.container}>
      <StepProgress currentStep={3} bookingId={id as string} />
      <div className={styles.card}>
        <ToastContainer position="top-center" autoClose={2000} />
        <h2 className={styles.title}>Complete Your Payment</h2>

        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm
              clientSecret={clientSecret}
              tourId={id as string}
              date={bookingDate}
              people={bookingPeople}
            />
          </Elements>
        ) : (
          <p>Loading payment form...</p>
        )}
      </div>
    </div>
  );
}
