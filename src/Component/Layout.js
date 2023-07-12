import React from "react";
import "../Css/layoutStyle.css";
import { SideBarMenu } from "../Data/Data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import dashLogo from "../Img/newlogo.png";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  //user logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
  };
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6 className="text-light">
                <img src={dashLogo} className="logo" alt="img" />
              </h6>
            </div>
            <div className="menu">
              {SideBarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                <i class="fa-solid fa-user"></i>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
