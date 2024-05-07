import React from "react";
import AdNavBar from "../../components/admin/AdNavBar";
import AdSidebar from "../../components/admin/AdSideBar";

export default function AdminHome() {
  return (
    <div className="flex flex-col h-screen">
      <div className="">
        <AdNavBar />
      </div>

      <div className="flex flex-row">
        <div className="">
          <AdSidebar />
        </div>
        
        <div className="justify-center items-center">
          <h1>Admin Home</h1>
          <p>
            body of the page fcnsdv  pfjcsv odspfo ipdksfk dkAFMc opoadjnl podjPAOJD?kf  pJAdnLAHIF edjpAL
          </p>
        </div>
      </div>
    </div>
  );
}
