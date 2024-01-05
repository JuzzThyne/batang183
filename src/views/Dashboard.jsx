import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/userSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
      // Using the token from the auth slice
      useEffect(() => {
        dispatch(fetchUsers(token));
    }, [dispatch, token]);
    const users = useSelector((state) => state.user.users);
    const error = useSelector((state) => state.user.error);
    const isLoading = useSelector((state) => state.user.loading);
  // const users = [
  //   { id: 1, name: 'User 1', address: 'yes', contact: '09123123231', precintNo: 'B-12334' },
  //   { id: 2, name: 'User 2', address: 'yes', contact: '09123123231', precintNo: 'B-12334' },
  // ];

  return (
    <>
      <header className="bg-blue-500 text-white rounded-md py-4">
        <div className="container mx-auto flex items-center justify-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto">
        <div className="bg-white p-4 md:p-8">
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-100 border rounded overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 border">Fullname</th>
                  <th className="py-2 px-4 border">Address</th>
                  <th className="py-2 px-4 border">Contact</th>
                  <th className="py-2 px-4 border">Precint No</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  isLoading && <p>Loading ...</p>
                }
                 {
                 error && <p>Error: {error}</p>
                 }
                {users && users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border">{`${user.first_name} ${user.middle_name} ${user.last_name}`}</td>
                    <td className="py-2 px-4 border">{user.address}</td>
                    <td className="py-2 px-4 border">{user.contact}</td>
                    <td className="py-2 px-4 border">{user.precinct_number}</td>
                    <td className="py-2 px-4 border flex items-center justify-center h-full">
                      <button className="mr-2 text-blue-500 hover:underline focus:outline-none w-full h-48 md:max-h-24">Edit</button>
                      <button className="text-red-500 hover:underline focus:outline-none w-full h-48 md:max-h-24">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
