import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSingleUser,
  getSingleUser,
  updateSingleUser,
} from "../redux/userSlice";
import UserForm from "../reusable-components/UserForm";
import AlertComponent from "../reusable-components/AlertComponent";
import closeButton from "../assets/x-square.svg";

const EditUser = ({ selectedUserId, handleCloseModal }) => {
  const [isAlertVisible, setIsAlertVisible] = useState(false); // New state for alert visibility

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getSingleUser({ userId: selectedUserId, token: token }));
  }, [dispatch, selectedUserId, token]);

  const { singleUser, isLoading, error } = useSelector((state) => state.user);

  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    address: "",
    contact: "",
    precinct_number: "",
  });

  useEffect(() => {
    if (singleUser) {
      setFormData({
        first_name: singleUser.first_name || "",
        middle_name: singleUser.middle_name || "",
        last_name: singleUser.last_name || "",
        gender: singleUser.gender || "",
        address: singleUser.address || "",
        contact: singleUser.contact || "",
        precinct_number: singleUser.precinct_number || "",
      });
    }
  }, [singleUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveClick = () => {
    const confirmSave = window.confirm(
      "Are you sure you want to save this data?"
    );
    if (confirmSave) {
      // Use the current formData state
      dispatch(updateSingleUser({ userId: selectedUserId, formData, token }));
      setIsEditMode(false);
      setIsAlertVisible(true);
    }
  };

  const closeAlert = () => {
    setIsAlertVisible(false);
  };

  const handleDeleteClick = () => {
    const confirmSave = window.confirm(
      "Are you sure you want to delete this data?"
    );
    if (confirmSave) {
      // Use the current formData state
      dispatch(deleteSingleUser({ userId: selectedUserId, token }));
      setIsAlertVisible(true);
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white p-4 md:p-8 z-10 rounded-lg w-3/4 md:w-1/4">
        <div className="flex justify-end p-1">
          <button onClick={handleCloseModal}>
            <img src={closeButton} alt="" className="w-8 h-8" />
          </button>
        </div>

        {error && (
          <AlertComponent
            alertData={error}
            isVisible={isAlertVisible}
            onClose={closeAlert}
            color="green"
          />
        )}
        {isLoading && <p>Loading ... </p>}
        {!isLoading && singleUser && (
          <div className="grid grid-cols-1">
            <UserForm
              user={formData}
              isEditMode={isEditMode}
              onInputChange={handleInputChange}
            />
          </div>
        )}
        <div className="flex pt-4 gap-2 justify-between">
          {!isEditMode && (
            <button
              className="bg-green-400 rounded-md px-4 py-2"
              onClick={handleEditClick}
            >
              Edit
            </button>
          )}
          {isEditMode && (
            <button
              className="bg-green-400 rounded-md px-4 py-2"
              onClick={handleSaveClick}
            >
              Save
            </button>
          )}
          <button
            className="bg-red-400 rounded-md px-4 py-2"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
