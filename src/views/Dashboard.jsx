import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync } from '../redux/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    try {
      dispatch(logoutAsync(token));
      window.location.reload();
    } catch (error) {
      // Handle error if needed
    }
  };

  return (
    <div>
      <h1>DASHBOARD</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
