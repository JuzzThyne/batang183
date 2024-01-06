// Dashboard.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import EditUser from "./EditUser";
import UserCard from "../reusable-components/UserCard";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { users, isLoading, currentPage, totalPages } = useSelector(
    (state) => state.user
  );
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
          <div className="flex py-2 pb-10">
            <input
              type="text"
              className="border w-full border-teal-400 rounded-full px-4 py-2 md:py-4 text-lg"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow">
            {isLoading && <div className="text-center">Loading...</div>}
            {!isLoading && (users === null || users.length === 0) && (
              <div className="text-center">No Data Found</div>
            )}
            {!isLoading && users && (
              <div className="grid grid-cols-1">
                {users.map((user) => (
                  <UserCard
                    key={user._id}
                    fullname={`${user.first_name} ${user.middle_name} ${user.last_name}`}
                    address={user.address}
                    gender={user.gender}
                    precinctNumber={user.precinct_number}
                    onViewClick={() => handleEdit(user._id)}
                    onDelete={() => handleDelete(user._id)}
                  />
                ))}
              </div>
            )}
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
              <span className="mr-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded-md"
                disabled={currentPage === 1}
                onClick={() =>
                  dispatch(
                    fetchUsers({ searchTerm, token, page: currentPage - 1 })
                  )
                }
              >
                Previous
              </button>
              <button
                className="px-2 py-1 ml-2 bg-blue-500 text-white rounded-md"
                disabled={currentPage === totalPages}
                onClick={() =>
                  dispatch(
                    fetchUsers({ searchTerm, token, page: currentPage + 1 })
                  )
                }
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
