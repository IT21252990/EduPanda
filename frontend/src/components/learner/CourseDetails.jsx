import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CourseDetails = ({ course }) => {
    const navigate = useNavigate();
    const [courseDetails, setCourseDetails] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/courses/${course}`, {
                    method: 'GET'
                });

                if (response.ok) {
                    const json = await response.json();
                    setCourseDetails(json);
                } else {
                    console.log('Error fetching course details');
                }
            } catch (error) {
                console.log('Error fetching course ', error);
            }
        };

        fetchCourseDetails();
    }, [course]);

    return (
        <div className="course-details">
            {courseDetails && (
                <>
                    <h4>{courseDetails.title}</h4>
                    <p><strong>Description: </strong>{courseDetails.description}</p>
                    <p><strong>Price: </strong>${courseDetails.price}</p>
                    <p><strong>Level: </strong>{courseDetails.level}</p>
                    <p><strong>Duration: </strong>{courseDetails.duration} hours</p>
                    <p><strong>Tags: </strong>{courseDetails.tags.join(', ')}</p>
                </>
            )}
        </div>
    );
};

export default CourseDetails;
