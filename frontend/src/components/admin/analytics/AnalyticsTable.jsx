export default function AnalyticsTable({
  enrollments,
  registrations,
  courses,
}) {
  // Calculate numerical comparisons based on fetched data
  const totalUsers = registrations.length;
  const totalCourses = courses.length;
  const totalEnrollments = enrollments.length;
  const totalLearners = registrations.filter(
    (registration) => registration.role === "learner"
  ).length;
  const totalInstructors = registrations.filter(
    (registration) => registration.role === "instructor"
  ).length;

  // Convert NaN values to strings
  const formattedTotalUsers = isNaN(totalUsers) ? "N/A" : totalUsers.toString();
  const formattedTotalCourses = isNaN(totalCourses)
    ? "N/A"
    : totalCourses.toString();
  const formattedTotalEnrollments = isNaN(totalEnrollments)
    ? "N/A"
    : totalEnrollments.toString();
  const formattedTotalLearners = isNaN(totalLearners)
    ? "N/A"
    : totalLearners.toString();
  const formattedTotalInstructors = isNaN(totalInstructors)
    ? "N/A"
    : totalInstructors.toString();

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="mx-auto">
        <caption className="p-5 text-xl font-bold text-center content-center text-gray-900 bg-white dark:text-white dark:bg-gray-800 flex justify-center items-center">
          Analytics
        </caption>

        <table className="mx-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Metric
              </th>
              <th scope="col" className="px-6 py-3 ">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-opacity-45">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Total Users
              </td>
              <td className="px-6 py-4">{formattedTotalUsers}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-opacity-45">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Total Courses
              </td>
              <td className="px-6 py-4">{formattedTotalCourses}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-opacity-45">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Total Enrollments
              </td>
              <td className="px-6 py-4">{formattedTotalEnrollments}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-opacity-45">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Total Learners
              </td>
              <td className="px-6 py-4">{formattedTotalLearners}</td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-opacity-45">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Total Instructors
              </td>
              <td className="px-6 py-4">{formattedTotalInstructors}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
