import React from "react";
import AdNavBar from "../../../components/admin/AdNavBar";
import AdSidebar from "../../../components/admin/AdSideBar";
import { useState } from "react";

export default function ViewAllCourses() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="w-full">
          <AdNavBar />
        </div>

        <div className="sm:flex sm:flex-1">
          <div className="w-64 mt-16">
            <AdSidebar />
          </div>

          <div className="flex-1 justify-center items-center mt-10 p-8">
            <form class="max-w-md mx-auto mb-3">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Courses . . ."
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg ">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <caption class="p-5 text-xl font-bold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                  All courses
                </caption>
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Instructor
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Updated Date
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-opacity-45"
                    onClick={toggleDropdown}
                  >
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Introduction to Web Development
                    </th>
                    <td class="px-6 py-4">$ 99.99</td>
                    <td class="px-6 py-4">Amali Perera</td>
                    <td class="px-6 py-4">Web Development</td>
                    <td class="px-6 py-4">Pending</td>
                    <td class="px-6 py-4">2024-05-07</td>
                    <td class="px-6 py-4 text-right">
                      <button
                        type="button"
                        class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <svg
                          class="w-6 h-6 text-gray-800 dark:text-white dark:hover:text-blue-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 9-7 7-7-7"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>

                  {isDropdownOpen && (
                    <tr className="bg-white border-b dark:bg-gray-700 dark:border-gray-700 text-sm">
                      <td colSpan="5">
                        <ul className="py-2 space-y-2 pl-4 text-gray-500 list-disc list-inside dark:text-gray-200">
                          <h3 className="text-xl font-bold">
                            Introduction to Web Development
                          </h3>
                          <p className="font-semibold text-base">
                            Amali Perera
                          </p>
                          <dl>
                            <dt className="mb-2 mt-4 font-semibold leading-none text-gray-900 dark:text-white">
                              Details :
                            </dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-300">
                              Learn the basics of web development. basics and
                              all the stuff heu heu {":)"}
                            </dd>
                            <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                              Category :
                            </dt>
                            <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-300">
                              Web development
                            </dd>
                            <dt className="font-semibold leading-none text-gray-900 dark:text-white">
                              Course Content :
                            </dt>
                          </dl>
                        </ul>
                      </td>

                      <td colSpan="2" className=" mt-5">
                        <div className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                          Enrolled count : 50
                        </div>
                        <div class="text-gray-400 mt-6 rounded-lg text-sm p-2 inline-flex  dark:bg-gray-800 dark:text-white">
                          Beginner
                        </div>
                        <div className="flex items-center py-4 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                          <svg
                            class="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          12hrs
                        </div>
                      </td>
                    </tr>
                  )}
                  {isDropdownOpen && (
                    <tr className="bg-white border-b dark:bg-gray-700 dark:border-gray-700 text-sm ">
                      <td colSpan="7">
                        <div class="relative overflow-x-auto sm:rounded-lg">
                          <table class="w-11/12 my-2 mx-auto rounded-lg text-sm  border-b dark:border-gray-700 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody>
                              <tr class="bg-white border-b  dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  rowSpan="4"
                                  scope="row"
                                  class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  1
                                </th>
                                <th class="px-2 py-2">Title</th>
                                <td class="px-2 py-2">HTML Basics</td>
                              </tr>
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  scope="row"
                                  class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  Type
                                </th>
                                <td class="px-2 py-2">Lecture</td>
                              </tr>
                              <tr class="bg-white border-b dark:border-gray-700 dark:bg-gray-800 ">
                                <th
                                  scope="row"
                                  class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  Lecture Notes
                                </th>
                                <td class="px-2 py-2">
                                  This is a lecture about the basics of HTML.
                                </td>
                              </tr>
                              <tr class="bg-white border-b dark:border-gray-700 dark:bg-gray-800 ">
                                <th
                                  scope="row"
                                  class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  Quiz Questions
                                </th>
                                <td class="px-2 py-2">Black</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div class="relative overflow-x-auto sm:rounded-lg">
                          <table class="w-11/12 my-2 mx-auto rounded-lg text-sm  border-b dark:border-gray-700 text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <tbody>
                              <tr class="bg-white border-b  dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  rowSpan="4"
                                  scope="row"
                                  class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  1
                                </th>
                                <th class="px-2 py-2">Title</th>
                                <td class="px-2 py-2">HTML Basics</td>
                              </tr>
                              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th
                                  scope="row"
                                  class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  Type
                                </th>
                                <td class="px-2 py-2">Lecture</td>
                              </tr>
                              <tr class="bg-white border-b dark:border-gray-700 dark:bg-gray-800 ">
                                <th
                                  scope="row"
                                  class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  Lecture Notes
                                </th>
                                <td class="px-2 py-2">
                                  This is a lecture about the basics of HTML.
                                </td>
                              </tr>
                              <tr class="bg-white border-b dark:border-gray-700 dark:bg-gray-800 ">
                                <th
                                  scope="row"
                                  class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                  Quiz Questions
                                </th>
                                <td class="px-2 py-2">Black</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}