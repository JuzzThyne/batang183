import React, { useState } from "react";
import closeButton from "../assets/x-square.svg";
import { useDispatch, useSelector } from "react-redux";
import { addSingleUser } from "../redux/userSlice";
import AlertComponent from "../reusable-components/AlertComponent";

const AddUser = ({ onClose }) => {

    const [isAlertVisible, setIsAlertVisible] = useState(false); // New state for alert visibility
    
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const { isLoading, error } = useSelector((state) => state.user);

    const initialFormData = {
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "",
        address: "",
        contact: "",
        precinct_number: "",
      };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    dispatch(addSingleUser({ formData, token }));
    setFormData(initialFormData);
    setIsAlertVisible(true);
  };
  const closeAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
        <div className="bg-white p-4 md:p-8 z-10 rounded-lg w-3/4 md:w-1/4">
          <div className="flex justify-end p-1">
            <button onClick={onClose}>
              <img src={closeButton} alt="" className="w-8 h-8" />
            </button>
          </div>
          {
            isLoading && <p>Loading ... </p>
          }
          {error && (
          <AlertComponent
            alertData={error}
            isVisible={isAlertVisible}
            onClose={closeAlert}
            color="green"
          />
            )}
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="border-green-400 border rounded-md px-2"
              value={formData.first_name}
              onChange={handleChange}
            />
            <label htmlFor="middlename">Middlename</label>
            <input
              type="text"
              id="middle_name"
              name="middle_name"
              className="border-green-400 border rounded-md px-2"
              value={formData.middle_name}
              onChange={handleChange}
            />
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="border-green-400 border rounded-md px-2"
              value={formData.last_name}
              onChange={handleChange}
            />
            <label htmlFor="gender">Gender</label>
            <input
              type="text"
              id="gender"
              name="gender"
              className="border-green-400 border rounded-md px-2"
              value={formData.gender}
              onChange={handleChange}
            />
            <label htmlFor="address">Address</label>
            <textarea
              rows="3"
              name="address"
              className="border-green-400 border rounded-md px-2"
              value={formData.address}
              onChange={handleChange}
            />
            <label htmlFor="contact">Contact</label>
            <input
              type="number"
              id="contact"
              name="contact"
              className="border-green-400 border rounded-md px-2"
              value={formData.contact}
              onChange={handleChange}
            />
            <label htmlFor="precinct_no">Precinct No</label>
            <input
              type="text"
              id="precinct_number"
              name="precinct_number"
              className="border-green-400 border rounded-md px-2"
              value={formData.precinct_number}
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
