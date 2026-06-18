import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {Utensils, FlameKindling,Radical} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // local storage help get userrname so namma username welcome  la use panikalam
  const [Loggedinuser, setLoggedinuser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // When the component loads, check if there is user information in localStorage
  useEffect(() => {
    if (!Loggedinuser) {
      toast.error("Please log in to access the dashboard!");
      navigate("/login");
    }
  }, [Loggedinuser, navigate]);



  return (
    <div className="dashboard-page">
      <div className="dashboard-welcome">
        <h3>Welcome, {Loggedinuser.username}!</h3>
      </div>

      <div className="summary-boxes-container">

        <div className="summary-box">
          <p className ="summary-title">CALORIES CONSUMED TODAY </p>
          <Utensils style={{margin : "20px"}} />
          <h2 className="summary-value">2000 kcal</h2>
        </div>

        <div className="summary-box">
          <p className="summary-title">CALORIES BURN TODAY</p>
          < FlameKindling style={{margin : "20px"}}/>
          <h2 className="summary-value">500 kcal</h2>
        </div>

        <div className="summary-box">
          <p className="summary-title">NET CALORIES</p>
          < Radical style={{margin : "20px"}}/>
          <h2 className="summary-value">1500 kcal</h2>
        </div>
      </div>

      <div className="dashboard-actions">
        <button 
          className="btn-grey dashboard-action-btn"
          onClick={() => navigate("/food-entries")}
        >
          Add Food
        </button>
        <button 
          className="btn-grey dashboard-action-btn"
          onClick={() => navigate("/exercise-entries")}
        >
          Add Exercise
        </button>
      </div>

      <marquee style={{margin:"50px"}}>
<h3>Track your calories every day •</h3>

      </marquee>
    </div>
  );
};

export default Dashboard;





