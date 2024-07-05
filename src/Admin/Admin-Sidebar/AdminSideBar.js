import React from "react";
import './admin-sidebar.css';
import { useNavigate } from "react-router-dom";
import { MdOutlinePostAdd, MdNotificationsActive,MdGridView,MdOutlinePowerSettingsNew  } from "react-icons/md";


function AdminSideBar() {
  const navigate = useNavigate();

  const handleViewJobs = () => {
    navigate("/viewJobs"); // Navigate to admin dashboard
  };

  const handlePostJob = () => {
    navigate("/postJob"); // Navigate to post job form
  };

  const handleNotification=()=>{
    navigate("/applicants");
  }

  const handleLogOut=()=>{
    navigate("/logout");
  }

  return (
    <div>
    <div className={`admin-sidebar`}>
      <div className="admin-sidebar-header">
        Dashboard
      </div>
      <ul className="admin-sidebar-list">
        <li onClick={handleViewJobs} className="admin-sidebar-item">
          <MdGridView color="white" size={24} className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">View Jobs</span>
        </li>
        <li onClick={handlePostJob} className="admin-sidebar-item">
          <MdOutlinePostAdd color="white" size={24} className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Post A Job</span>
        </li>
        <li onClick={handleNotification} className="admin-sidebar-item">
          <MdNotificationsActive  color="white" size={24} className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">Applicants</span>
        </li>
        <li onClick={handleLogOut} className="admin-sidebar-item">
          <MdOutlinePowerSettingsNew color="white" size={24} className="admin-sidebar-icon" />
          <span className="admin-sidebar-text">LogOut</span>
        </li>
      </ul>
    </div>
    </div>
  );
}

export default AdminSideBar;
