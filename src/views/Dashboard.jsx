import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync } from '../redux/authSlice.js';

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);

  const handleLogout = () => {
    try {
      dispatch(logoutAsync(token));
      sessionStorage.removeItem('SecretToken');
      window.location.reload();
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <div>
      <p>{error}</p>
      <h1>DASHBOARD</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
