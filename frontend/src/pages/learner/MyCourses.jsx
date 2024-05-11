import React, { useState, useEffect } from "react";
import NavBar from "../../components/learner/NavBar";
import { useNavigate } from "react-router-dom";
import CourseDetails from "../../components/learner/CourseDetails";

function MyCourses() {
  const [courseIds, setCourseIds] = useState([]);


    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    
    useEffect(() => {
    if (token) {
        fetch('http://localhost:5002/api/users/getuser', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            setUser(data);
            console.log("userData", data);
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
        });
    }
}, [token]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5003/api/enrollments/${user._id}`, {
          method: 'GET'
        });
        const jsonData = await response.json();
        const cids = jsonData.map(item => item.cid);
        setCourseIds(cids);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="flex flex-col h-screen w-screen">
      <NavBar />
      <div className="flex-grow flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courseIds.map((course, index) => (
            <CourseDetails key={index} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
