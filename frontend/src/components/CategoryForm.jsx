import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CategoryForm = ({ handleSubmit, value, setValue, btn }) => {
 

  return (
    <>
      <form onSubmit={handleSubmit} >
        <input
          placeholder="Enter your category"
          value={value}
          type="text"
          required
          onChange={(e) => setValue(e.target.value)}
          className="w-full  rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-[#add8e6]  focus:ring-1 focus:ring-[#add8e6] focus:shadow-md focus:shadow-[#add8e6] outline-none"
        /> <br /> 

        <button className="bg-blue-500 m-3 hover:bg-blue-600 text-white px-4 py-1 rounded ">
          {btn}
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
