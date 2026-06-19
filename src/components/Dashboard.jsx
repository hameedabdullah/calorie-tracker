import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Utensils, FlameKindling, Radical } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const [Loggedinuser, setLoggedinuser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (!Loggedinuser) {
      navigate("/login");
    }
  }, [Loggedinuser, navigate]);


  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [netCalories, setNetCalories] = useState(0);

  useEffect(() => {

    if (Loggedinuser) {

      fetch("http://localhost:5000/dashboard")
        .then((response) => response.json())
        .then((data) => {
          
          setCaloriesConsumed(data.calories_consumed);
          setCaloriesBurned(data.calories_burned);
          setNetCalories(data.net_calories);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [Loggedinuser]);


  return (

    <div className="dashboard-page">
      <div className="dashboard-welcome">
        <h3>Welcome, {Loggedinuser.username}!</h3>
      </div>

      <div className="summary-boxes-container">

        <div className="summary-box">
          <p className="summary-title">CALORIES CONSUMED TODAY </p>
          <Utensils style={{ margin: "20px" }} />
          <h2 className="summary-value">{caloriesConsumed}</h2>
        </div>

        <div className="summary-box">
          <p className="summary-title">CALORIES BURN TODAY</p>
          < FlameKindling style={{ margin: "20px" }} />
          <h2 className="summary-value">{caloriesBurned}</h2>
        </div>

        <div className="summary-box">
          <p className="summary-title">NET CALORIES</p>
          < Radical style={{ margin: "20px" }} />
          <h2 className="summary-value">{netCalories}</h2>
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

      <marquee style={{ margin: "50px" }}>
        <h3>Track your calories every day </h3>

      </marquee>
    </div>
  );
};

export default Dashboard;





