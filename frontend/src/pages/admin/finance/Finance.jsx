import React from "react";
import AdNavBar from "../../../components/admin/AdNavBar";
import AdSidebar from "../../../components/admin/AdSideBar";
import RevenueChart from "../../../components/admin/Finance/RevenueChart";

export default function Finance(){
return(
<div className="flex flex-col h-screen">
      <div className="w-full">
        <AdNavBar />
      </div>

      <div className="sm:flex sm:flex-1">
        <div className="w-64 mt-16">
          <AdSidebar />
        </div>

        <div className="flex-1 justify-center items-center mt-16">
          <RevenueChart/>
        </div>
      </div>
    </div>
)
}