import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5002/api/users/logout');
      // Clear token from localStorage
      localStorage.removeItem('token');
      // Redirect the user to the home page or any other desired destination
      window.location.href = '/'; // Redirect to the home page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  
  return (
    <div>
      {/* Top Navbar */}
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
        <div className="flex items-center justify-between max-w-screen-xl p-4 mx-auto">
          <Link to="/learner_home" className="flex items-center space-x-3">
            <img src="/edupanda.png" className="h-8" alt="EduPanda Logo" />
            <span className="text-2xl font-semibold whitespace-nowrap dark:text-white">
              EduPanda
            </span>
          </Link>
          <div className="items-center hidden space-x-6 text-sm text-gray-500 md:flex dark:text-white">
            Welcome, Learner!
          </div>
        </div>
      </nav>

      {/* Bottom Navbar */}
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="items-center justify-between hidden md:flex">
            <ul className="flex flex-row mt-0 space-x-8 text-sm font-medium">
              <li>
                <Link
                  to="/home"
                  className="px-4 py-2 text-gray-900 transition duration-300 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/mycourses"
                  className="px-4 py-2 text-gray-900 transition duration-300 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  My Courses
                </Link>
              </li>
              <li>
                <Link
                to="/learner_profile"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Profile
                </Link>
              </li>
            </ul>
            <div
              onClick={() => {
                navigate("/");
              }}
              className="flex items-center space-x-6 rtl:space-x-reverse"
            >
              <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
               
                <Link
                  className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleLogout}
                >
                  Log Out
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
