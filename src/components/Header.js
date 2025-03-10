import Reac, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import "./Header.css"

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();
  
    useEffect(() => {
      if (location.pathname === "/") {
        setActiveTab("Home");
      } else if (location.pathname === "/add") {
        setActiveTab("AddTask");
      } else if (location.pathname === "/about") {
        setActiveTab("About");
      }
    }, [location]);
  
    return (
      <div className="header">
        <p className="logo">Task Manager App</p>
        <div className="header-right">
          <Link to="/">
            <p
              className={`${activeTab === "Home" ? "active" : ""}`}
              onClick={() => setActiveTab("Home")}
            >
              Home
            </p>
          </Link>
  
          <Link to="/add">
            <p
              className={`${activeTab === "AddTask" ? "active" : ""}`}
              onClick={() => setActiveTab("AddTask")}
            >
              Add Task
            </p>
          </Link>
  
          <Link to="/about">
            <p
              className={`${activeTab === "About" ? "active" : ""}`}
              onClick={() => setActiveTab("About")}
            >
              About
            </p>
          </Link>
        </div>
      </div>
    );
  };
  
  export default Header;
  