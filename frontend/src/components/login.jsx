import React, { use } from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faPhone } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const submitFunc = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/api/v1/auth/login`,
        {
          email: emailValue,
          password: passwordValue,
        }
      );

      if (res.data.success == true) {
    
        toast.success(`${res.data.message}🎉`);

        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/home");
      } else {
        toast.error(`Registration failed❌ ${res.data.message}`);
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          `Error: ${error.response.data.message || "An error occurred"}`
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <div className="flex w-full justify-center min-h-screen bg-gray-100 md:p-6 ">
        <div className="md:w-[37%] w-full  md:mt-7 h-auto bg-white shadow-lg rounded-lg p-7">
          <form onSubmit={submitFunc} className="space-y-6">
            {/* <!-- Heading --> */}
            <h1 className="text-center text-2xl font-bold text-gray-800">
              Login
            </h1>

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
            <br />
            {/* <!-- Signup Button --> */}
            <div className="flex justify-center">
              <button
                type="submit"
                className=" hover:border hover:bg-white hover:border-[#00008b] hover:text-[#00008b] text-white  w-full border bg-[#00008b] cursor-pointer font-semibold py-2 rounded-md transition-all duration-300"
              >
                Login
              </button>
            </div>
            <p className="text-center">
              you have already an account?{" "}
              <Link to="/" className="  text-indigo-700 underline">
                signup
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
