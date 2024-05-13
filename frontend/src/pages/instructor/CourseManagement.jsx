import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NavBar from "../../components/instructor/NavBar";
import Footer from "../../components/instructor/Footer";
import { useNavigate } from "react-router-dom";
import CourseTR from "../../components/instructor/CourseTR";
import CoursesTRDetails from "../../components/instructor/CoursesTRDetails";
import axios from "axios";
import bg from "../../assets/coursemanagementbg.jpg"

function CourseManagement() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [dropdownCourseId, setDropdownCourseId] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userID, setUserID] = useState(null);
  console.log(userID);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const toggleDropdown = (courseId) => {
    setDropdownCourseId((prevId) => (prevId === courseId ? null : courseId));
  };

  const handleNavigateToUpdateCourse = (courseId) => {
    navigate(`/update_course/${courseId}`);
  };

  // useEffect(() => {
  //   if (token) {
  //     axios
  //       .get("http://localhost:5002/api/users/getuser", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then((response) => {
  //         setUserID(response.data._id);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user profile:", error);
  //       });
  //   }
  // }, [token]);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:5002/api/users/getuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserID(response.data._id);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
    const fetchData = async () => {
      try {
        if (userID) {
          // Check if userID is not null
          const response = await fetch(
            `http://localhost:5001/api/courses/instructor/${userID}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch courses");
          }
          const data = await response.json();
          setCourses(data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, [userID]); // Add userID as a dependency

  const handleDelete = (courseId) => {

   
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          const response = fetch(`http://localhost:5000/api/courses/${courseId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            console.log("Course deleted successfully");
      
          } else if (!response.ok) {
            throw new Error("Failed to delete course");
          }
          navigate("/course_management");
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
     
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    let results = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [courses, searchTerm]);

  return (
    <div
    className="relative bg-cover bg-center h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800"
    style={{ backgroundImage: `url(${bg})` }}
    >
    <div className="top-0 flex flex-col w-screen h-full">
      <div className="flex flex-col">
        <NavBar />
      </div>
      <div className="flex flex-col  flex-grow h-full max-w-screen-xl mx-10">
        <div className="flex flex-col items-center justify-center h-auto pb-5 mt-5 text-xl font-bold text-left text-gray-900 bg-white rounded-3xl dark:text-white dark:bg-gray-800">
          <div className="flex flex-col md:flex-row items-center gap-20 mt-4">
            <h1 className="uppercase">All my courses</h1>
            <form className="flex items-center">
              <div className="relative w-96">
                <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
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
                  className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div className="flex items-center mt-5 space-x-6 rtl:space-x-reverse">
              <button
                onClick={() => navigate("/create_new_course")}
                type="button"
                className="text-white uppercase bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Create a new course
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Updated Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>

            {courses && courses.length === 0 ? (
              <div className="absolute flex flex-col items-center justify-center w-full h-10 mx-auto mt-10">
                <h1 className="dark:text-black">No Courses to Show</h1>
              </div>
            ) : (
              <tbody>
                {searchResults.length > 0 ? (
                  searchResults.map((course) => (
                    <React.Fragment key={course._id}>
                      <tr
                        className="bg-white border-b-4 dark:border-b-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-opacity-90"
                        onClick={() => toggleDropdown(course._id)}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {course.title}
                        </th>
                        <td className="px-6 py-4">${course.price}</td>
                        <td className="px-6 py-4">{course.category}</td>
                        <td className="px-6 py-4">{course.status}</td>
                        <td className="px-6 py-4">
                          {new Date(course.updated_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-5">
                            <button
                              onClick={() =>
                                handleNavigateToUpdateCourse(course._id)
                              }
                              className="inline-flex items-center gap-4 py-2 pl-1 pr-2 font-bold text-green-500 bg-gray-300 rounded hover:bg-green-500 hover:text-white"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                />
                              </svg>

                              <span>UPDATE</span>
                            </button>
                            <button
                              onClick={() => handleDelete(course._id)}
                              className="inline-flex items-center gap-4 py-2 pl-1 pr-2 font-bold text-red-700 bg-gray-300 rounded hover:bg-red-700 hover:text-white"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>

                              <span>DELETE</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                      {dropdownCourseId === course._id && (
                        <CourseTR course={course} />
                      )}
                      {dropdownCourseId === course._id && (
                        <tr className="text-sm bg-white border-b dark:bg-gray-700 dark:border-gray-700 ">
                          <td colSpan="7">
                            <div className="w-full dark:bg-gray-700">
                              <CoursesTRDetails course={course} />
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr className="bg-white border-b-4 dark:border-b-blue-400 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-opacity-45">
                    <td colSpan="6" className="py-4 text-center">
                      <h1 className="text-gray-500">No results found..</h1>
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>
        </div>
      </div>
      <div className="flex flex-col">
        <Footer />
      </div>
    </div>
    </div>
  );
}

export default CourseManagement;
