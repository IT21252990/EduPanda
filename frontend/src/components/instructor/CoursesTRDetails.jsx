import React from "react";

export default function CoursesTRDetails({ course }) {
  return (
    <>
      {course.contents.map((content, index) => (
        <div key={index} className="rounded border-b mx-5 mb-5 dark:bg-gray-900">
          <div className="text-sm grid grid-cols-2 gap-4 p-4">
            <div className="font-medium text-gray-900 dark:text-white">Title</div>
            <div>{content.title}</div>
            <div className="font-medium text-gray-900 dark:text-white">Type</div>
            <div>{content.type}</div>
            <div className="font-medium text-gray-900 dark:text-white">Lecture Notes</div>
            <div>{content.lectureNotes}</div>
            <div className="font-medium text-gray-900 dark:text-white">Quiz Questions</div>
            <div>
              <ul className="list-decimal">
                {content.quizQuestions.map((question, i) => (
                  <li key={i}>{question}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
