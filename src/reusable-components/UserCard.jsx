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
    <>
    <div className="w-full border-t-slate-500 border">

    </div>
    <div className="flex gap-1 md:gap-8 h-20 md:h-40 justify-between border-b-slate-500 border border-l-0 border-r-0 items-center">
      <div className="flex justify-center items-center">
        <img
          src={profileImageUrl || defaultPhoto}
          alt="Profile"
          className="w-8 h-8 md:w-16 md:h-16 rounded-full m-2"
        />
      </div>
      <div className="w-full py-1 md:py-2">
        <p className="text-[14px] md:text-5xl">{fullname}</p>
        <div className="flex flex-col">
          <div className="flex gap-2 justify-start items-center">
            <img src={eye} alt="" className="w-[11px] h-[11px]" />
            <p className="text-[11px] md:text-xl">{address}</p>
          </div>
          <div className="flex gap-8">
            <div className="flex gap-2 justify-start items-center">
              <img src={eye} alt="" className="w-[11px] h-[11px]" />
              <p className="text-[11px] md:text-xl">{gender}</p>
            </div>
            <div className="flex gap-2 justify-start items-center">
              <img src={eye} alt="" className="w-[11px] h-[11px]" />
              <p className="text-[11px] md:text-xl">{precinctNumber}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <button className="h-full" onClick={onViewClick}>
          <img src={eye} alt="" className="w-[50px]" />
        </button>
      </div>
    </div>
    </>
    
  );
};

export default UserCard;
