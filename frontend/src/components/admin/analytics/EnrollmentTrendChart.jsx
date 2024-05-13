import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const EnrollmentTrendChart = () => {
  const [enrollments, setEnrollments] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/enrollments');
      if (!response.ok) {
        throw new Error('Failed to fetch enrollments');
      }
      const data = await response.json();
      setEnrollments(data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
  };

  useEffect(() => {
    console.log("Enrollments:", enrollments); // Log enrollments data
    if (!chartRef.current) return;

    const enrollmentCounts = {};
    enrollments.forEach(enrollment => {
      const monthYear = new Date(enrollment.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      enrollmentCounts[monthYear] = (enrollmentCounts[monthYear] || 0) + 1;
    });

    console.log("Enrollment Counts:", enrollmentCounts); // Log enrollment counts

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('enrollmentTrendChart').getContext('2d');
    console.log("Chart Context:", ctx); // Log chart context
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(enrollmentCounts),
        datasets: [{
          label: 'Enrollments',
          data: Object.values(enrollmentCounts),
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      }
    });
  }, [enrollments]);

  return (
    <div>
      <canvas id="enrollmentTrendChart" width="400" height="400"></canvas>
    </div>
  );
};

export default EnrollmentTrendChart;
