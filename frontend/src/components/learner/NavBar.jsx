import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4">
          <Link to="/learner_home" className="flex items-center space-x-3">
            <img src="/edupanda.png" className="h-8" alt="EduPanda Logo" />
            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
              EduPanda
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-6 text-sm text-gray-500 dark:text-white">
            Welcome, Learner!
          </div>
        </div>
      </nav>

      {/* Bottom Navbar */}
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="md:flex hidden items-center justify-between">
            <ul className="flex flex-row font-medium mt-0 space-x-8 text-sm">
              <li>
                <Link
                  to="/home"
                  className="text-gray-900 dark:text-white  hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/mycourses"
                  className="text-gray-900 dark:text-white  hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition duration-300"
                >
                  My Courses
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/monitor_progress"
                  className="text-gray-900 dark:text-white hover:underline hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition duration-300"
                >
                  Monitor Progress
                </Link>
              </li> */}
              <li>
                <Link
                  to="/instructor_profile"
                  className="text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition duration-300"
                >
                  Profile
                </Link>
              </li>
            </ul>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-600 transition duration-300"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
