import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-row justify-between p-6 gap-2 bg-yellow-500">
      <div>
        <a href="/">
          <h1 className="font-extrabold text-4xl text-white">VeriCert</h1>
        </a>
      </div>
      <div className="flex flex-row gap-2">
        {!isLoggedIn ? (
          <>
            <a className="bg-black p-2 rounded-md px-8 py-2 text-lg font-medium text-white" href="/register">
              Register
            </a>
            <a className="bg-black p-2 rounded-md px-8 py-2 text-lg font-medium text-white" href="/login">
              Login
            </a>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 p-2 rounded-md px-8 py-2 text-lg font-medium text-white"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
