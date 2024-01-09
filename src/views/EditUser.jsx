import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../redux/userSlice";

const UserForm = ({  user, isEditMode, onInputChange }) => {
  return (
    <form action="" className="flex flex-col">
      <label htmlFor="firstname">Firstname</label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        className="border-green-400 border rounded-md px-2"
        value={user.firstname}
        disabled={!isEditMode}
        onChange={onInputChange}
      />
      <label htmlFor="middlename">Middlename</label>
      <input
        type="text"
        id="middlename"
        name="middlename"
        className="border-green-400 border rounded-md px-2"
        value={user.middlename}
        disabled={!isEditMode}
        onChange={onInputChange}
      />
      <label htmlFor="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        className="border-green-400 border rounded-md px-2"
        value={user.lastname}
        disabled={!isEditMode}
        onChange={onInputChange}
      />
      <label htmlFor="gender">Gender</label>
      <input
        type="text"
        id="gender"
        name="gender"
        className="border-green-400 border rounded-md px-2"
        value={user.gender}
        disabled={!isEditMode}
        onChange={onInputChange}
      />
      <label htmlFor="address">Address</label>
      <textarea
        rows='3'
        name="address"
        className="border-green-400 border rounded-md px-2"
        value={user.address}
        disabled={!isEditMode}
        onChange={onInputChange}
      />
      <label htmlFor="contact">Contact</label>
      <input
        type="text"
        id="contact"
        name="contact"
        className="border-green-400 border rounded-md px-2"
        value={user.contact}
        disabled={!isEditMode}
        onChange={onInputChange}
      />
      <label htmlFor="precinct_no">Precinct No</label>
      <input
        type="text"
        id="precinct_no"
        name="precinct_no"
        className="border-green-400 border rounded-md px-2"
        value={user.precinctNo}
        disabled={!isEditMode}
        onChange={onInputChange}
      />
    </form>
  );
};

const EditUser = ({ selectedUserId, handleCloseModal }) => {
  const dispatch = useDispatch();
  
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getSingleUser({ userId: selectedUserId, token: token }));
  }, [dispatch, selectedUserId, token]);

  
  const { singleUser, isLoading } = useSelector(
    (state) => state.user
  );

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    const confirmSave = window.confirm("Are you sure you want to save the data?");
    if (confirmSave) {
      // Perform save operation or call the save function
      setIsEditMode(false);
    }
  };

  const [formData, setFormData] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    address: "",
    contact: "",
    precinctNo: "",
  });

  useEffect(() => {
    if (singleUser) {
      setFormData({
        firstname: singleUser.first_name || "", // Provide default value if it's undefined
        middlename: singleUser.middle_name || "",
        lastname: singleUser.last_name || "",
        gender: singleUser.gender || "",
        address: singleUser.address || "",
        contact: singleUser.contact || "",
        precinctNo: singleUser.precinct_number || "",
      });
    }
  }, [singleUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white p-4 md:p-8 z-10 rounded-lg w-3/4">
        <button onClick={handleCloseModal}>Close Modal</button>
        {isLoading && <p>Loading ... </p>}
        {!isLoading && singleUser && (
      <div className="grid grid-cols-1">
      <UserForm user={formData} isEditMode={isEditMode} onInputChange={handleInputChange} />
  </div>
)}
        <div className="flex pt-4 gap-2 justify-between">
          {!isEditMode && <button className="bg-green-400 rounded-md px-4 py-2" onClick={handleEditClick}>Edit</button>}
          {isEditMode && <button className="bg-green-400 rounded-md px-4 py-2" onClick={handleSaveClick}>Save</button>}
          <button className="bg-red-400 rounded-md px-4 py-2">Delete</button>
          
        </div>
      </div>
    </div>
  );
};

export default EditUser;
