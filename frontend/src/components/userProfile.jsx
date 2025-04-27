import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProfileHover = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()

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
    <div className="relative group">
    {/* Profile button */}
    <div className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition">
      {/* Profile Picture or Avatar */}
      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">
        {auth.user?.name?.charAt(0)}
      </div>
      {/* Name */}
      <div className="text-gray-800 font-semibold">{auth.user?.name}</div>
    </div>
  
    {/* Dropdown Card */}
    <div className="absolute right-25 top-0 mt-2 w-72 bg-white rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 z-50 p-3">
      <div className="flex flex-col items-center space-y-3">
        {/* Big Avatar */}
        <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-3xl">
          {auth.user?.name?.charAt(0)}
        </div>
        {/* Name */}
        <h3 className="text-xl font-bold text-gray-900">{auth.user?.name}</h3>
        {/* Email */}
        <p className="text-sm text-gray-500">{auth.user?.email}</p>
        {/* Role */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Role:</span>
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            {auth.user?.role === 1 ? "Admin" : "User"}
          </span>
        </div>
  
        <button
          onClick={logout}
          className="cursor-pointer relative inline-block px-6 py-2 font-semibold text-white bg-red-600 rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
  
  );
};

export default ProfileHover;
