import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";

import { useNavigate } from "react-router-dom";
import ProfileHover from "./userProfile";

const Header = () => {


  return (
    <div className="relative px-4 ">
    <header className="text-gray-800 font-bold pt-3 flex flex-col items-center text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">
        <Link to="/home">Task Tracker</Link>
      </h1>
  
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0 items-center">
        {/* See All Tasks Button */}
        <button className="relative cursor-pointer inline-block px-6 py-2 font-bold text-white group">
          <Link to="/home/get-tasks">
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-blue-500 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg blur-sm"></span>
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform bg-blue-600 rounded-lg group-hover:scale-105 group-hover:blur-sm"></span>
            <span className="relative">See all tasks</span>
          </Link>
        </button>
  
        {/* Add Task Button */}
        <button className="relative cursor-pointer inline-block px-6 py-2 font-bold text-white group">
          <Link to="/home/create-task">
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-green-500 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg blur-sm"></span>
            <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform bg-green-600 rounded-lg group-hover:scale-105 group-hover:blur-sm"></span>
            <span className="relative">Add task</span>
          </Link>
        </button>
      </div>
    </header>
  
    {/* Profile Positioning */}
    <div className="absolute right-4 top-4 sm:right-6 sm:top-4">
      <ProfileHover />
    </div>
  </div>
  
  );
};

export default Header;
