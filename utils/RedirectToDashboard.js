"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RedirectToDashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  }, [router]);

  return null;
};

export default RedirectToDashboard;
