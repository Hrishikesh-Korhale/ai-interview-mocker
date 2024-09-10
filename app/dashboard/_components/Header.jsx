"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const path = usePathname();
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
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/dashboard" ? "text-primary font-bold" : ""
            }`}
          >
            Dashboard
          </li>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/Questions" ? "text-primary font-bold" : ""
            }`}
          >
            Questions
          </li>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/Upgrade" ? "text-primary font-bold" : ""
            }`}
          >
            Upgrade
          </li>
          <li
            className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
              path === "/How it works" ? "text-primary font-bold" : ""
            }`}
          >
            How it works?
          </li>
        </ul>
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
