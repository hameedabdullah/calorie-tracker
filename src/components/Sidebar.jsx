import { NavLink, useNavigate } from "react-router-dom";
import {LayoutDashboard, Apple, Dumbbell, Utensils, SquareActivity , FileText, LogOut} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="side-bar">
      <div className="top-bar">
        <div id="sidebartitle">
          <Apple size={24} color="#0f172a" />
          <h3>Calorie Tracker App</h3>
        </div>
      </div>


      <div className="menu-list">


        <div className="menu-top">

      
        <NavLink to="/dashboard" className="menu-item">
          <LayoutDashboard size={20} />
          <h4>Dashboard</h4>
        </NavLink>

        <NavLink to="/food-master" className="menu-item">
          <Apple size={20} />
          <h4>Food Master</h4>
        </NavLink>

        <NavLink to="/exercise-master" className="menu-item">
          <Dumbbell size={20} />
          <h4>Exercise Master</h4>
        </NavLink>

        <NavLink to="/food-entries" className="menu-item">
          <Utensils size={20} />
          <h4>Food Entries</h4>
        </NavLink>

        <NavLink to="/exercise-entries" className="menu-item">
        <SquareActivity size={20}/>
          <h4>Exercise Entries</h4>
        </NavLink>

        <NavLink to="/reports" className="menu-item">
          <FileText size={20} />
          <h4>Reports</h4>
        </NavLink>

        </div>
        



        <div className="menu-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
          <LogOut size={20} />
          <h4>Logout</h4>
        </div>


        </div>

    </div>
  );
};

export default Sidebar;
