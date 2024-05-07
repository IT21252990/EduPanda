import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from 'react';

export default function Nav() {

  return (
    <nav className="dark dark:bg-gray-900 dark:border-t-0 dark:rounded-b-lg fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 z-1">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3.5">
        <Link
          to="#"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src="/edupanda.png" className="h-10" alt="Logo" />
          <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
            EduPanda
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link
            // onClick={() => {
            //   doSignOut().then(() => {
            //     navigate("/");
            //   });
            // }}
            className="text-white bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Log Out
          </Link>
        </div>
       
      </div>
    </nav>
  );
}
