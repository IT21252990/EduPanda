import React, { useState, useEffect } from "react";
import NavBar from "../../components/learner/NavBar";
import CourseDetails from "../../components/learner/CourseDetails";
import bg from "../../assets/learnerbg.jpg"

function MyCourses() {
  const [courseIds, setCourseIds] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
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
        // Fetch course data after user data is successfully fetched
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5003/api/enrollments/${data._id}`, {
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
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
    }
  }, []);

  return (
    <div className="flex flex-col w-screen top-0 relative bg-cover bg-center h-screen overflow-y-auto scrollbar-thumb-gray-400 opacity-100" 
            style={{ backgroundImage: `url(${bg})` }}>
                <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.8)' 
    }}>
      <NavBar />
      <div className="container mx-auto my-8 px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">My Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courseIds.map((course, index) => (
            <CourseDetails key={index} course={course} />
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

export default MyCourses;
