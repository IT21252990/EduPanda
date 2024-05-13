// UserRegistrationChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const UserRegistrationChart = ({ registrations }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!registrations || registrations.length === 0) return;

    const registrationsByDate = {};
    registrations.forEach(registration => {
      const date = new Date(registration.createdAt).toLocaleDateString();
      if (!registrationsByDate[date]) {
        registrationsByDate[date] = { learner: 0, instructor: 0 };
      }
      registrationsByDate[date][registration.role]++;
    });

    const ctx = chartRef.current.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Object.keys(registrationsByDate),
        
        datasets: [{
          label: 'Learners',
          data: Object.values(registrationsByDate).map(entry => entry.learner),
          backgroundColor: 'rgba(75, 192, 192, 1)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }, {
          label: 'Instructors',
          data: Object.values(registrationsByDate).map(entry => entry.instructor),
          backgroundColor: 'rgba(255, 159, 64, 1)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Registrations',
              color: '#FFFFFF' 
            },
            ticks: {
              color: '#FFFFFF'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date',
              color:  '#FFFFFF'
            },
            ticks: {
              color: '#FFFFFF'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#FFFFFF'
            }
          }
        }
      }
    });

    return () => myChart.destroy();
  }, [registrations]);

  return (
    <div className="text-white">
      <p className="text-xl font-bold mb-4">User Registrations </p>
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  )
};

export default UserRegistrationChart;
