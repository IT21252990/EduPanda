import React from "react";

export default function CourseTR({ course }) {
  return (
    <tr className="bg-white border-b dark:bg-gray-700 dark:border-gray-700 text-sm">
      <td colSpan="5" className="pl-10 py-4">
        <div className="flex flex-col">
          <h3 className="text-xl font-bold">{course.title}</h3>
          <div className="mt-4 text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Details: </span>
            {course.description}
          </div>
          <div className="mt-2 text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Category: </span>
            {course.category}
          </div>
          <div className="mt-2 text-gray-600 dark:text-gray-300">
            <span className="font-semibold">Tags: </span>
            {course.tags.map((tag, index) => (
              <span key={index} className="inline-block bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-300 px-2 py-1 rounded-full text-xs mr-1">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-2 text-gray-600 dark:text-gray-300 font-semibold">
            Course Content:
          </div>
        </div>
      </td>

      <td colSpan="2" className="w-1/5 pl-12">
        <div className="mb-2 font-semibold text-gray-900 dark:text-white">
          Enrolled count: {course.enrolledStudents.length}
        </div>
        <div className="text-gray-400 mt-2 rounded-lg text-sm p-2 inline-block dark:bg-gray-800 dark:text-white">
          {course.level}
        </div>
        <div className="flex items-center mt-4 text-gray-900 dark:text-white">
          <svg
            className="w-6 h-6 mr-1 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm11-4a1 1 0 00-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L13 11.586V8z"
            />
          </svg>
          {course.duration} hrs
        </div>
      </td>
    </tr>
  );
}
