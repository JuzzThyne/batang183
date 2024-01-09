import React from 'react'

const UserForm = ({  user, isEditMode, onInputChange }) => {
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
          type="number"
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
          id="precinct_number"
          name="precinct_number"
          className="border-green-400 border rounded-md px-2"
          value={user.precinct_number}
          disabled={!isEditMode}
          onChange={onInputChange}
        />
      </form>
    );
  };

export default UserForm