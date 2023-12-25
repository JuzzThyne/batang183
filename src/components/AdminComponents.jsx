import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const AdminComponents = () => {
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    return (
        <div className='w-full h-screen bg-[#004643] flex justify-center items-center'>
            <Outlet />
        </div>
    );
}

export default AdminComponents;
