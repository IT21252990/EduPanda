// AdminHome.js
import React, { useEffect, useRef, useState } from 'react';
import AdNavBar from "../../components/admin/AdNavBar";
import AdSidebar from "../../components/admin/AdSideBar";
import RevenueChart from "../../components/admin/Finance/RevenueChart";

export default function AdminHome() {

  
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/enrollments");
      if (!response.ok) {
        throw new Error("Failed to fetch enrollments");
      }
      const data = await response.json();
      setEnrollments(data);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full">
        <AdNavBar />
      </div>

      <div className="sm:flex sm:flex-1">
        <div className="w-64 mt-16">
          <AdSidebar />
        </div>

        <div className="flex-1 justify-center items-center ">
          <div className="py-8 px-10 mx-auto max-w-screen-xl lg:py-16 mt-8">
            <div className="flex flex-row bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-700 dark:bg-opacity-80 rounded-lg p-8 md:p-12 mb-8">
              <div className='my-auto'>
                <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
                  Analytics
                </h1>
                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-6">
                  See all the analytics related to the EduPanda
                </p>
                <a
                  href="/APOD"
                  className="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                >
                  View
                  <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
              <div>
                <RevenueChart enrollments={enrollments} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:bg-opacity-80 rounded-lg p-8 md:p-12">

                <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                  Course details
                </h2>
                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                  See all the courses with all the details. Search them by name.
                </p>
                <a
                  href="/Analytics"
                  className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
                >
                  See more
                  <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 dark:bg-opacity-80 rounded-lg p-8 md:p-12">


                <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                  User details
                </h2>
                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">
                  See all the user details of Instructors and Learners
                </p>
                <a
                  href="/Users"
                  className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
                >
                  See more
                  <svg
                    className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
