import React, { useState, useEffect } from 'react';
import '../styles/dashboard.css';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    fetchWithAuth(import.meta.env.VITE_SERVER_DOMAIN + '/logout/', {
        method: 'GET',
      })
      .then(response => response.json())
      .then(data => {
        console.log('logout successful:', data);
        navigate('/login/')
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <ul>
          <li><a href="#users">All users</a></li>
          <li><a href="#doctors-charts"> نمودارهای دکترها</a></li>
          <li><a href="#patients-charts"> نمودارهای بیماران</a></li>
          <li><a href="#" onClick={handleLogout}>خروج</a></li>
        </ul>
      </div>
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="charts-container">
        <h2 id="users">Meow</h2>
        <hr className="separator" />
        <div className="map-section">
          <div className="children-container">
            {children.map((child, index) => (
              <div className="child-card" key={index}>
                <img src={child.profile_picture || "https://via.placeholder.com/150"} alt="child-profile" className="child-picture" />
                <p>{child.first_name} {child.last_name}</p>
                <p>{child.city}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
        <h2 id="doctors-charts">نمودارهای دکترها</h2>
        <hr className="separator" />
        <div className="chart-section">
            </div>
          <h2 id="patients-charts">نمودارهای بیماران</h2>
        <hr className="separator" />
        </div>
      </div>
  );
};

export default AdminDashboard;
