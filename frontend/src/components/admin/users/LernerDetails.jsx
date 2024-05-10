import React, { useState, useEffect } from "react";

export default function LearnerDetails() {
  const [learners, setLearners] = useState([]);
  const [learnerCourses, setLearnerCourses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/users/learners");
        if (!response.ok) {
          throw new Error("Failed to fetch learners");
        }
        const data = await response.json();
        setLearners(data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchCoursesForLearner = async (learnerId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/enrollments/userEnrollments/${learnerId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses for learner");
      }
      const data = await response.json();
      return data; // assuming the response contains an array of courses
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = {};
      for (const learner of learners) {
        const courses = await fetchCoursesForLearner(learner._id);
        coursesData[learner._id] = courses;
      }
      setLearnerCourses(coursesData);
    };
    fetchCourses();
  }, [learners]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (learners.length === 0) {
    return <div>No learners found.</div>;
  }

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2 dark:border-gray-600">
      <tbody>
        {learners.map((learner, index) => (
          <tr key={index} className="bg-white border-b dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-opacity-45">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {index + 1}
            </th>
            <td className="px-6 py-4">
              <div className="flex items-center gap-5">
                <img
                  className="w-10 h-10 rounded-full"
                  src={learner.photo}
                  alt=""
                />
                <div className="font-medium dark:text-white">
                  <div>{learner.name}</div>
                  <div className="text-sm pl-3">{learner.email}</div>
                  <div className="text-sm pl-3">{learner.phone}</div>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 font-light max-w-72">{learner.bio}</td>
            
          </tr>
        ))}
      </tbody>
    </table>
  );
}
