import { useLocation } from "react-router-dom";
import leftBanner from "../assets/left-banner.jpg";

const Navbar = () => {
  const location = useLocation();
  
  
  const getPageTitle = {
    "/dashboard": "Dashboard",
    "/food-master": "Food Master",
    "/exercise-master": "Exercise Master",
    "/food-entries" : "Food Entries",
    "/exercise-entries" : "Exercise Entries",
  };
    
    
      const savedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="navbar">
      <div className="left-side">
        <h1>{getPageTitle[location.pathname]}</h1>
      </div>

      <div className="right-side" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src={leftBanner} alt="user" className="dp"/>
        <span className="user-name-text" style={{ fontWeight: "900", color: "#0f172a" }}>{savedUser.username ? savedUser.username : "Guest" } </span>
      </div>
    </div>
  );
};

export default Navbar;
