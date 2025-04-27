import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Loading starts as true
  const [auth, setAuth] = useAuth();
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

    if (auth?.token) {
      authCheck();
    } else {
      setLoading(false);
      setOk(false);
    }
  }, [auth?.token]);

  // ✅ Show loading while verifying
  if (loading) {
    return (
      <div className="text-center mt-40 text-xl font-semibold text-blue-600">
        🔄 Loading...
      </div>
    );
  }

  // ✅ Now conditionally render based on check result
  return ok ? (
    <Outlet />
  ) : (
    <div className="text-center mt-10 text-xl font-semibold">
      <p className="text-red-500">🚫 Access Denied: Please log in.</p>
    </div>
  );
};

export default PrivateRoute;
