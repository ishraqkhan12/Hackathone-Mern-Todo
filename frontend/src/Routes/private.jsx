import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState(true); // ✅ Loading starts as true
  const location = useLocation();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API}/api/v1/auth/home-page`
        );
        setOk(res.data.ok); // ✅ Set ok based on response
      } catch (err) {
        setOk(false);
      } finally {
        setLoading(false); // ✅ Done checking
      }
    };
    if (auth?.token && auth?.user.role == 1) authCheck();
    else {
      console.log("error in role or token");
      setLoading(false);
      // console.log("route get successful");
    }
  }, [auth?.token]);
//   console.log(auth);

  // ✅ Show loading while verifying
  if (loading) {
    return (
      <div className="text-center mt-40 text-xl font-semibold text-blue-600">
        🔄 Loading...
      </div>
    );
  }
  
  if (!ok) {
    return (
      <div className="text-center mt-10  text-xl font-semibold">
        <p className="text-red-500">
          🚫 Access Denied: Please log in with an admin account to access this page.
        </p>
      </div>
    );
  }
  
  return <Outlet />;
  
};

export default PrivateRoute;
