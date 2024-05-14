import React, { useState, useEffect } from "react";
import AdNavBar from "../../../components/admin/AdNavBar";
import AdSidebar from "../../../components/admin/AdSideBar";
import RevenueChart from "../../../components/admin/Finance/RevenueChart";

export default function Finance() {
  const [enrollments, setEnrollments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    let results = enrollments.filter((enrollment) =>
      enrollment.cid && enrollment.cid.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [enrollments, searchTerm]);

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

        <div className="flex-1 justify-center items-center mt-16">
          <div className="w-2/3 mx-auto">
            <RevenueChart enrollments={enrollments} />
          </div>

          <form className="max-w-md mx-auto my-3">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Courses . . ."
                required
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

          <div className="relative ml-7 16 mb-8 shadow-md rounded-lg sm:rounded-lg dark:bg-gray-800 ">
            <table className="w-full mx-auto text-sm text-left rounded-lg rtl:text-right text-gray-500 dark:text-gray-400 dark:bg-gray-800">
              <caption className="p-5 text-xl font-bold text-left rtl:text-right text-gray-900 dark:text-white ">
                All transactions
              </caption>
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    #
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Learner
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Course
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Payment type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchResults.length > 0 ? (
                  searchResults.map((enrollment, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-opacity-45"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">
                        {enrollment.uid ? enrollment.uid.name : "N/A"}
                      </td>
                      <td className="px-6 py-4">{enrollment.cid ? enrollment.cid.title : "N/A"}</td>
                      <td className="px-6 py-4">${enrollment.cid ? enrollment.cid.price : "N/A"}</td>
                      <td className="px-6 py-4">
                        {enrollment.paymentType ? enrollment.paymentType : "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(enrollment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(enrollment.createdAt).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b-4 dark:border-b-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-opacity-45">
                    <td colSpan="6" className="py-4 text-center">
                      <h1 className="text-gray-500">No transactions found..</h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
