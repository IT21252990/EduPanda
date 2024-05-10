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

  useEffect(() => {
    const fetchAllCourses = async () => {
      const courses = {};
      for (const learner of learners) {
        try {
          const response = await fetch(`http://localhost:5001/api/courses/learner/${learner._id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch courses for learner");
          }
          const data = await response.json();
          courses[learner._id] = data;
        } catch (error) {
          console.error(error.message);
          courses[learner._id] = [];
        }
      }
      setLearnerCourses(courses);
    };

    fetchAllCourses();
  }, [learners]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
  }

  if (learners.length === 0) {
    return <div>No learners found.</div>; // You can replace this with a message indicating no learners are available
  }

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2 dark:border-gray-600 ">
      <tbody className="">
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
                  src={learner.photo} // Assuming the API returns a photo URL
                  alt=""
                />
                <div className="font-medium dark:text-white">
                  <div>{learner.name}</div>
                  <div className="text-sm pl-3 text-gray-500 dark:text-gray-400">
                    {learner.email}
                  </div>
                  <div className="text-sm pl-3 text-gray-500 dark:text-gray-400">
                    {learner.phone}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 font-light max-w-72">
              {learner.bio}
            </td>

            <td className="px-6 py-4">
              <h1 className="pb-2 dark:text-white"> Courses: </h1>
              <ol className="max-w-md space-y-1 list-decimal list-inside ">
                {(learnerCourses[learner._id] || []).map((course, index) => (
                  <li key={index}>{course.title}</li>
                ))}
              </ol>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
