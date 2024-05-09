import React, { useState } from "react";
import NavBar from "../../components/learner/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CourseDetails from "../../components/learner/CourseDetails"

function MyCourses() {

    const [courseIds, setCourseIds] = useState([]);


    useEffect(() => {
        // Define a function to fetch data
        const fetchData = async () => {
          try {
            // Fetch data from your API
            const response = await fetch('http://localhost:5050/api/enrollments/6639d588bade26d37ed14e31', {
                method: 'GET'
            });
            const jsonData = await response.json();
            console.log("json data", jsonData)
            const cids = jsonData.map(item => item.cid);
                setCourseIds(cids);
                console.log("course ids", courseIds)

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    
       
    
      }, []);
        
      useEffect(() => {
        console.log("course ids", courseIds);
    }, [courseIds]);

    return (
        <div className="flex flex-col w-screen h-full top-0">
            <div className="flex flex-col grow-0">
                <NavBar />
            </div>
            <div className="flex flex-col gap-10 grow justify-center items-center w-screen h-full">
            
      <h2>My Courses</h2>
      {courseIds &&
        courseIds.map((course, index) => (
          
            <CourseDetails key={index} course={course} />
          
        ))}

      

            </div>
            <div className="flex flex-col grow-0">

            </div>
        </div>
    );
}

export default MyCourses;
