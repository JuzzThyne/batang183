// EditModal.jsx
import React from "react";

const EditUser = ({ selectedUserId, handleCloseModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white p-4 md:p-8 z-10 rounded-lg w-3/4">
        {/* Your modal content here */}
        <p>Edit User with ID: {selectedUserId}</p>
        <button onClick={handleCloseModal}>Close Modal</button>
      </div>
    </div>
  );
};

export default EditUser;
