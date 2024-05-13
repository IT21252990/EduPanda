import React from "react";
import NavBar from "../../components/instructor/NavBar";
import Footer from "../../components/instructor/Footer";
import bg from "../../assets/coursemanagementbgdark.jpg"
import courseBg from "../../assets/course-management.jpg"
import progressBg from "../../assets/coursemonitoring-progress.png"
import feedbackBg from "../../assets/coursefeedbacks.jpg"
import profileBg from "../../assets/courseprofile.png"

function InstructorHome() {
  return (
    <div className="flex flex-col w-screen h-full bg-cover bg-center top-0" style={{ backgroundImage: `url(${bg})` }}>
      <div className="flex flex-col grow-0">
        <NavBar />
      </div>

      <h1 className="uppercase dark:text-gray-500 justify-center font-extrabold mt-10 text-3xl md:text-5xl items-center mx-auto ">Instructor Dashboard</h1>

      <div className="flex flex-col mt-10 lg:flex-row grow mx-1  justify-center gap-5 items-center w-screen h-full"  >
        

<div className="max-w-[300px] bg-white border border-gray-200 hover:bg-opacity-30 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="/course_management">
        <img className="rounded-t-lg" src={courseBg} alt="" />
    </a>
    <div className="p-5 ">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">Course Management</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Manage Your Course Content here..</p>
    </div>
</div>
<div className="max-w-[300px] bg-white border border-gray-200 hover:bg-opacity-30 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="/progress_monitoring">
        <img className="rounded-t-lg" src={progressBg} alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">Monitor Progress</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Visit to see progress of learners about your courses.   </p>
    </div>
</div>
<div className="max-w-[300px] bg-white border border-gray-200 hover:bg-opacity-30 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="/feedback_and_reviews">
        <img className="rounded-t-lg" src={feedbackBg} alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">Feedbacks & Reviews</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are Learners feedbackand reviews about your courses</p>
    </div>
</div>
<div className="max-w-[300px] bg-white border border-gray-200 hover:bg-opacity-30 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="/instructor_profile">
        <img className="rounded-t-lg" src={profileBg} alt="" />
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white uppercase">Access Your Profile</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Visit to Customize your Instructor Profile</p>
    </div>
</div>

      </div>
      <div className="flex flex-col grow-0">
        <Footer />
      </div>
    </div>
  );
}

export default InstructorHome;
