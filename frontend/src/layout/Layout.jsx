import React from "react";
import Navbar from "../components/navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="pt-16"> {/* Adds spacing below fixed navbar */}
        {children}
      </div>
    </>
  );
};

export default Layout;
