import React, { useState, useEffect } from "react";
import NavBar from "../../components/learner/NavBar";
import { useNavigate } from "react-router-dom";
import CourseView from "../../components/learner/CourseView";
import { useLocation } from 'react-router-dom';
import CourseViewContent from "../../components/learner/CourseViewContent";

function CourseViewPage() {
    const [courseIds, setCourseIds] = useState([]);
    const [courseDetails, setCourseDetails] = useState(null);


    const {state} = useLocation();
    const courseState  = location.state;
    console.log("courseDetails", state)

    const course = state.course._id



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
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/courses/${course}`, {
                    method: 'GET'
                })

                if (response.ok) {
                    const json = await response.json();
                    setCourseDetails(json);
                    console.log("hhhhhh", courseDetails)
                } else {
                    console.log('Error fetching course details');
                }
            } catch (error) {
                console.log('Error fetching course ', error);
            }
        };

        fetchCourseDetails();
    }, [course]);

    useEffect(() => {
        console.log("Updated courseDetails:", courseDetails);
    }, [courseDetails]);

    return (
        <div className="flex flex-col w-screen bg-gray-700">
            <NavBar />
            <h2 className="text-4xl bg-gray-900 font-bold mb-4 p-4">{state.course.title}</h2>
                    <CourseView course={state} />
            <div className="flex-grow flex justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* {courseIds.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))} */}
                    <CourseViewContent course={state} />
                </div>
            </div>
        </div>
    );
}

export default CourseViewPage;
