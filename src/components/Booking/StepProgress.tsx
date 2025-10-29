"use client";
import { useRouter } from "next/navigation";
import styles from "./StepProgress.module.css";

interface StepProgressProps {
  currentStep: number;
  bookingId: string; // 👈 so we can pass the id in route
}

const steps = [
  { id: 1, label: "Passenger Details", path: "/tourist/booking/[id]/passenger" },
  { id: 2, label: "Traveller details", path: "/tourist/booking/[id]/details" },
  { id: 3, label: "Payment", path: "/tourist/booking/[id]/payment" },
];

export default function StepProgress({ currentStep, bookingId }: StepProgressProps) {
  const router = useRouter();

  const handleClick = (stepPath: string, stepId: number) => {
    // Only allow going back to completed or current steps
    if (stepId <= currentStep) {
      const url = stepPath.replace("[id]", bookingId);
      router.push(url);
    }
  };

  return (
    <div className={styles.progressContainer}>
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={styles.stepWrapper}
          onClick={() => handleClick(step.path, step.id)}
          style={{ cursor: step.id <= currentStep ? "pointer" : "not-allowed" }}
        >
          <div
            className={`${styles.circle} ${
              currentStep === step.id
                ? styles.active
                : currentStep > step.id
                ? styles.completed
                : ""
            }`}
          >
            {currentStep > step.id ? "✔" : step.id}
          </div>
          <span
            className={`${styles.label} ${
              currentStep === step.id ? styles.activeLabel : ""
            }`}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`${styles.line} ${
                currentStep > step.id ? styles.completedLine : ""
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
