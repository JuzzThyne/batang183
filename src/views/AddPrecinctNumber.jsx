import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Import the useDispatch hook
import { addPrecinct } from "../redux/precinctSlice.js";
import x from "../assets/x-square.svg";
import plus from "../assets/plus-circle.svg";

const AddPrecinctNumber = () => {
  const dispatch = useDispatch(); // Initialize the useDispatch hook

  const [users, setUsers] = useState([
    { category_type: "", precinct_number: "" },
  ]);
  const [error, setError] = useState(null); // State variable for holding errors

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedUsers = [...users];
    updatedUsers[index][name] = value;
    setUsers(updatedUsers);
  };

  const handleAddUser = () => {
    setUsers([...users, { category_type: "", precinct_number: "" }]);
  };

  const handleRemoveUser = (index) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isAnyPrecinctNumberEmpty = users.some((user) => user.precinct_number.trim() === "");

    if (isAnyPrecinctNumberEmpty) {
      setError("Precinct number cannot be empty. Please fill in all fields.");
      setTimeout(() => setError(null), 5000); // Clear error after 5 seconds (adjust as needed)
      return;
    }

    const isAnyFieldEmpty = users.some(
      (user) => user.category_type.trim() === "" || user.precinct_number.trim() === ""
    );

    if (isAnyFieldEmpty) {
      setError("Category type and precinct number cannot be empty. Please fill in all fields.");
      setTimeout(() => setError(null), 5000); // Clear error after 5 seconds (adjust as needed)
      return;
    }

    try {
      await dispatch(addPrecinct({ formData: users }));
      setError(null); // Reset error state if submission is successful
    } catch (error) {
      console.error("Error submitting precinct:", error.message);
      setError("Error submitting precinct. Please try again.");
      setTimeout(() => setError(null), 5000); // Clear error after 5 seconds (adjust as needed)
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="p-2 md:w-[40%] m-2">
          {/* Display error message if there is an error */}
          {error && (
            <div className="text-red-600 p-2 bg-red-100 border-red-500 border rounded-md m-2">
              {error}
            </div>
          )}
          {users.map((user, index) => (
            <>
              <div
                key={index}
                className="flex justify-between p-2 bg-green-100 m-2 border-green-500 border rounded-lg"
              >
                <div className="flex flex-col gap-2 w-full">
                  <select
                    name="category_type"
                    value={user.category_type}
                    onChange={(event) => handleInputChange(index, event)}
                    className="border-green-400 border rounded-md px-2"
                  >
                    <option value="">Select Category Type</option>
                    <option value="Barangay Level">Barangay Level</option>
                    <option value="SK Level">SK Level</option>
                  </select>
                  <input
                    type="text"
                    name="precinct_number"
                    placeholder="Precinct Number"
                    className="border-green-400 border rounded-md px-2"
                    value={user.precinct_number}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveUser(index)}
                  className="border-red p-2"
                >
                  <img src={x} alt="" className="w-8 h-8" />
                </button>
              </div>
            </>
          ))}
          <div className="flex flex-col gap-2 m-2">
            <button
              type="button"
              onClick={handleAddUser}
              className="m-auto border-blue-500 border py-2 px-2 rounded-full bg-blue-200 transition duration-300 hover:bg-green-500"
            >
              <img src={plus} alt="" className="w-8 h-8"/>
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="m-auto border-green-500 border py-1 px-2 rounded-lg bg-blue-200 transition duration-300 hover:bg-blue-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPrecinctNumber;
