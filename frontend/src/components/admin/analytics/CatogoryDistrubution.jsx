import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const CategoryDistributionChart = ({ enrollments }) => {
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (!enrollments || enrollments.length === 0) {
      return;
    }

    const categoryCounts = {};
    enrollments.forEach((enrollment) => {
      // Add null check for enrollment.cid
      if (enrollment.cid && enrollment.cid.category) {
        const category = enrollment.cid.category;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }
    });

    // Destroy previous chart instance if exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    const ctx = document.getElementById('categoryDistributionChart').getContext('2d');
    const newChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(categoryCounts),
        
        datasets: [{
          data: Object.values(categoryCounts),
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)'
          ]
        }]
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: '#9CA3AF' 
            }
          }
        }
      }
    });

    setChartInstance(newChartInstance);

    // Cleanup function to destroy chart instance when component unmounts
    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, [enrollments]);

  return (
    <div className="text-white">
      <p className="text-xl font-bold mb-4">Course Category</p>
      <canvas id="categoryDistributionChart" width="400" height="400"></canvas>
    </div>
  
  );
};

export default CategoryDistributionChart;
