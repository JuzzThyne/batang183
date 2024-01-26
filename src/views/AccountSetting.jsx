import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import blob from "../assets/eggblob.png";
import lob from "../assets/blob.png";

const AccountSetting = () => {
  const navigate = useNavigate();
  const [choice, setChoice] = useState(false);
  const [title, setTitle] = useState("");

  const handleAddPrecinctNumber = () => {
    setTitle("Add Precint Number");
    setChoice(true);
    navigate("account/add-precinct-number");
  };
  const handleAccount = () => {
    setTitle("Edit Account");
    setChoice(true);
    navigate("account/edit-account");
  };
  const handleAddAdmin = () => {
    setTitle("Add Admin");
    setChoice(true);
    navigate("account/add-admin");
  };

  const handleBack = () => {
    setChoice(false);
  };
  return (
    <>
      <div className="flex flex-col">
        {choice ? (
          <div>
            <div className="flex justify-between px-2 gap-2">
              <div className="w-full bg-green-300 flex justify-center items-center rounded-md">
                {title}
              </div>
              <button
                className="p-2 bg-green-100 rounded-lg"
                onClick={handleBack}
              >
                Back
              </button>
            </div>
            <div className="bg-slate-200 m-2 shadow-md rounded-sm">
              <Outlet />
            </div>
          </div>
        ) : (
          <div className="flex p-2 gap-2 flex-wrap justify-center">
            <div
              onClick={handleAddPrecinctNumber}
              className="relative "
            >
              <img src={lob} alt="" className="w-80 glow-static hover:glow-hover" />
              <label
                htmlFor=""
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-black text-2xl uppercase pointer-events-none"
              >
                Add Precinct Number
              </label>
            </div>
            <div
              onClick={handleAccount}
              className="relative "
            >
              <img src={lob} alt="" className="w-80 glow-static hover:glow-hover" />
              <label
                htmlFor=""
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-black text-2xl uppercase pointer-events-none"
              >
                Account
              </label>
            </div>
            <div
              onClick={handleAddAdmin}
              className="relative "
            >
              <img src={lob} alt="" className="w-80 glow-static hover:glow-hover" />
              <label
                htmlFor=""
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-black text-2xl uppercase pointer-events-none"
              >
                Add Admin
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AccountSetting;
