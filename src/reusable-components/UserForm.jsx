import React, { useEffect } from "react";
import { getPrecinct } from "../redux/precinctSlice.js";
import { useDispatch, useSelector } from "react-redux";

const UserForm = ({ user, isEditMode, onInputChange }) => {
  const dispatch = useDispatch();

  const precinctOptions = [
    { value: "1583-A", label: "1583-A" },
    { value: "1583-B", label: "1583-B" },
    { value: "1583-C", label: "1583-C" },
    { value: "1584-A", label: "1584-A" },
    { value: "1584-B", label: "1584-B" },
    { value: "1585-A", label: "1585-A" },
    { value: "1586-A", label: "1586-A" },
    { value: "1586-B", label: "1586-B" },
    { value: "1587-A", label: "1587-A" },
    { value: "1587-B", label: "1587-B" },
    { value: "1588-A", label: "1588-A" },
    { value: "1588-B", label: "1588-B" },
    { value: "1589-A", label: "1589-A" },
    { value: "1589-B", label: "1589-B" },
    { value: "1589-C", label: "1589-C" },
    { value: "1589-P1", label: "1589-P1" },
  ];

  const skPrecinctOptions = [
    { value: "SK1583A", label: "SK1583A" },
    { value: "SK1583B", label: "SK1583B" },
    { value: "SK1583C", label: "SK1583C" },
    { value: "SK1584A", label: "SK1584A" },
    { value: "SK1584B", label: "SK1584B" },
    { value: "SK1585A", label: "SK1585A" },
    { value: "SK1585B", label: "SK1585B" },
    { value: "SK1586A", label: "SK1586A" },
    { value: "SK1586B", label: "SK1586B" },
    { value: "SK1587A", label: "SK1587A" },
    { value: "SK1587B", label: "SK1587B" },
    { value: "SK1588A", label: "SK1588A" },
    { value: "SK1588B", label: "SK1588B" },
    { value: "SK1589A", label: "SK1589A" },
    { value: "SK1589B", label: "SK1589B" },
    { value: "SK1589C", label: "SK1589C" },
    { value: "SK1589P1", label: "SK1589P1" },
  ];

  const formatDate = (dateString) => {
    if (!dateString) {
      return ""; // Handle cases where dateString is empty or undefined
    }

    const date = new Date(dateString);

    // Ensure that the date is valid
    if (isNaN(date.getTime())) {
      return ""; // Return empty string for invalid dates
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };
  
  useEffect(() => {
    // Check if user.precinct_type has changed before dispatching the action
    if (user.precinct_type) {
      dispatch(getPrecinct(user.precinct_type));
    }
  }, [user.precinct_type]); // Include user.precinct_type in the dependency array

  const list = useSelector((state) => state.precinct.list);
  console.log(user.precinct_type);

  return (
    <form action="" className="flex flex-col">
      <label htmlFor="firstname">Firstname</label>
      <input
        type="text"
        id="first_name"
        name="first_name"
        className="border-green-400 border rounded-md px-2"
        value={user.first_name}
        disabled={!isEditMode}
        onChange={onInputChange}
      />
      <label htmlFor="middlename">Middlename</label>
      <input
        type="text"
        id="middle_name"
        name="middle_name"
        className="border-green-400 border rounded-md px-2"
        value={user.middle_name}
        disabled={!isEditMode}
        onChange={onInputChange}
      />
      <label htmlFor="lastname">Lastname</label>
      <input
        type="text"
        id="last_name"
        name="last_name"
        className="border-green-400 border rounded-md px-2"
        value={user.last_name}
        disabled={!isEditMode}
        onChange={onInputChange}
      />
      <label>Gender</label>
      <div className="flex gap-3">
        <label className="flex gap-1">
          <input
            type="radio"
            name="gender"
            value="male"
            checked={user.gender === "male"}
            disabled={!isEditMode}
            onChange={onInputChange}
          />
          Male
        </label>
        <label className="flex gap-1">
          <input
            type="radio"
            name="gender"
            value="female"
            checked={user.gender === "female"}
            disabled={!isEditMode}
            onChange={onInputChange}
          />
          Female
        </label>
      </div>
      <label htmlFor="birthday">Birthday</label>
      <input
        type="date"
        id="birthdate"
        name="birthdate"
        className="border-green-400 border rounded-md px-2"
        value={formatDate(user.birthdate)}
        disabled={!isEditMode}
        onChange={onInputChange}
      />
      <label htmlFor="address">Address</label>
      <textarea
        rows="3"
        name="address"
        className="border-green-400 border rounded-md px-2"
        value={user.address}
        disabled={!isEditMode}
        onChange={onInputChange}
      />
      <label htmlFor="contact">Contact</label>
      <input
        type="number"
        id="contact"
        name="contact"
        className="border-green-400 border rounded-md px-2"
        value={user.contact}
        disabled={!isEditMode}
        onChange={onInputChange}
      />
      {!isEditMode ? (
        <label htmlFor="precinct_no">Precinct No</label>
      ) : (
        <label htmlFor="precinct_no">Precinct No</label>
      )}
      {!isEditMode ? (
        <input
          type="text"
          id="precinct_number"
          name="precinct_number"
          className="border-green-400 border rounded-md px-2"
          value={user.precinct_number}
          disabled={!isEditMode}
          onChange={onInputChange}
        />
      ) : (
        <select
          id="precinct_number"
          name="precinct_number"
          className="border-green-400 border rounded-md px-2"
          value={user.precinct_number}
          onChange={onInputChange}
        >
          <option value="" defaultValue className="bg-slate-300">
            Select Precinct No
          </option>
          {list &&
                list.map((option) => (
                  <option key={option._id} value={option.precinct_number}>
                    {option.precinct_number}
                  </option>
                ))}
        </select>
      )}
    </form>
  );
};

export default UserForm;
