// CourseEnrollmentChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CourseEnrollmentChart = ({ enrollments }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!enrollments || enrollments.length === 0) return;

    const ctx = chartRef.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Enrollments',
          data: [12, 19, 3, 5, 2, 3, 8],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    return () => myChart.destroy();
  }, [enrollments]);

  return <canvas ref={chartRef} id="courseEnrollmentChart" width="400" height="400"></canvas>;
};

export default CourseEnrollmentChart;
