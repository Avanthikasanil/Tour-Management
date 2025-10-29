// "use client";

// import { useParams, useRouter } from "next/navigation";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import styles from "./details.module.css";
// import StepProgress from "@/components/Booking/StepProgress";

// // Validation schema using Yup
// const BookingSchema = Yup.object().shape({
//   adults: Yup.number()
//     .min(1, "At least 1 adult is required")
//     .required("Number of adults is required"),
//   children: Yup.number()
//     .min(0, "Cannot be negative")
//     .required("Number of children is required"),
//   date: Yup.string()
//     .required("Please select a starting date"),
//   requirements: Yup.string()
//     .max(200, "Maximum 200 characters allowed"),
// });

// export default function BookingDetails() {
//   const { id } = useParams();
//   const router = useRouter();

//   return (
//     <div className={styles.page}>
//       <div className={styles.contentWrapper}>
//         <StepProgress currentStep={2} bookingId={id as string} />
//         <div className={styles.card}>
//           <h2 className={styles.title}>Traveller Details</h2>
//           <p className={styles.subtitle}>
//             Fill in your journey preferences below
//           </p>

//           {/* ✅ Formik Integration */}
//           <Formik
//             initialValues={{
//               adults: 1,
//               children: 0,
//               date: "",
//               requirements: "",
//             }}
//             validationSchema={BookingSchema}
//             onSubmit={(values) => {
//               router.push(
//                 `/tourist/booking/${id}/payment?adults=${values.adults}&children=${values.children}&date=${values.date}&req=${encodeURIComponent(
//                   values.requirements
//                 )}`
//               );
//             }}
//           >
//             {({ isSubmitting }) => (
//               <Form>
//                 {/* Adults */}
//                 <div className={styles.formGroup}>
//                   <label>Number of Adults</label>
//                   <Field type="number" name="adults" min="1" />
//                   <ErrorMessage
//                     name="adults"
//                     component="div"
//                     className={styles.error}
//                   />
//                 </div>

//                 {/* Children */}
//                 <div className={styles.formGroup}>
//                   <label>Number of Children</label>
//                   <Field type="number" name="children" min="0" />
//                   <ErrorMessage
//                     name="children"
//                     component="div"
//                     className={styles.error}
//                   />
//                 </div>

//                 {/* Date */}
//                 <div className={styles.formGroup}>
//                   <label>Tour Starting Date</label>
//                   <Field type="date" name="date" />
//                   <ErrorMessage
//                     name="date"
//                     component="div"
//                     className={styles.error}
//                   />
//                 </div>

//                 {/* Requirements */}
//                 <div className={styles.formGroup}>
//                   <label>Additional Requirements</label>
//                   <Field as="textarea" name="requirements" />
//                   <ErrorMessage
//                     name="requirements"
//                     component="div"
//                     className={styles.error}
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className={styles.proceedBtn}
//                   disabled={isSubmitting}
//                 >
//                   Proceed to Payment
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useParams, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./details.module.css";
import StepProgress from "@/components/Booking/StepProgress";

// Validation schema
const BookingSchema = Yup.object().shape({
  adults: Yup.number()
    .min(1, "At least 1 adult is required")
    .required("Number of adults is required"),
  children: Yup.number()
    .min(0, "Cannot be negative")
    .required("Number of children is required"),
  date: Yup.string().required("Please select a starting date"),
  requirements: Yup.string().max(200, "Maximum 200 characters allowed"),
});

export default function BookingDetails() {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.contentWrapper}>
        <StepProgress currentStep={2} bookingId={id as string} />
        <div className={styles.card}>
          <h2 className={styles.title}>Traveller Details</h2>
          <p className={styles.subtitle}>
            Fill in your journey preferences below
          </p>

          <Formik
            initialValues={{
              adults: 1,
              children: 0,
              date: "",
              requirements: "",
            }}
            validationSchema={BookingSchema}
            onSubmit={(values) => {
              const totalPeople =
                Number(values.adults) + Number(values.children);

              // ✅ Store in localStorage as ISO string
              localStorage.setItem(
                "bookingDate",
                new Date(values.date).toISOString()
              );
              localStorage.setItem("bookingPeople", totalPeople.toString());

              router.push(`/tourist/booking/${id}/payment`);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className={styles.formGroup}>
                  <label>Number of Adults</label>
                  <Field type="number" name="adults" min="1" />
                  <ErrorMessage
                    name="adults"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Number of Children</label>
                  <Field type="number" name="children" min="0" />
                  <ErrorMessage
                    name="children"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Tour Starting Date</label>
                  <Field type="date" name="date" />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Additional Requirements</label>
                  <Field as="textarea" name="requirements" />
                  <ErrorMessage
                    name="requirements"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <button
                  type="submit"
                  className={styles.proceedBtn}
                  disabled={isSubmitting}
                >
                  Proceed to Payment
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
