import React, { useState } from "react";
import './Sidebar.css'
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-toggle" onClick={handleSidebar}>
      <i className='bx bx-menu'></i>
      </div>
      <div className={isOpen ? "sidebar-open" : "sidebar-closed"}>
        <ul>
          <Link to="/dashboard"><li>Dashboard</li></Link>
          <Link to="/colegio"><li>Colégio</li></Link>
          <Link to="/salas"><li>Salas</li></Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;