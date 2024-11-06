"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const RedirectToDashboard = () => {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    router.push("/dashboard");
  }, [user, router]);

  return null;
};

export default RedirectToDashboard;
