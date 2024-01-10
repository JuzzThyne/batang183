import React from "react";

const UserForm = ({ user, isEditMode, onInputChange }) => {
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
          {/* Add options for precinct numbers here */}
          <option value="1583-A">1583-A</option>
          <option value="1583-B">1583-B</option>
          {/* Add more options as needed */}
        </select>
      )}
    </form>
  );
};

export default UserForm;
