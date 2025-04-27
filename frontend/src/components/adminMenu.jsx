import { Link, useLocation } from "react-router-dom";
import {
  faUser,
  faPlus,
  faFolderPlus,
  faBars,
  faPenToSquare,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const AdminMenu = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/admin/users", label: "Users", icon: faUser },
    {
      to: "/admin/category",
      label: "Create Category",
      icon: faFolderPlus,
    },
    { to: "/admin/create-product", label: "Create Product", icon: faPlus },
    { to: "/admin/products", label: "Product List", icon: faList },
    // { to: "/admin/products/:slug", label: "Update Product", icon: faPenToSquare },

    

   
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <div className="md:hidden w-full flex justify-between items-center p-4 bg-gray-800 text-white md:relative fixed top-16">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faBars} className="text-white text-xl" />
        </button>
      </div>

      {/*Dashboard Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-64 h-screen bg-gray-800 text-white md:fixed fixed top-16 z-50`}
      >
        <div className="text-2xl font-bold px-6 py-4 border-b border-gray-700">
          Admin Dashboard
        </div>

        <nav className="flex flex-col mt-4 space-y-1 px-4">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
                location.pathname === link.to
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <FontAwesomeIcon icon={link.icon} />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default AdminMenu;
