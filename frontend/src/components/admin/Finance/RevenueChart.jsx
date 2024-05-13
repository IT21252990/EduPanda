import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";

export default function RevenueChart({ enrollments }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (enrollments && enrollments.length > 0) {
      renderChart();
    }
  }, [enrollments]);
  

  const renderChart = () => {
    const ctx = chartRef.current.getContext("2d");

    if (ctx) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const revenueByDate = {};

      enrollments.forEach((enrollment) => {
        const date = new Date(enrollment.created_at).toLocaleDateString();
        const price = enrollment.cid.price;
        if (revenueByDate[date]) {
          revenueByDate[date] += price;
        } else {
          revenueByDate[date] = price;
        }
      });

      const labels = Object.keys(revenueByDate);
      const data = Object.values(revenueByDate);

      chartRef.current.chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [{
            label: "Revenue",
            data: data,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            text: "#ffffff"
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Revenue ($)",
                color: "#ffffff"
              }
            },
            x: {
              title: {
                display: true,
                text: "Date",
                color: "#ffffff"
              }
            }
          }
        }
      });
    }
  };

  return (
    <div className=" w-3/4 ml-36 bg-white rounded-lg shadow dark:bg-gray-800 m-4 p-4 md:p-6">
      <canvas ref={chartRef}></canvas>
    </div>
  );
}
