import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { NotifModal } from "../NotifModal";

import { HiChevronRight, HiBell } from "react-icons/hi";
import orang from "../../assets/orang.jpg";

export const Topbar = () => {
  const DUMMY_USER = { name: "Pamungkas", img: orang };

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(x => x);

  const [isNotif, setIsNotif] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const breadcrumbs = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;
    return (
      <span key={name} className="flex items-center">
        <Link to={routeTo} className={`text-slate-400`}>
          <span
            className={`font-medium ${
              pathnames.length - 1 == index && "text-primary underline"
            }`}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </span>
        </Link>
        {!isLast && <HiChevronRight className="h-5 w-5 text-slate-400 mx-1" />}
      </span>
    );
  });

  return (
    <>
      <div className="w-full h-[84px] bg-white border-b border-gray-200">
        <div className="py-6 px-12 flex items-center justify-between">
          <nav aria-label="breadcrumb">
            <ol className="flex">{breadcrumbs}</ol>
          </nav>
          <div className="flex items-center">
            <div
              className="relative mr-14 cursor-pointer"
              onClick={() => setOpenModal(prev => !prev)}
            >
              {isNotif && (
                <div className="absolute rounded-full h-[10px] w-[10px] bg-red-500  right-0"></div>
              )}
              <HiBell className="text-slate-400 h-6 w-6" />
            </div>
            <div className="flex items-center">
              <h5 className="text-sm text-slate-400 font-medium">
                Welcome back,{" "}
                <span className="text-black font-bold">{DUMMY_USER.name}!</span>
              </h5>
              <img
                src={DUMMY_USER.img}
                alt={DUMMY_USER.name}
                className="rounded-full h-9 w-9 ml-3 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <NotifModal isOpen={openModal} />
    </>
  );
};
