import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import FoodMaster from "./components/FoodMaster";
import ExerciseMaster from "./components/ExerciseMaster";
import FoodEntries from "./components/FoodEntries";


const AppContent = () => {
  const location = useLocation();

  // If we in the LoginSignup page, we do not show Sidebar and Navbar
  const AuthPage = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";

  if (AuthPage) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    );
  }

  return (
    <div className="whole">
      <div className="whole-container">

        <Sidebar />

        <div className="main-container">

          <Navbar />

          <div className="content-area" style={{ padding: "20px" }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/food-master" element={<FoodMaster />} />
             <Route path="/exercise-master" element={<ExerciseMaster />} />
             <Route path="/food-entries" element={<FoodEntries />} />

              
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <AppContent />
    </BrowserRouter>
  );
};

export default App;