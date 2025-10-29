"use client";

import styles from "./page.module.css";
import MainNavbar from "../components/MainNavebar/MainNav";
import MainFooter from "../components/MainFooter/MainFot";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";

export default function HomePage() {
  // BENEFITS DATA
  const benefits = [
    { title: "Campfire Activity", image: "/campfire.jpeg" },
    { title: "Activities", image: "/water.jpeg" },
    { title: "Food", image: "/food.jpeg" },
    { title: "Customized Tour Packages", image: "/cusomize.jpeg" },
    { title: "Swimming Pool", image: "/pool.jpeg" },
    { title: "A/C Rooms", image: "/rooms.jpeg" },
  ];

  // SLIDER
  const itemsPerPage = 3;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    setCurrentIndex((prev: number) =>
      prev === 0 ? benefits.length - itemsPerPage : prev - itemsPerPage
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev: number) =>
      prev + itemsPerPage >= benefits.length ? 0 : prev + itemsPerPage
    );
  };

  // SERVICES DATA
  const services = [
    {
      title: "Honeymoon Packages",
      description: "Romantic getaways with curated destinations for couples.",
      image: "/honeymoon.jpeg",
    },
    {
      title: "Wildlife Packages",
      description: "Thrilling adventures to explore nature and wildlife.",
      image: "/wild.jpeg",
    },
    {
      title: "Family Packages",
      description: "Fun-filled family trips designed for all age groups.",
      image: "/family.jpeg",
    },
    {
      title: "Bachelor Trips",
      description: "Exciting bachelor trips full of adventure and memories.",
      image: "/bachelor.jpeg",
    },
  ];

  // ✅ Yup Validation Schema
  const ContactSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too short!").required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{7,15}$/, "Invalid phone number")
      .required("Phone number is required"),
    message: Yup.string()
      .min(5, "Message is too short")
      .required("Message is required"),
  });

  // ✅ Form submission handler (sends data to backend)
  const handleSubmit = async (values: any, { resetForm }: any) => {
    try {
      const res = await fetch("http://localhost:4000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Thank you! Our operator will call you shortly.");
        resetForm();
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={styles.homeContainer}>
      <Toaster position="top-center" reverseOrder={false} />
      <MainNavbar />

      {/* HERO SECTION */}
      <div className={styles.hero}>
        <h1>EXPLORE THE WORLD WITH EXPLORELY</h1>
        <p>Discover amazing places with us</p>
      </div>

      {/* SERVICES SECTION */}
      <section className={styles.servicesSection} id="services">
        <div className={styles.container}>
          <h2 className={styles.heading}>OUR SERVICES</h2>
          <p className={styles.subHeading}>
            Explore a wide range of curated travel experiences
          </p>

          <div className={styles.grid}>
            {services.map((service, index) => (
              <div key={index} className={styles.dome}>
                <img
                  src={service.image}
                  alt={service.title}
                  className={styles.domeImage}
                />
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.description}>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section className={styles.aboutSection} id="about">
        <div className={styles.aboutContainer}>
          <div className={styles.aboutImageLarge}>
            <img src="/boat.jpeg" alt="About Explorely" />
          </div>
        </div>

        <div className={styles.aboutContent}>
          <h2>ABOUT US</h2>
          <p>
            At <strong>Explorely</strong>, we believe travel is more than just
            visiting places—it’s about creating stories, embracing cultures, and
            finding new perspectives. Our mission is to make your journey
            effortless and unforgettable.
          </p>

          <p>
            Whether you’re chasing adventure, seeking relaxation, or discovering
            hidden gems, Explorely is your trusted companion to explore the
            world with ease and joy.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className={styles.benefitsSection} id="benefits">
        <h2>WHY CHOOSE US?</h2>

        <div className={styles.benefitsSlider}>
          <button className={styles.prev} onClick={prevSlide}>
            &#10094;
          </button>

          <div className={styles.benefitsWrapper}>
            {benefits
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((benefit, index) => (
                <div key={index} className={styles.benefitBox}>
                  <img src={benefit.image} alt={benefit.title} />
                  <div className={styles.overlay}>
                    <h3>{benefit.title}</h3>
                  </div>
                </div>
              ))}
          </div>

          <button className={styles.next} onClick={nextSlide}>
            &#10095;
          </button>
        </div>
      </section>

      {/* ✅ CONTACT SECTION (Formik added) */}
      <section className={styles.contactSection} id="contact">
        <div className={styles.contactWrapper}>
          {/* Left Side Info */}
          <div className={styles.contactInfo}>
            <h2 className={styles.contactHeading}>Connect with Us</h2>
            <p className={styles.subText}>
              Feel free to reach out to us for any inquiries or to start crafting
              your dream getaway. We are here to assist you.
            </p>

            <div className={styles.infoItem}>
              <img src="/call.png" alt="Phone" className={styles.iconImg} />
              <span>+91 98765 43210</span>
            </div>

            <div className={styles.infoItem}>
              <img src="/email (2).png" alt="Email" className={styles.iconImg} />
              <span>support@explorely.com</span>
            </div>

            <div className={styles.infoItem}>
              <img
                src="/location (2).png"
                alt="Location"
                className={styles.iconImg}
              />
              <span>Calicut, Kerala, India</span>
            </div>
          </div>

          {/* Right Side Form */}
          <div className={styles.contactContainer}>
            <Formik
              initialValues={{
                name: "",
                email: "",
                countryCode: "+91",
                phone: "",
                message: "",
              }}
              validationSchema={ContactSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className={styles.contactForm}>
                  <div className={styles.formGroup}>
                    <Field type="text" name="name" placeholder="Your Name" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={styles.error}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <Field type="email" name="email" placeholder="Your Email" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={styles.error}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <div className={styles.phoneInput}>
                      <Field as="select" name="countryCode">
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+971">🇦🇪 +971</option>
                      </Field>
                      <Field
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                      />
                    </div>
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className={styles.error}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <Field
                      as="textarea"
                      name="message"
                      placeholder="Your Message"
                      rows={4}
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className={styles.error}
                    />
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
