import React, { useState } from "react";
import './Sidebar.css'

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
          <li>Dashboard</li>
          <li>Colégio</li>
          <li>Salas</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;