import { UserButton } from "@clerk/nextjs";
import React from "react";
import Header from "./_components/Header";

const DashboardLayout = ({ childern }) => {
  return (
    <div>
     <Header />
      {childern}
    </div>
  );
};

export default DashboardLayout;
