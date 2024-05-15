import React, { useState, useEffect } from "react";
import NavBar from "../../components/learner/NavBar";
import CourseCard from "../../components/learner/CourseCard";
import bg from "../../assets/learnerbg.jpg";

function Home() {
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
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/courses/', {
                    method: 'GET'
                });
                const jsonData = await response.json();
                const cids = jsonData.map(item => item._id);
                setCourseIds(cids);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="relative top-0 flex flex-col w-screen h-screen overflow-y-auto bg-center bg-cover opacity-100 scrollbar-thumb-gray-400" 
            style={{ backgroundImage: `url(${bg})` }}>
            <div className="relative inset-0 bg-black bg-opacity-80">
                <NavBar />
                <div className="container px-4 mx-auto my-8 ">
                    <h2 className="mb-4 text-3xl font-bold text-center text-white">All Courses</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {courseIds.map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
