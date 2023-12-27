import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync } from '../redux/authSlice.js';

const Dashboard = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);

  const handleLogout = async () => {
    try {
      await dispatch(logoutAsync(token));
      window.location.reload();
    } catch (error) {
      // Handle error if needed
      console.error("Logout failed:", error);
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
