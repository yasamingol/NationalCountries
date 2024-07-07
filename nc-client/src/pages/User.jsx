import React, { useState, useEffect } from 'react';  
import '../styles/dashboard.css';  
import { useNavigate } from 'react-router-dom';  
import { fetchWithAuth } from '../lib/authfetch';  
import { toast } from 'react-hot-toast'; 
 
const UserDashboard = () => {  
  const [nempty, setNempty] = useState(false); 
  const [pages, setPages] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1); 
  const [tokensPerPage] = useState(4); 
  const navigate = useNavigate();  
 
  const [formDetails, setFormDetails] = useState({ 
      name: "", 
      expirationDate: "" 
  }); 
 
  const inputChange = (e) => { 
      const { name, value } = e.target; 
      setFormDetails({ 
          ...formDetails, 
          [name]: value, 
      }); 
  }; 
 
  const formSubmit = async (e) => { 
      e.preventDefault(); 
      if (nempty) return; 
 
      const { name, expirationDate } = formDetails; 
      if (!name || !expirationDate) { 
          toast.error("Please fill all the fields"); 
          return; 
      } 

      if (new Date(expirationDate) < new Date()) { 
          toast.error("Expiration date must be in the future"); 
          return; 
      }
 
      const tokenData = { 
          name: name, 
          expirationDate: expirationDate, 
      }; 
 
      try { 
          console.log(tokenData); 
          await toast.promise( 
              fetchWithAuth(import.meta.env.VITE_SERVER_DOMAIN + 'user/api-tokens', { 
                  method: 'POST', 
                  body: JSON.stringify(tokenData), 
                  headers: { 
                      'Content-Type': 'application/json' 
                  } 
              }), 
              { 
                  pending: "Creating token...", 
                  success: "Token created successfully", 
                  error: "Error occurred", 
              } 
          ); 
          fetchTokens(); 
      } catch (error) { 
          console.log(error) 
          toast.error("Internal server error"); 
      } 
  }; 
 
  const handleLogout = async () => {  
      toast.success('Logged out...'); 
      console.log('logout successful');  
      navigate('/login/');  
  };  
 
  const fetchTokens = () => {  
      fetchWithAuth(import.meta.env.VITE_SERVER_DOMAIN + 'user/api-tokens', {  
          method: 'GET',  
      })  
      .then(response => response.json())  
      .then(data => {  
          console.log(data);  
          setPages(data['tokens']);  
      })  
      .catch((error) => {  
          console.error('Error:', error);  
      });  
  }; 
 
  const deleteToken = (token) => { 
      fetch(import.meta.env.VITE_SERVER_DOMAIN + 'user/api-tokens', { 
          method: 'DELETE', 
          headers: {
            'Authorization': `API ${token}`
            },
      }) 
      .then(response => response.json()) 
      .then(data => { 
          console.log('Token deleted:', data); 
          fetchTokens(); 
      }) 
      .catch((error) => { 
          console.error('Error:', error); 
      }); 
  }; 
 
  useEffect(() => {  
      fetchTokens();  
  }, []);  
 
  const indexOfLastToken = currentPage * tokensPerPage; 
  const indexOfFirstToken = indexOfLastToken - tokensPerPage; 
  const currentTokens = pages.slice(indexOfFirstToken, indexOfLastToken); 
 
  const paginate = (pageNumber) => setCurrentPage(pageNumber); 
 
  return (
      <div className="dashboard-container">  
          <div className="dashboard-sidebar">  
              <ul>  
                  <li><a href="#tokens">All Tokens</a></li> 
                  <li><a href="#new-token">Create new token</a></li>  
                  <li><a href="#" onClick={handleLogout}>Logout</a></li>  
              </ul>  
          </div>  
          <div className="dashboard-main">  
              <div className="dashboard-header">  
                  <h1>User Dashboard</h1>  
              </div>  
              <div className="charts-container">  
                  <h2 id="tokens">All Tokens</h2>  
                  <hr className="separator" />  
                  <div className="map-section">  
                      <div className="children-container">  
                          {currentTokens.map((tokens, index) => (
                                tokens.map((token, index) => (
                              <div className="child-card"
                              key={index}>  
                                  <p className="user-label">Name:</p>  
                                  <p>{token.name}</p>  
                                  <p className="user-label">Expiration Date:</p>  
                                    <p>{token.expirationDate.slice(0, 10)}</p> 
                                    <p>{token.expirationDate.slice(11, 19)}</p> 
                                    <p className="user-label">Value:</p>  
                                  <p>{"API ***"}</p>
                                  <button  
                                      className="delete-btn"  
                                      onClick={() => deleteToken(token.token)} 
                                  > 
                                      Delete 
                                  </button> 
                              </div>  
                          ))))}
                      </div>  
                  </div>  
                  <div className="pagination"> 
                      {[...Array(Math.ceil(pages.length / tokensPerPage)).keys()].map(number => ( 
                          <button key={number} onClick={() => paginate(number + 1)}> 
                              {number + 1} 
                          </button> 
                      ))} 
                  </div> 
                  <h2 id="new-token">Create new token</h2>  
                  <hr className="separator" />  
                  <div className="map-section">  
                          <div className="child-card"> 
                              <form onSubmit={formSubmit} className="login-form"> 
                                  <div className="form-row"> 
                                      <div className="form-group"> 
                                          <label>Token Name <span className="required">*</span></label> 
                                          <input 
                                              type="text" 
                                              name="name" 
                                              className="form-input" 
                                              placeholder="e.g. My Token Name" 
                                              value={formDetails.name} 
                                              onChange={inputChange} 
                                          /> 
 
                                          <label>Expiration Date <span className="required">*</span></label> 
                                          <input 
                                              type="date" 
                                              name="expirationDate" 
                                              className="form-input" 
                                              value={formDetails.expirationDate} 
                                              onChange={inputChange} 
                                          /> 
 
                                          <button 
                                              type="submit" 
                                              className="btn form-btn" 
                                              disabled={nempty} 
                                          > 
                                              Submit 
                                          </button> 
                                      </div> 
                                  </div> 
                              </form> 
                      </div>  
                  </div>  
              </div>  
          </div>  
      </div> 
  );  
};  
 
export default UserDashboard; 