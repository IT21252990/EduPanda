import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";

//pages
import NavigatePage from "./pages/NavigatePage"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavigatePage />} />
        </Routes>
      </BrowserRouter>
    
  
    </>
  )
}

export default App
