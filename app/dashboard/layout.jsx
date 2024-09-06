import { UserButton } from "@clerk/nextjs";
import React from "react";

const DashboardLayout = ({ childern }) => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard Layout</h1>
      <UserButton />
      {childern}
    </div>
  );
};

export default DashboardLayout;
