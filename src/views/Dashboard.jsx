import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAsync } from '../redux/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const error = useSelector((state) => state.auth.error);
  const handleLogout = () => {
    try {
      dispatch(logoutAsync(token));
      navigate("/login"); // Change '/dashboard' to the desired route
    } catch (error) {
    }
  };
  return <div>
    {error}
    <h1>DASHBOARD</h1>
    <button onClick={handleLogout}>logout</button>
  </div>;
};

export default Dashboard;
