"use client";

import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./login.module.css";

// User interface
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  location?: string;
  profilePic?: string;
}

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const res = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok && data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success(" Login successful!");

        // Redirect based on role
        switch (data.user.role) {
          case "admin":
            router.push("/admin/dashboard");
            break;
          case "operator":
            router.push("/operator/dashboard");
            break;
          default:
            router.push("/tourist/dashboard");
        }
      } else {
        toast.error(`❌ ${data.message || "Login failed"}`);
      }
    } catch (error: any) {
      toast.error(`⚠️ Something went wrong: ${error.message || error}`);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className={styles.loginBox}>
        <h2>LOGIN</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Use your email as username"
                className={errors.email && touched.email ? styles.errorInput : ""}
              />
              <ErrorMessage name="email" component="div" className={styles.errorMsg} />

              <label htmlFor="password">Password</label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className={errors.password && touched.password ? styles.errorInput : ""}
              />
              <ErrorMessage name="password" component="div" className={styles.errorMsg} />

              <button type="submit">Login</button>
            </Form>
          )}
        </Formik>

        <p className={styles.signupText}>
          Don’t have an account? <a href="/register">Sign up</a>
        </p>
      </div>

      <div className={styles.head}>
        <h1>The world is wide and life is short</h1>
        <p>Every journey brings joy and lasting memories</p>
      </div>
    </div>
  );
}
