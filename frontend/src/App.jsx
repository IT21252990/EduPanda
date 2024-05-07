import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

//pages
import NavigatePage from "./pages/NavigatePage"

//admin
import AdminHome from './pages/admin/AdminHome';
import ViewAllCourses from './pages/admin/courses/ViewAllCourses';
import NewCourses from './pages/admin/courses/NewCourses';
import UpdatedCourses from './pages/admin/courses/UpdatedCourses';

//Instructor
import InstructorHome from './pages/instructor/InstructorHome';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Test - Remove later */}
          <Route path="/" element={<NavigatePage />} />

          {/* admin */}
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/ViewAllCourses" element={<ViewAllCourses />} />
          <Route path="/NewCourses" element={<NewCourses />} />
          <Route path="/UpdatedCourses" element={<UpdatedCourses />} />

          {/* Instructor */}
          <Route path="/instructor_home" element={<InstructorHome />} />

        </Routes>
      </BrowserRouter>
    
  
    </>
  )
}

export default App
