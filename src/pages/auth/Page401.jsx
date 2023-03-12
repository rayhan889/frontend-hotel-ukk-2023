import React from "react";
import { Link } from "react-router-dom";

const Page401 = () => {
  return (
    <section className="w-full h-screen bg-white">
      <div className="flex justify-center items-center flex-col h-full">
        <h1 className="text-9xl text-primary-dark font-bold ">401</h1>
        <div className="flex flex-col mt-11 items-center justify-center">
          <h2 className="text-2xl text-primary-dark font-bold mb-3">
            Authorization Required
          </h2>
          <span className="text-slate-400 text-base font-medium">
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation.
          </span>
          <Link
            to="/login"
            className="w-64 h-auto rounded-lg bg-[#F1F1FE] text-primary py-4 font-bold mt-20 flex items-center justify-center"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page401;
