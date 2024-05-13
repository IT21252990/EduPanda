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
          backgroundColor: 'rgba(54, 162, 235, 1)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#FFFFFF' // Set y-axis ticks color to white
            },
            title: {
              display: true,
              text: 'Number of Enrollments',
              color: '#FFFFFF' // Set y-axis title color to white
            }
          },
          x: {
            ticks: {
              color: '#FFFFFF' // Set x-axis ticks color to white
            },
            title: {
              display: true,
              text: 'Month',
              color: '#FFFFFF' // Set x-axis title color to white
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#FFFFFF' // Set legend labels color to white
            }
          }
        }
      }
    });

    return () => myChart.destroy();
  }, [enrollments]);

  return (
    <div className="text-white">
      <p className="text-xl font-bold mb-4">User Enrollments</p>
      <canvas ref={chartRef} id="courseEnrollmentChart" width="400" height="400"></canvas>
    </div>
  );
};

export default CourseEnrollmentChart;
