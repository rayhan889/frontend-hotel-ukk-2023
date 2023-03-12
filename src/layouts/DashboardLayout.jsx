import React from "react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

const DashboardLayout = () => {
  const styleRoot = [
    "min-h-screen overflow-hidden w-full  bg-white flex flex-row bg-[#FAFAFA]",
  ];
  const styleMain = [" px-12 py-10 max-h-screen overflow-y-auto "];

  return (
    <div className={styleRoot.join("")}>
      <Sidebar />

      <div className="flex-1">
        <Topbar />
        <div className={styleMain.join("")}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
