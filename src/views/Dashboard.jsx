// Dashboard.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import EditUser from "./EditUser";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { users, isLoading, currentPage, totalPages } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers({ searchTerm, token }));
  }, [dispatch, searchTerm, token]);

  const handleEdit = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(false);
  };

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
          <div className="flex py-2 ">
            <input
              type="text"
              className="border w-full"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

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
                {isLoading && (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Loading...
                    </td>
                  </tr>
                )}
                {!isLoading && (users === null || users.length === 0) && (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No Data Found
                    </td>
                  </tr>
                )}
                {users &&
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border">{`${user.first_name} ${user.middle_name} ${user.last_name}`}</td>
                      <td className="py-2 px-4 border">{user.address}</td>
                      <td className="py-2 px-4 border">{user.contact}</td>
                      <td className="py-2 px-4 border">
                        {user.precinct_number}
                      </td>
                      <td className="py-2 px-4 border">
                        <button
                          onClick={() => handleEdit(user._id)}
                          className="mr-2 text-blue-500 hover:underline focus:outline-none w-full"
                        >
                          Edit
                        </button>
                        <button className="text-red-500 hover:underline focus:outline-none w-full">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* Modal */}
            {isModalOpen && (
              <EditUser
                selectedUserId={selectedUserId}
                handleCloseModal={handleCloseModal}
              />
            )}
          </div>

          <div className="flex justify-between my-4">
            <div>
              <span className="mr-2">Page {currentPage} of {totalPages}</span>
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded-md"
                disabled={currentPage === 1}
                onClick={() => dispatch(fetchUsers({ searchTerm, token, page: currentPage - 1 }))}
              >
                Previous
              </button>
              <button
                className="px-2 py-1 ml-2 bg-blue-500 text-white rounded-md"
                disabled={currentPage === totalPages}
                onClick={() => dispatch(fetchUsers({ searchTerm, token, page: currentPage + 1 }))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
