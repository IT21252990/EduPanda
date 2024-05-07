import React from "react";
import NavBar from "../../components/instructor/NavBar";

function Profile() {
  return (
    <div className="flex flex-col w-screen h-full top-0">
      <div className="flex flex-col grow-0">
        <NavBar />
      </div>
      <div className="flex flex-col grow justify-center items-center w-screen h-full">
        <h1>Profile</h1>
      </div>
    </div>
  );
}

export default Profile;
