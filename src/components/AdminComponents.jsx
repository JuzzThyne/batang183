import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/authSlice.js';

const AdminComponents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const validated = useSelector((state) => state.auth.validated);

    useEffect(() => {
        // console.log('validated in useEffect:', validated);
        if (!validated) {
            // console.log(token)
            // console.log(admin)
            dispatch(getUser({ token }));
        }
      }, [token, validated, dispatch]);

    useEffect(() => {
        if (token && validated) {
            navigate("/");
        }
    }, [token,validated, navigate]);

    return (
        <div className='w-full h-screen bg-[#004643] flex justify-center items-center'>
            <Outlet />
        </div>
    );
}

export default AdminComponents;
