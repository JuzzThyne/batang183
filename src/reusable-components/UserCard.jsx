import React from "react";
import eye from "../assets/eye.svg";
import defaultPhoto from '../assets/default.jpg';
import male from '../assets/male.png';
import female from '../assets/female.png';
import ballot from '../assets/ballot.gif';
import location from '../assets/location.gif';

const UserCard = ({
  fullname,
  address,
  gender,
  precinctNumber,
  profileImageUrl,
  onViewClick,
}) => {
  // Define the gender-specific icon
  const genderIcon = gender === 'male' ? male : female;

  return (
    <>
    <div className="flex gap-1 md:gap-8 h-20 md:h-40 justify-between border-t-slate-500 border border-b-0 border-l-0 border-r-0 items-center">
      <div className="flex justify-center items-center">
        <img
          src={profileImageUrl || defaultPhoto}
          alt="Profile"
          className="w-8 h-8 md:w-16 md:h-16 rounded-full m-2"
        />
      </div>
      <div className="w-full py-1 md:py-2">
        <p className="text-[14px] md:text-4xl font-semibold text-green-400">{fullname}</p>
        <div className="flex flex-col">
          <div className="flex gap-2 justify-start items-center">
            <img src={location} alt="" className="w-[11px] h-[11px] md:w-[20px] md:h-[20px]" />
            <p className="text-[11px] md:text-xl">{address}</p>
          </div>
          <div className="flex gap-8">
            <div className="flex gap-2 justify-start items-center">
              <img src={genderIcon} alt="" className="w-[11px] h-[11px] md:w-[20px] md:h-[20px]" />
              <p className="text-[11px] md:text-xl">{gender}</p>
            </div>
            <div className="flex gap-2 justify-start items-center">
              <img src={ballot} alt="" className="w-[11px] h-[11px] md:w-[20px] md:h-[20px]" />
              <p className="text-[11px] md:text-xl">{precinctNumber}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <button className="h-full" onClick={onViewClick}>
          <img src={eye} alt="" className="w-[40px] md:w-[50px]" />
        </button>
      </div>
    </div>
    </>
    
  );
};

export default UserCard;
