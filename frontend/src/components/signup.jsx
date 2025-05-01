import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPhone } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/auth";



const Signup = () => {
  const [auth, setAuth] = useAuth()
  const [showPassword, setShowPassword] = useState(false);

  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [contactValue, setContactValue] = useState("");
  const [roleValue, setRoleValue] = useState("");
 
  const navigate = useNavigate()
  
  const submitFunc = async (e) => {
    e.preventDefault();

     // Agar role value empty ya null hai, toh default 0 assign karen
      const finalRole = roleValue || 0;


    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/auth/register`,
        { name: nameValue,
          email: emailValue,
          password: passwordValue,
          phone: contactValue,
          role: finalRole, }
      );

      if (res.data.success || location.pathname != '/home') {

        
        console.log(res.data.message);
        toast.success(`${res.data.message}🎉` );
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token
        })
        navigate('/home')
      } else {
        console.log(res.data.message);
        toast.error(`Registration failed❌ ${res.data.message}`);

      }
    } catch (error) {
      toast.error(error.response.data.message);
      
     
    }
  };
// console.log("jj",import.meta.env.VITE_API);

  return (
    <>
      <div className="flex w-full xl-h-[100vh] justify-center min-h-screen bg-gray-100 md:p-6 ">
        <div className="md:w-[37%] w-full  md:mt-5 h-auto bg-white shadow-lg rounded-lg p-7">
          <form onSubmit={submitFunc} className="space-y-2">
            {/* <!-- Heading --> */}
            <h1 className="text-center text-2xl font-semibold text-gray-800">
              Signup
            </h1>
            {/* <!-- Name Field  --> */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                {" "}
                Name{" "}
              </label>
              <div className="mt-2">
                <input
                  placeholder="Enter your password"
                  value={nameValue}
                  type="text"
                  required
                  onChange={(e) => setNameValue(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-[#add8e6]  focus:ring-1 focus:ring-[#add8e6] focus:shadow-md focus:shadow-[#add8e6] outline-none"
                />
              </div>
            </div>
            {/* <!-- Email Field  --> */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-2">
                <input
                  placeholder="Enter your email"
                  value={emailValue}
                  type="email"
                  required
                  onChange={(e) => setEmailValue(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-[#add8e6]  focus:ring-1 focus:ring-[#add8e6] focus:shadow-md focus:shadow-[#add8e6] outline-none"
                />
              </div>
            </div>
            {/* ----- Password fiels -------- */}
            <div className="sm:col-span-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  value={passwordValue}
                  required
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  // onChange={passwordHandle}
                  onChange={(e) => setPasswordValue(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-[#add8e6] focus:ring-1 focus:ring-[#add8e6] focus:shadow-md focus:shadow-[#add8e6] outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            {/*  ----  Phone --------------- */}
            <div className="sm:col-span-4">
              <label
                className="block text-sm font-medium text-gray-700"
              >
                Contact:
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="number"
                  placeholder="Enter your contact "
                  required
                  value={contactValue}
                  // onChange={passwordHandle}
                  onChange={(e) => setContactValue(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-[#add8e6]  focus:ring-1 focus:ring-[#add8e6] focus:shadow-md focus:shadow-[#add8e6] outline-none"
                />
              </div>
            </div>
            {/* ------role -------- */}
            {/* <div className="sm:col-span-4">
              <label
                
                className="block text-sm font-medium text-gray-700"
              >
                Admin key (optional) :
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Enter your admin key"
                  value={roleValue}
                  // onChange={passwordHandle}
                  onChange={(e) => setRoleValue(e.target.value)}
                  className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-[#add8e6]  focus:ring-1 focus:ring-[#add8e6] focus:shadow-md focus:shadow-[#add8e6] outline-none"
                />
              </div>
            </div> */}
            {/* <br /> */}
      
            {/* <!-- Signup Button --> */}
            <div className="flex justify-center">
              <button
                type="submit"
                className=" hover:border hover:bg-white hover:border-[#00008b] hover:text-[#00008b] text-white  w-full border bg-[#00008b] cursor-pointer font-semibold py-2 rounded-md transition-all duration-300"
              >
                Signup
              </button>
            </div>
            <p className="text-center">
              you have already an account?{" "}
              <Link to="/login" className="  text-indigo-700 underline">
                Login
                 </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
