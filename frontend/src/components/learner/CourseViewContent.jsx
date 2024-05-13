import React, { useEffect, useState } from "react";

const CourseViewContent = ({ course }) => {
  const CID = course.course._id;
  console.log("cidcid", CID);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${CID}`, {
          method: 'GET'
        });

        if (response.ok) {
          const json = await response.json();
          setCourseDetails(json);
          // Log the fetched data, not the state variable
          console.log("Fetched Course Details:", json);
        } else {
          console.log('Error fetching course details');
        }
      } catch (error) {
        console.log('Error fetching course ', error);
      }
    };

    fetchCourseDetails();
  }, [CID]); // Dependency array should include CID, not course

 


  return (
    <>
      {course.course.contents.map((content, index) => (
        <div key={index} className="rounded border-b mx-5 mb-5 dark:bg-gray-900">
          <tr className="text-sm ">
          <th
              scope="row"
              className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Title
            </th>
            <td className="px-2 py-2">{content.title}</td>
          </tr>
          <tr >
            <th
              scope="row"
              className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              Type
            </th>
            <td className="px-2 py-2">{content.type}</td>
          </tr>
          {content.type === "Lecture" && (
            <tr >
              <th
                scope="row"
                className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Lecture Notes
              </th>
              <td className="px-2 py-2">{content.lectureNotes}</td>
            </tr>
          )}
          {content.type === "Video" && (
            <tr >
              <th
                scope="row"
                className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Video URL
              </th>
              <td className="px-2 py-2">{content.videoURL}</td>
            </tr>
          )}
          {/* {content.type === "Quiz" && ( */}
            <tr>
              <th
                scope="row"
                className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Quiz Questions
              </th>
              <td className="px-2 py-2">
                <ul className="px-4 list-decimal">
                  {content.quizQuestions.map((question, i) => (
                    <li key={i}>{question}</li>
                  ))}
                </ul>
              </td>
            </tr>
          {/* )} */}
        </div>
      ))}
    </>
  );
}


export default CourseViewContent;