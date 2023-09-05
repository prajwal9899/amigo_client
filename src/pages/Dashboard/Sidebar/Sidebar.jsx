/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import AdminRoutes from "../../../components/routes/AdminRoutes";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  console.log(user?.role, "USER");
  return (
    <section id="sidebar">
      <a href="#" className="brand">
        <i className="bx bxs-smile"></i>
        <span className="text">SOCIETY PORTAL</span>
      </a>
      {user !== null && user?.role == "admin" ? (
        <ul className="side-menu top">
          <li className="">
            <NavLink
              to={"/"}
              className={({ isActive, isPending }) =>
                isActive ? "active" : ""
              }
            >
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/search"}
              className={({ isActive, isPending }) =>
                isActive ? "active" : ""
              }
            >
              <i className="bx bx-search-alt-2"></i>
              <span className="text">Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/upload"}
              className={({ isActive, isPending }) =>
                isActive ? "active" : ""
              }
            >
              <i className="bx bxs-doughnut-chart"></i>
              <span className="text">Manage Subscriptions</span>
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="side-menu top">
          <li className="">
            <NavLink
              to={"/"}
              className={({ isActive, isPending }) =>
                isActive ? "active" : ""
              }
            >
              <i className="bx bxs-dashboard"></i>
              <span className="text">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/search"}
              className={({ isActive, isPending }) =>
                isActive ? "active" : ""
              }
            >
              <i className="bx bx-search-alt-2"></i>
              <span className="text">Search Defaulters</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/upload"}
              className={({ isActive, isPending }) =>
                isActive ? "active" : ""
              }
            >
              <i className="bx bxs-doughnut-chart"></i>
              <span className="text">Upload Data</span>
            </NavLink>
          </li>
        </ul>
      )}
      <ul className="side-menu">
        <li>
          <a>
            <i className="bx bxs-cog"></i>
            <span className="text">Settings</span>
          </a>
        </li>
        <li>
          <a onClick={handleLogout} className="logout">
            <i className="bx bxs-log-out-circle"></i>
            <span className="text">Logout</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
