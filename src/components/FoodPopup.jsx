import React, { useState, useEffect } from "react";

const FoodPopup = ({ onClose, onSave, editTaskData }) => {


  const [foodName, setFoodName] = useState("");

  const [unit, setUnit] = useState("gm"); 

  const [caloriesPerUnit, setCaloriesPerUnit] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (foodName.trim() === "") {

      alert("enter your food name before click the add button");
      return;
    }
    if (!caloriesPerUnit) {
      alert("enter calories before click the add button");
      return;
    }
    // Validate image upload
    if (!imageUrl) {
      alert("upload image before save");
      return;
    }

    onSave({

      food_name: foodName,
      unit: unit,
      calories_per_unit: parseInt(caloriesPerUnit),
      image_url: imageUrl
    });
  };

  useEffect(() => {

    if (editTaskData) {

      setFoodName(editTaskData.food_name);

      setUnit(editTaskData.unit);

      setCaloriesPerUnit(editTaskData.calories_per_unit);

      setImageUrl(editTaskData.image_url);
    } else {

      setFoodName("");
      setUnit("gm");
      setCaloriesPerUnit("");
      setImageUrl("");
    }
  }, [editTaskData]);

  return (

    <div className="popup-overlay" onClick={onClose}>

      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>{editTaskData ? "EDIT YOUR FOOD" : "ADD YOUR FOOD"}</h3>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />

          <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "0 15px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "gray" }}>Select Unit Type</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "5px", background: "white" }}
            >
              <option value="gm">gm</option>

              <option value="ml">ml</option>
            </select>
          </div>

          <input
            type="number"

            placeholder="Calories Per Unit"
            value={caloriesPerUnit}
            onChange={(e) => setCaloriesPerUnit(e.target.value)}
          />

          <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "0 15px" }}>


            <label style={{ fontWeight: "600", fontSize: "14px", color: "gray" }}>(pls Choose Image only public/images/)</label>
            <input
              type="file"
              accept="image/*"
              style={{ border: "1px solid #ccc", padding: "8px" }}

              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImageUrl(`/images/${e.target.files[0].name}`);
                }
              }}
            />

            {imageUrl && <span style={{ fontSize: "12px", color: "green" }}>Selected: {imageUrl}</span>}

          </div>

          <div className="popup-buttons">

            <button type="submit" className="popup-btn">

              {editTaskData ? "update" : "add"}
            </button>

            <button type="button" className="popup-btn cancel-btn" onClick={onClose}>
              
              Cancel
            </button>
          </div>
        </form>      
      </div>
    </div>
  );
};

export default FoodPopup;
