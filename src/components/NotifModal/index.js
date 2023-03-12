import React, { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";

import { HiMailOpen, HiChevronRight, HiOutlineX } from "react-icons/hi";

export const NotifModal = props => {
  const positionStyle = ["absolute right-52 top-16"];

  const DUMMY_NOTIF = [
    {
      id: 1,
      customer: "Kamado Tanjiro",
      order_date: "Mar 10, 3:27 PM",
      room_number: 20,
    },
    {
      id: 2,
      customer: "Jin Sakai",
      order_date: "Mar 12, 3:27 PM",
      room_number: 10,
    },
    {
      id: 3,
      customer: "Louis Jackson",
      order_date: "Mar 23, 3:27 PM",
      room_number: 42,
    },
  ];

  const [notifItem, setNotifItem] = useState(DUMMY_NOTIF);

  const handleSetNotifItem = id => {
    const newNotif = notifItem.filter(item => item.id != id);
    setNotifItem(newNotif);
  };

  return (
    <>
      <Popover>
        <Transition
          as={Fragment}
          show={props.isOpen}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <Popover.Panel
            className={`${positionStyle.join(
              ""
            )} w-[300px] p-3 rounded-lg flex flex-col h-auto bg-white shadow-md`}
          >
            <div className="flex justify-between items-center">
              <h5 className="font-medium text-base text-primary-dark">
                Notification
              </h5>
              <HiMailOpen className="text-primary-dark w-5 h-5" />
            </div>
            <div className="mt-8 w-full flex flex-col">
              {notifItem.map((item, index) => (
                <div key={item.id} className="flex justify-between w-full ">
                  <div className="flex flex-col justify-start w-full mb-3">
                    <h6 className="text-xs text-primary-dark mb-1">
                      <span className="font-semibold">{item.customer} </span>
                      order room {item.room_number}
                    </h6>
                    <h6 className="text-slate-400 text-xs">
                      {item.order_date}
                    </h6>

                    <Link
                      to="#"
                      className="underline text-primary flex items-center text-xs font-semibold mt-3"
                    >
                      See Details{" "}
                      <HiChevronRight className="h-[10px] w-[10px]" />
                    </Link>
                    {DUMMY_NOTIF.length - 1 != index && (
                      <hr className="w-full bg-slate-400 rounded mt-3" />
                    )}
                  </div>
                  <HiOutlineX
                    className="h-5 w-5 text-slate-400 cursor-pointer"
                    onClick={() => handleSetNotifItem(item.id)}
                  />
                </div>
              ))}
              {notifItem.length == 0 && (
                <div className="w-full flex justify-center">
                  <span className="text-slate-400 text-sm font-medium">
                    No notifications yet.
                  </span>
                </div>
              )}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </>
  );
};
