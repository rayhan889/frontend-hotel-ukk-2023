import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <section className="w-full h-screen bg-white">
      <div className="flex justify-center items-center flex-col h-full">
        <h1 className="text-9xl text-primary-dark font-bold ">404</h1>
        <div className="flex flex-col mt-11 items-center justify-center">
          <h2 className="text-2xl text-primary-dark font-bold mb-3">
            Sorry, we couldn't find this page.
          </h2>
          <span className="text-slate-400 text-base font-medium">
            But dont worry, you can find plenty of other things on our homepage.
          </span>
          <Link
            to="/dashboard/home"
            className="w-64 h-auto rounded-lg bg-[#F1F1FE] text-primary py-4 font-bold mt-20 flex items-center justify-center"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Page404;
