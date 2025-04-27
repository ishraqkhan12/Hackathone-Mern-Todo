// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { useAuth } from "../context/auth";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState(false);
//   const [auth, setAuth] = useAuth();

//   const navItems = [
//     { name: "Home", path: "/home" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
//     { name: "Services", path: "/services" },
//   ];

//   const toggleMenu = () => setIsOpen(!isOpen);

//   const logout = () => {
//     setAuth({
//       ...auth,
//       user: null,
//       token: "",
//     });
//     localStorage.removeItem("auth");
//     toast.success("Logout successfully");
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-white shadow-md fixed top-0 w-full z-10 ">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <Link to={"/home"}>
//             <div className="flex-shrink-0 text-2xl font-bold text-gray-800">
//               Ishraq
//             </div>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6 items-center">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className={`relative font-medium transition-all duration-200 ${
//                   location.pathname === item.path
//                     ? "text-blue-600 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-blue-600"
//                     : "text-gray-500 hover:text-blue-600"
//                 }`}
//               >
//                 {item.name}
//               </Link>
//             ))}

//             {/* ---- user checking for login or logout ----- */}

//             {!auth.user ? (
//               <>
//                 <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//                   <Link to="/">signup</Link>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button  onClick={logout} className="relative cursor-pointer inline-block px-6 py-2 font-bold text-white group">

//                   <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-red-500 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg blur-sm"></span>
//                   <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform bg-red-600 rounded-lg group-hover:scale-105 group-hover:blur-sm"></span>
//                   <span className="relative">
//                    Logout
//                   </span>
//                 </button>
//               </>
//             )}

//             {/* ---- user checking for admin panel ------ */}

//             {auth.user.role == 1 && (
//               <>
//                 <button className="relative inline-block px-6 py-2 font-bold text-white group">
//                   <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-green-500 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg blur-sm"></span>
//                   <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform bg-green-600 rounded-lg group-hover:scale-105 group-hover:blur-sm"></span>
//                   <span className="relative">
//                     <Link to="/admin" className="text-white">
//                       Admin
//                     </Link>
//                   </span>
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Mobile Hamburger */}
//           <div className="md:hidden">
//             <button onClick={toggleMenu}>
//               {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Navbar for mobile */}
//       {isOpen && (
//         <div className="md:hidden px-4 pb-4 pt-2 space-y-3">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               onClick={toggleMenu}
//               className={`block font-medium ${
//                 location.pathname === item.path
//                   ? "text-blue-600 underline"
//                   : "text-gray-700 hover:text-blue-600"
//               }`}
//             >
//               {item.name}
//             </Link>
//           ))}
//           <button onClick={logout} className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
//             Logout
//           </button>
//           {auth.user.role == 1 && (
//             <button  className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//              <Link to="/admin" className="text-white">
//                       Admin
//               </Link>
//           </button>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

import React from "react";
import { Link } from "react-router-dom";

const Header = ({ onAddClick }) => {
  return (
    <header className=" text-gray-800 font-bold pt-3 flex flex-col items-center">
      <h1 className="text-4xl font-bold  mb-4"><Link to={'/home'}>Task Tracker </Link> </h1>
      <div className="space-x-8">
      <button className="relative cursor-pointer inline-block px-6 py-2 font-bold text-white group">
        <Link to="/home/get-tasks">
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-blue-500 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg blur-sm"></span>
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform bg-blue-600 rounded-lg group-hover:scale-105 group-hover:blur-sm"></span>
          <span className="relative">See all task</span>
        </Link>
      </button>
      {/* see the tasks */}
      <button className="relative cursor-pointer inline-block px-6 py-2 font-bold text-white group">
        <Link to="/home/create-task">
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform translate-x-1 translate-y-1 bg-blue-500 group-hover:-translate-x-0 group-hover:-translate-y-0 rounded-lg blur-sm"></span>
          <span className="absolute inset-0 w-full h-full transition duration-300 ease-out transform bg-blue-600 rounded-lg group-hover:scale-105 group-hover:blur-sm"></span>
          <span className="relative">Add task</span>
        </Link>
      </button>
      </div>
    </header>
  );
};

export default Header;
