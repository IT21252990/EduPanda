import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import React from "react";

//pages
import NavigatePage from "./pages/NavigatePage"

//admin
import AdminHome from './pages/admin/AdminHome';
import ViewAllCourses from './pages/admin/courses/ViewAllCourses';
import NewCourses from './pages/admin/courses/NewCourses';
import UpdatedCourses from './pages/admin/courses/UpdatedCourses';
import Users from './pages/admin/users/users';
import Finance from './pages/admin/finance/Finance';

//Instructor
import InstructorHome from './pages/instructor/InstructorHome';
import CourseManagement from './pages/instructor/CourseManagement';
import ProgressMonitoring from './pages/instructor/ProgressMonitoring';
import FeedbackAndReviews from './pages/instructor/FeedbackAndReviews';
import Profile from './pages/instructor/Profile';
import CreateNewCourse from './pages/instructor/CreateNewCourse';
import Login from './pages/login/LoginPage';
import Register from './pages/login/RegisterPage';
import MyProfile from './pages/Myprofile/MyProfile';


function App() {

  return (
    <>
      <BrowserRouter>
      <ToastContainer />
        <Routes>
          {/* Test - Remove later */}
          <Route path="/" element={<NavigatePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myprofile" element={<MyProfile />} />

          {/* admin */}
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/ViewAllCourses" element={<ViewAllCourses />} />
          <Route path="/NewCourses" element={<NewCourses />} />
          <Route path="/UpdatedCourses" element={<UpdatedCourses />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/Finance" element={<Finance />} />
        

          {/* Instructor */}
          <Route path="/instructor_home" element={<InstructorHome />} />
          <Route path="/course_management" element={<CourseManagement />} />
          <Route path="/progress_monitoring" element={<ProgressMonitoring />} />
          <Route path="/feedback_and_reviews" element={<FeedbackAndReviews />} />
          <Route path="/instructor_profile" element={<Profile />} />
          <Route path="/create_new_course" element={<CreateNewCourse />} />

          
          
        </Routes>
      </BrowserRouter>
    
  
    </>
  )
}

export default App
