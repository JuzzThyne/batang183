import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../redux/authSlice';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Dispatch the clearToken action when the user logs out
    dispatch(clearToken());
  };

  return <div>
    <h1>DASHBOARD</h1>
    <button onClick={handleLogout}>Logout</button>
  </div>;
};

export default Dashboard;
