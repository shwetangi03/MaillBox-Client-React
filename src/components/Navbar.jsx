import React from "react";
import { useHistory, NavLink } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  const logoutHandler = (event) => {
    event.preventDefault();
    localStorage.setItem("JWTTOKEN", "");
    localStorage.setItem("userID", "");
    localStorage.setItem("Email", "");

    history.replace("./auth");
  };
  const isLogin = false;

  return (
    <div className="flex p-2 gap-4">
      <NavLink
        to="/welcome"
        className="px-2 p-1 bg-gray-400 text-white rounded-lg"
      >
        Home
      </NavLink>

      <NavLink
        to="/expenses"
        className="px-2 p-1 bg-gray-400 text-white rounded-lg"
      >
        Mail Box
      </NavLink>

      <NavLink
        to="/about"
        className="px-2 p-1 bg-gray-400 text-white rounded-lg"
      >
        About Us
      </NavLink>

      {isLogin && (
        <div className="px-2 p-1 bg-gray-400 text-white rounded-lg">
          <button>Toggle</button>
        </div>
      )}

      <div className="px-2 p-1 bg-gray-400 text-white rounded-lg">
        <button onClick={logoutHandler}>{isLogin ? "Logout" : "Login"}</button>
      </div>

      <hr className="border-gray-300 border-1"></hr>
    </div>
  );
};

export default Navbar;
