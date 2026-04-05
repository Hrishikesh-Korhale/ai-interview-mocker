"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { apiClient } from "../../../utils/api";

const Header = () => {
  const path = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    apiClient.logout();
    router.push("/sign-in");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className="p-4 bg-secondary shadow-sm"
    >
      <Image src={"/logo.svg"} height={100} width={160} alt="logo" />
      <div>
        <ul className={"hidden md:flex gap-6"}>
          <li
            onClick={() => router.push("/dashboard")}
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard" ? "text-primary font-bold" : ""
            }`}
          >
            Dashboard
          </li>
          <li
            onClick={() => router.push("/questions")}
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/questions" ? "text-primary font-bold" : ""
            }`}
          >
            Questions
          </li>
          <li
            onClick={() => router.push("/upgrade")}
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/upgrade" ? "text-primary font-bold" : ""
            }`}
          >
            Upgrade
          </li>
          <li
            onClick={() => router.push("/how-it-works")}
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/how-it-works" ? "text-primary font-bold" : ""
            }`}
          >
            How it works?
          </li>
        </ul>
      </div>
      <div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
