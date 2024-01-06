import React from "react";
import eye from "../assets/eye.svg";
import mapPin from "../assets/map-pin.svg";
import user from "../assets/user.svg";
import tag from "../assets/tag.svg";
import defaultPhoto from '../assets/default.jpg';

const UserCard = ({
  fullname,
  address,
  gender,
  precinctNumber,
  profileImageUrl,
  onViewClick,
}) => {
  return (
    <div className="flex h-auto justify-between overflow-hidden rounded-xl bg-green-300 shadow-xl transition duration-300 hover:scale-105">
      <div className="w-1/4 flex justify-center items-center m-2">
        <img
          src={profileImageUrl || defaultPhoto} // Placeholder image URL
          alt="Profile"
          className="w-20 h-20 md:w-40 md:h-40 rounded-full"
        />
      </div>
      <div className="flex flex-col w-3/4 justify-center md:px-1">
        <p className="text-2xl md:text-5xl py-4 md:py-2 text-red-600 font-bold overflow-ellipsis">
          {fullname}
        </p>
        <div className="flex flex-col">
          <div className="flex gap-2 justify-start items-center">
            <img src={mapPin} alt="" className="" />
            <p className="text-xs md:text-lg overflow-hidden">{address}</p>
          </div>
          <div className="flex gap-2 justify-start items-center">
            <img src={user} alt="" />
            <p className="text-xs md:text-lg overflow-hidden">{gender}</p>
          </div>
          <div className="flex gap-2 justify-start items-center">
            <img src={tag} alt="" />
            <p className="text-xs md:text-lg overflow-hidden">{precinctNumber}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-40 items-center">
        <button
          onClick={onViewClick}
          className="w-full text-2xl flex justify-center transform hover:scale-110 transition duration-300 item"
        >
          <img src={eye} alt="" className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

export default UserCard;
