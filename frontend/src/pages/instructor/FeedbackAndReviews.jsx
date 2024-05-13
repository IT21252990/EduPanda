import React from "react";
import NavBar from "../../components/instructor/NavBar";
import Footer from "../../components/instructor/Footer";
import bg from "../../assets/coursemanagementbgdark.jpg"


function FeedbackAndReviews() {
  return (
    <div className="flex flex-col w-screen h-full bg-cover bg-center top-0" style={{ backgroundImage: `url(${bg})` }}>
      <div className="flex flex-col grow-0">
        <NavBar />
      </div>
      <div className="flex flex-col grow justify-center items-center w-screen h-full">
        <h1>FeedbackAndReviews</h1>
      </div>
      <div className="flex flex-col grow-0">
        <Footer />
      </div>
    </div>
  );
}

export default FeedbackAndReviews;
