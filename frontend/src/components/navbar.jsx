import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

import { useNavigate } from "react-router-dom";
import ProfileHover from "./userProfile";

const Header = () => {


  return (
    <div>
      <header className=" text-gray-800 font-bold pt-3 flex flex-col items-center ">
        <h1 className="text-4xl font-bold  mb-4">
          <Link to={"/home"}>Task Tracker </Link>{" "}
        </h1>
        <div className="space-x-8">
          {/* see the tasks */}

          <button className="relative cursor-pointer inline-block px-6 py-2 font-bold text-white group">
            <Link to="/home/get-tasks">
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-blue-500 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg blur-sm"></span>
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform bg-blue-600 rounded-lg group-hover:scale-105 group-hover:blur-sm"></span>
              <span className="relative">See all task</span>
            </Link>
          </button>
          {/* logout */}
        
          {/* add task */}
          <button className="relative cursor-pointer inline-block px-6 py-2 font-bold text-white group">
            <Link to="/home/create-task">
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-green-500 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg blur-sm"></span>
              <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform bg-green-600 rounded-lg group-hover:scale-105 group-hover:blur-sm"></span>
              <span className="relative">Add task</span>
            </Link>
          </button>
        </div>
      </header>
      <div className="absolute right-5 top-5">
        <ProfileHover />
      </div>
    </div>
  );
};

export default Header;
