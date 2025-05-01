import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ProfileHover = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);
  const closeDropdown = () => setOpen(false);


  if (!auth.user) return null;

  const logout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout successfully");
    navigate("/login");
  };
  return (
    <div className="relative">
      {/* Profile button */}
      <div
        className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition"
        onClick={toggleDropdown}
      >
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
          {auth.user?.name?.charAt(0)}
        </div>
        <div className="text-gray-800 font-semibold">{auth.user?.name}</div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl transition-all duration-300 z-50 p-3">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-3xl">
              {auth.user?.name?.charAt(0)}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{auth.user?.name}</h3>
            <p className="text-sm text-gray-500">{auth.user?.email}</p>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-600">Role:</span>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
                {auth.user?.role === 1 ? "Admin" : "User"}
              </span>
            </div>

            <button
              onClick={() => {
                logout();
                closeDropdown();
              }}
              className="cursor-pointer relative inline-block px-6 py-2 font-semibold text-white bg-red-600 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  
  );
};

export default ProfileHover;
