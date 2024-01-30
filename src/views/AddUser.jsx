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

  const [emptyFields, setEmptyFields] = useState([]); // Updated state to track empty fields

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
    // Clear the emptyFields state when the user starts typing in any field
    setEmptyFields([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addSingleUser({ formData, token }));
    setIsAlertVisible(true);

    const newEmptyFields = [];

    // Check if any field is empty
    for (const key in formData) {
      if (formData[key] === "") {
        newEmptyFields.push(key);
      }
    }

    if (newEmptyFields.includes("gender") && formData["gender"] === "") {
      newEmptyFields.push("gender");
    }

    // If any field is empty, update the emptyFields state
    if (newEmptyFields.length > 0) {
      setEmptyFields(newEmptyFields);
      return;
    }

    // If all fields are not empty, proceed to dispatch
    console.log("Form submitted:", formData);
    setFormData(initialFormData);
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
          {isLoading && <p>Loading ... </p>}
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
              className={`border-green-400 border rounded-md px-2 ${
                emptyFields.includes("first_name") ? "border-red-400" : ""
              }`}
              value={formData.first_name}
              onChange={handleChange}
            />
            <label htmlFor="middlename">Middlename</label>
            <input
              type="text"
              id="middle_name"
              name="middle_name"
              className={`border-green-400 border rounded-md px-2 ${
                emptyFields.includes("middle_name") ? "border-red-400" : ""
              }`}
              value={formData.middle_name}
              onChange={handleChange}
            />
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className={`border-green-400 border rounded-md px-2 ${
                emptyFields.includes("last_name") ? "border-red-400" : ""
              }`}
              value={formData.last_name}
              onChange={handleChange}
            />
            <label htmlFor="gender">Gender</label>
            <div className="flex gap-3">
              <label
                className={`flex gap-1 ${
                  emptyFields.includes("gender") ? "text-red-400" : ""
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label
                className={`flex gap-1 ${
                  emptyFields.includes("gender") ? "text-red-400" : ""
                }`}
              >
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
            <label htmlFor="address">Address</label>
            <textarea
              rows="3"
              name="address"
              className={`border-green-400 border rounded-md px-2 ${
                emptyFields.includes("address") ? "border-red-400" : ""
              }`}
              value={formData.address}
              onChange={handleChange}
            />
            <label htmlFor="contact">Contact</label>
            <input
              type="number"
              id="contact"
              name="contact"
              className={`border-green-400 border rounded-md px-2 ${
                emptyFields.includes("contact") ? "border-red-400" : ""
              }`}
              value={formData.contact}
              onChange={handleChange}
            />
            <label htmlFor="precinct_no">Precinct No</label>
            <select
              id="precinct_number"
              name="precinct_number"
              className={`border-green-400 border rounded-md px-2 ${
                emptyFields.includes("precinct_number") ? "border-red-400" : ""
              }`}
              value={formData.precinct_number}
              onChange={handleChange}
            >
              {/* Add options for precinct numbers here */}
              <option value="" disabled defaultValue>
                Select Precinct No
              </option>
              <option value="1583-A">1583-A</option>
              <option value="1583-B">1583-B</option>
              {/* Add more options as needed */}
            </select>
            <div className="pt-2 flex">
              <button
                type="submit"
                className="bg-green-400 mx-auto px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddUser;
