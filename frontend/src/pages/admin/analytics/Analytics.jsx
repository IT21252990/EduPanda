import React, { useState, useEffect } from "react";
import CourseEnrollmentChart from "../../../components/admin/analytics/CourseEnrollmentChart";
import CategoryDistributionChart from "../../../components/admin/analytics/CatogoryDistrubution";
import UserRegistrationChart from "../../../components/admin/analytics/UserRegistrationChart";
import AnalyticsTable from "../../../components/admin/analytics/AnalyticsTable";
import AdNavBar from "../../../components/admin/AdNavBar";
import AdSidebar from "../../../components/admin/AdSideBar";
const Analytics = () => {
  const [registrations, setRegistrations] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const registrationsResponse = await fetch(
        "http://localhost:5001/api/users/"
      );
      const enrollmentsResponse = await fetch(
        "http://localhost:5001/api/enrollments"
      );
      const coursesResponse = await fetch("http://localhost:5001/api/courses");

      if (
        registrationsResponse.ok &&
        enrollmentsResponse.ok &&
        coursesResponse.ok
      ) {
        const registrationsData = await registrationsResponse.json();
        const enrollmentsData = await enrollmentsResponse.json();
        const coursesData = await coursesResponse.json();

        setRegistrations(registrationsData);
        setEnrollments(enrollmentsData);
        setCourses(coursesData);
        setLoading(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
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

        <div className="flex-1 justify-center items-center mt-16 ml-12 flex-wrap">
          <div className="m-3 rounded-lg p-5 text-xl font-bold text-center rtl:text-right border-2 dark:border-gray-700 text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            <h1>EduPanda Analytics</h1>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="flex flex-wrap justify-center">
                <div
                  className="m-3 rounded-lg p-5 text-center dark:border-gray-700 text-gray-900 bg-white dark:text-white dark:bg-gray-800 flex-1"
                  style={{ maxWidth: "50%" }}
                >
                  <AnalyticsTable
                    enrollments={enrollments}
                    registrations={registrations}
                    courses={courses}
                  />
                </div>
                <div
                  className="m-3 rounded-lg p-5 text-center dark:border-gray-700 text-gray-900 bg-white dark:text-white dark:bg-gray-800 flex-1"
                  style={{ maxWidth: "50%" }}
                >
                  <UserRegistrationChart registrations={registrations} />
                </div>
              </div>
              <div className="flex flex-wrap justify-center">
                <div
                  className="m-3 rounded-lg p-5 text-center dark:border-gray-700 text-gray-900 bg-white dark:text-white dark:bg-gray-800 flex-1"
                  style={{ maxWidth: "50%" }}
                >
                  <CourseEnrollmentChart enrollments={enrollments} />
                </div>
                <div
                  className="m-3 rounded-lg p-5 text-center dark:border-gray-700 text-gray-900 bg-white dark:text-white dark:bg-gray-800 flex-1"
                  style={{ maxWidth: "50%" }}
                >
                  <CategoryDistributionChart enrollments={enrollments} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
