import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
import { useNavigate, useLocation } from "react-router-dom";

import {
  HiPlus,
  HiSearch,
  HiPencil,
  HiTrash,
  HiArrowRight,
  HiArrowLeft,
} from "react-icons/hi";

import dumbley from "../assets/dumbledore.jpg";

const User = () => {
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const THEAD_LIST = [
    { label: "No", index: "no" },
    { label: "Photo", index: "photo" },
    { label: "User Name", index: "username" },
    { label: "User email", index: "email" },
    { label: "Role", index: "role" },
    { label: "Action", index: "action" },
  ];

  const DUMMY_USERS = [
    { id: 1, username: "Tom Riddle", email: "tom@gmail.com", role: "Admin" },
    {
      id: 2,
      username: "Sirius Black",
      email: "black@gmail.com",
      role: "Admin",
    },
    { id: 3, username: "Kevin Hart", email: "kevin@gmail.com", role: "Admin" },
    { id: 4, username: "Andrew Tate", email: "tom@gmail.com", role: "Admin" },
    { id: 5, username: "Tom Riddle", email: "tom@gmail.com", role: "Admin" },
  ];

  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <section className="w-full h-auto">
      <div className="flex justify-between items-center">
        <h4 className="text-primary-dark text-sm font-bold">Users Data</h4>
        <button
          className="flex items-center px-3 py-2 text-white bg-primary rounded-lg "
          onClick={() => refresh()}
        >
          <HiPlus className="mr-2 w-5 h-5" />
          <span className="font-bold text-sm">Add</span>
        </button>
      </div>

      {/* table */}
      <div className="mt-5 w-full bg-white rounded-lg p-4">
        <div className="relative w-64">
          <HiSearch className="absolute h-4 w-4 ml-3 text-slate-400 top-4" />
          <input
            type="text"
            className="focus:outline-none border focus:border-[#6366F1] pr-3 pl-9 py-3 rounded-lg w-full"
            placeholder="Search for users"
          />
        </div>

        <div className="container mt-4">
          <div className="w-full rounded-lg">
            <table className="w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  {THEAD_LIST.map((item, index) => (
                    <th
                      key={index}
                      className={`py-4 text-slate-400 text-xs font-normal  ${
                        THEAD_LIST.length - 1 == index
                          ? "text-end"
                          : "text-start"
                      }`}
                    >
                      {item.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {DUMMY_USERS.map((item, index) => (
                  <tr className="whitespace-nowrap" key={item.email}>
                    <td className="py-4 text-primary-dark text-xs">
                      {index + 1}
                    </td>
                    <td className="py-4">
                      <img
                        src={dumbley}
                        alt="dumbleydore"
                        className="rounded-full h-6 w-6 object-cover"
                      />
                    </td>
                    <td className="py-4 text-xs text-primary-dark">
                      {item.username}
                    </td>
                    <td className="py-4 text-xs text-primary-dark">
                      {item.email}
                    </td>
                    <td className="py-4 text-xs text-primary-dark">
                      {item.role}
                    </td>
                    <td className="py-4 flex text-gray-400 items-center justify-end">
                      <HiPencil className="w-4 h-4 mr-4 cursor-pointer" />
                      <HiTrash className="w-4 h-4 cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex w-full justify-between items-center">
              <span className="text-xs text-primary-dark">
                Showing 10 of 100 data
              </span>
              <div className="flex justify-between">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-primary-dark mx-4">
                    Showing
                  </span>
                  <select
                    name="data_show"
                    id="data_show"
                    className="p-2 focus:outline-none rounded bg-gray-100 text-[10px]"
                  >
                    <option selected>10</option>
                    <option value="100">100</option>
                    <option value="1000">1000</option>
                  </select>
                  <span className="text-xs text-primary-dark mx-4">
                    data per page
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 p-2 rounded cursor-pointer">
                      <HiArrowLeft className="text-gray-500 h-4 w-4" />
                    </div>
                    <div className="bg-gray-100 p-2 rounded cursor-pointer">
                      <HiArrowRight className="text-gray-500 h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default User;
