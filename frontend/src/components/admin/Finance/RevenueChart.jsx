import React from "react";

export default function RevenueChart() {
  return (
    <div class="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div class="flex justify-between">
        <div>
          <h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
            32.4k
          </h5>
          <p class="text-base font-normal text-gray-500 dark:text-gray-400">
            Users this week
          </p>
        </div>
      
      </div>
      <div id="area-chart"></div>
      
    </div>
  );
}
