import React, { useState, useEffect } from 'react'; 
import '../styles/dashboard.css'; 
import { useNavigate } from 'react-router-dom'; 
import { fetchWithAuth } from '../lib/authfetch'; 
import { toast } from 'react-hot-toast';
 
const AdminDashboard = () => { 
  const [pages, setPages] = useState([]);
  const [users, setUsers] = useState([]); 
  const navigate = useNavigate(); 
 
  const handleLogout = async () => { 
    toast.success('Logged out...');
    console.log('logout successful:'); 
    navigate('/login/'); 
  }; 
 
  const fetchUsers = () => { 
    fetchWithAuth(import.meta.env.VITE_SERVER_DOMAIN + 'admin/users', { 
      method: 'GET', 
    }) 
      .then(response => response.json()) 
      .then(data => { 
        console.log(data); 
        setPages(data['users']); 
      }) 
      .catch((error) => { 
        console.error('Error:', error); 
      }); 
  }; 
 
  const toggleUserStatus = (username, currentStatus) => { 
    fetchWithAuth(import.meta.env.VITE_SERVER_DOMAIN + 'admin/users?' + new URLSearchParams({
      username: username,
      active: !currentStatus
    }).toString(), { 
      method: 'PUT', 
    }) 
      .then(response => response) 
      .then(data => { 
        console.log('User status updated:', data); 
        fetchUsers(); 
      }) 
      .catch((error) => { 
        console.error('Error:', error); 
      }); 
  }; 
 
  useEffect(() => { 
    fetchUsers(); 
  }, []); 
 
  return ( 
    <div className="dashboard-container"> 
      <div className="dashboard-sidebar"> 
        <ul> 
          <li><a href="#users">All users</a></li> 
          <li><a href="#" onClick={handleLogout}>Logout</a></li> 
        </ul> 
      </div> 
      <div className="dashboard-main"> 
        <div className="dashboard-header"> 
          <h1>Admin Dashboard</h1> 
        </div> 
        <div className="charts-container"> 
          <h2 id="users">All users</h2> 
          <hr className="separator" /> 
          <div className="map-section"> 
            <div className="children-container"> 
              {pages.map((page, index) => (
                page.map((user, index) => ( 
                  <div className="child-card" key={index}> 
                    <div className="toggle-button"> 
                      <label className="switch"> 
                        <input 
                          type="checkbox" 
                          checked={user.enabled} 
                          onChange={() => toggleUserStatus(user.username, user.enabled)} 
                        /> 
                        <span className="slider round"></span> 
                      </label> 
                    </div> 
                    <p className="user-label">Username:</p> 
                    <p>{user.username}</p> 
                    <p className="user-label">Registration Date:</p> 
                    <p>{user.dateTime.slice(0, 10)}</p> 
                    <p>{user.dateTime.slice(11, 19)}</p> 
                  </div> 
              ))))} 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
}; 
 
export default AdminDashboard;
