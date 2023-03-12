import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

import logo from "../../assets/logo_2.svg";
import {
  HiHome,
  HiUser,
  HiUserGroup,
  HiDocumentText,
  HiLogout,
} from "react-icons/hi";

export const Sidebar = () => {
  const location = useLocation();
  const logout = useLogout();
  const navigate = useNavigate();

  const navItems = [
    { id: 1, label: "Home", url: "/dashboard/home", icon: <HiHome /> },
    { id: 2, label: "User", url: "/dashboard/users", icon: <HiUser /> },
    {
      id: 3,
      label: "Customer",
      url: "/dashboard/customers",
      icon: <HiUserGroup />,
    },
    {
      id: 4,
      label: "Order List",
      url: "/dashboard/orders",
      icon: <HiDocumentText />,
    },
  ];

  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="w-[290px] min-h-screen px-8 py-[50px] bg-primary-dark">
      {/* logo */}
      <div className="flex items-center">
        <div className="h-12 w-12 rounded-lg bg-white bg-opacity-[10%] flex items-center justify-center">
          <img src={logo} alt="d'hotel_logo" />
        </div>
        <div className="ml-3 flex flex-col gap-[6px] text-white">
          <h4 className="text-base font-bold">D'Hotel</h4>
          <span className="text-sm text-slate-400 font-medium">
            Admin Dashboard
          </span>
        </div>
      </div>

      {/* nav items */}
      <div className="mt-20 flex h-4/5 flex-col justify-between">
        <ul className="flex flex-col items-start">
          {navItems.map(item => (
            <Link
              to={item.url}
              key={item.id}
              className={`flex w-full items-center text-white p-3 mb-[14px] rounded hover:bg-[#252E3E] ${
                location.pathname === item.url && "bg-[#252E3E]"
              }`}
            >
              <div
                className={`w-4 h-4 mr-3 ${
                  location.pathname === item.url
                    ? "text-[#6366F1]"
                    : "text-white"
                }`}
              >
                {item.icon}
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </ul>
        <button
          className="flex w-full items-center text-white p-3 mb-[14px] rounded hover:bg-[#252E3E]"
          onClick={signOut}
        >
          <div className="w-4 h-4 mr-3">
            <HiLogout />
          </div>
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};
