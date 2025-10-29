"use client";
import OperatorDashboard from "@/components/Operator/OperatorDashboard";
import OperatorFooter from "@/components/Operator/OperatorFot";
import OperatorNav from "@/components/Operator/OperatorNav";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OperatorDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token || user.role !== "operator") {
      router.replace("/login");
    } else {
      setLoading(false); // ✅ allow page to render
    }
  }, [router]);

  if (loading) return null;

  return (
    <div>
      <OperatorNav />
      <OperatorDashboard />
      <OperatorFooter />
    </div>
  );
}
