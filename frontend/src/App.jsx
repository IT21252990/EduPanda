import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

//pages
import NavigatePage from "./pages/NavigatePage"

//admin
import AdminHome from './pages/admin/AdminHome';

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

          {/* Instructor */}
          <Route path="/instructor_home" element={<InstructorHome />} />

        </Routes>
      </BrowserRouter>
    
  
    </>
  )
}

export default App
