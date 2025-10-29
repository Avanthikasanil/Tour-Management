"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./register.module.css";

// Validation schema using Yup
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
  location: Yup.string().required("Location is required"),
  role: Yup.string().oneOf(["tourist", "operator"], "Invalid role").required("Role is required"),
});

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (values: any) => {
    try {
      const res = await fetch("http://localhost:4000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(" Registration successful!");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        toast.error(`❌ ${data.message || "Registration failed"}`);
      }
    } catch (error: any) {
      toast.error(`⚠️ Something went wrong: ${error.message || error}`);
    }
  };

  return (
    <div className={styles.registerPage}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.solo}>
        <h1>
          Adventure <br />
          Awaits <br />
          Solo
        </h1>
      </div>

      <div className={styles.formContainer}>
        <h2>Register</h2>

        <Formik
          initialValues={{ name: "", email: "", password: "", phone: "", location: "", role: "tourist" }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({ errors, touched }) => (
            <Form>
              <label htmlFor="name">Name</label>
              <Field name="name" placeholder="Your Name" className={errors.name && touched.name ? styles.errorInput : ""} />
              <ErrorMessage name="name" component="div" className={styles.errorMsg} />

              <label htmlFor="email">Email</label>
              <Field name="email" type="email" placeholder="Your Email" className={errors.email && touched.email ? styles.errorInput : ""} />
              <ErrorMessage name="email" component="div" className={styles.errorMsg} />

              <label htmlFor="password">Password</label>
              <Field name="password" type="password" placeholder="Password" className={errors.password && touched.password ? styles.errorInput : ""} />
              <ErrorMessage name="password" component="div" className={styles.errorMsg} />

              <label htmlFor="phone">Phone Number</label>
              <Field name="phone" type="tel" placeholder="Your Phone Number" className={errors.phone && touched.phone ? styles.errorInput : ""} />
              <ErrorMessage name="phone" component="div" className={styles.errorMsg} />

              <label htmlFor="location">Current Location</label>
              <Field name="location" type="text" placeholder="Your Current Location" className={errors.location && touched.location ? styles.errorInput : ""} />
              <ErrorMessage name="location" component="div" className={styles.errorMsg} />

              <label htmlFor="role">Role</label>
              <Field as="select" name="role" className={errors.role && touched.role ? styles.errorInput : ""}>
                <option value="operator">Operator</option>
                <option value="tourist">Tourist</option>
              </Field>
              <ErrorMessage name="role" component="div" className={styles.errorMsg} />

              <button type="submit">Register</button>
            </Form>
          )}
        </Formik>

        <p className={styles.bottomText}>
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
