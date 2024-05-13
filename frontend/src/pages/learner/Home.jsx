import React, { useState, useEffect } from "react";
import NavBar from "../../components/learner/NavBar";
import CourseCard from "../../components/learner/CourseCard";

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
        <div className="flex flex-col w-screen h-full top-0">
            <NavBar />
            <div className="container mx-auto my-8 px-4">
                <h2 className="text-3xl font-bold mb-4">All Courses</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {courseIds.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
