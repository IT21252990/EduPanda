import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from '@stripe/stripe-js';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();
    const [courseDetails, setCourseDetails] = useState(null);
    const [bought, setBought] = useState(false);


    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    
    useEffect(() => {
    async function fetchData() {
        if (token) {
            try {
                // Fetch user
                const userResponse = await fetch('http://localhost:5002/api/users/getuser', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const userData = await userResponse.json();
                setUser(userData);

                // Fetch bought status
                const boughtResponse = await fetch(`http://localhost:5003/api/enrollments/${userData._id}/${course}`, {
                    method: 'GET'
                });
                if (boughtResponse.ok) {
                    const boughtData = await boughtResponse.json();
                    setBought(true);
                } else {
                    console.log('Error fetching bought status');
                }

                // Fetch course details
                const courseResponse = await fetch(`http://localhost:5000/api/courses/${course}`, {
                    method: 'GET'
                });
                if (courseResponse.ok) {
                    const courseData = await courseResponse.json();
                    setCourseDetails(courseData);
                } else {
                    console.log('Error fetching course details');
                }
            } catch (error) {
                console.error('Error in fetching data:', error);
            }
        }
    }

    fetchData();
}, [token, course]);


    const handleBuyClick = async () => {
        const stripe = await loadStripe("pk_test_51PEW6X087utRYQow5L8XVGunjUzQUeNYFwL4wZge2q8xMLxntDzD9E5lPS5zRlwjiMAuDJuNOxCX39Cm3QYPDsSv00G9BRoe4B");

        const body = {
            amount: courseDetails.price,
            currency: "usd",
            title: courseDetails.title,
            cid: courseDetails._id,
            uid: user._id
        }
        console.log("body", body);


        const headers = {
            "Content-Type": "application/json",
        }

        const response = await fetch("http://localhost:5003/api/enrollments/create-checkout-session", {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();

        console.log("session", session);

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error);

        }
    }

    // if (courseDetails) {
    //     navigate(`/purchase/${courseDetails._id}`);
    // }


    return (
        <div className="max-w-md min-w-full mx-auto bg-gray-200 shadow-lg rounded-lg overflow-hidden my-8">
            {courseDetails && (
                <div className="p-4 flex flex-col h-full">
                    <div>
                        <h2 className="text-xl text-gray-700 mb-3 font-semibold">{courseDetails.title}</h2>
                        <p className="text-gray-700"><strong>Description: </strong>{courseDetails.description}</p>
                        <p className="text-gray-700"><strong>Price: </strong>${courseDetails.price}</p>
                        <p className="text-gray-700"><strong>Level: </strong>{courseDetails.level}</p>
                        <p className="text-gray-700"><strong>Duration: </strong>{courseDetails.duration} hours</p>
                        <p className="text-gray-700"><strong>Tags: </strong>{courseDetails.tags.join(', ')}</p>
                    </div>
                    <div className="mt-auto mx-auto my-4 ">
                        {!bought && <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4" onClick={handleBuyClick}>Buy Now</button>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseCard;
