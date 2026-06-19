import React, { useState, useEffect } from "react";

const ExercisePopup = ({ onClose, onSave, editTaskData }) => {
  const [exerciseName, setExerciseName] = useState("");
  const [unit, setUnit] = useState(""); // Default option
  const [caloriesPerUnit, setCaloriesPerUnit] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (exerciseName.trim() === "") {
      alert("enter your exercise name before click the add button");
      return;
    }
    if (!caloriesPerUnit) {
      alert("enter calories before click the add button");
      return;
    }

    
    if (!imageUrl) {
      alert("upload image before save");
      return;
    }
    onSave({
      exercise_name: exerciseName,
      unit: unit,
      calories_per_unit: parseInt(caloriesPerUnit),
      image_url: imageUrl
    });
  };

  useEffect(() => {
    
    if (editTaskData) {
      setExerciseName(editTaskData.exercise_name);
      setUnit(editTaskData.unit || "reps");
      setCaloriesPerUnit(editTaskData.calories_per_unit);
      setImageUrl(editTaskData.image_url);
    } else {
      setExerciseName("");
      setUnit("reps");
      setCaloriesPerUnit("");
      setImageUrl("");
    }
  }, [editTaskData]);

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>{editTaskData ? "EDIT YOUR EXERCISE" : "ADD YOUR EXERCISE"}</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Exercise Name"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />

          <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "0 15px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "gray" }}>Select Unit Type</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "5px", background: "white" }}
            >
              <option value="reps">reps</option>
              <option value="minute">minute</option>
            </select>
          </div>

          <input
            type="number"
            placeholder="Calories Burned Per Unit"
            value={caloriesPerUnit}
            onChange={(e) => setCaloriesPerUnit(e.target.value)}
          />

          <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "0 15px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "gray" }}>Choose Image (from public/images/)</label>
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

export default ExercisePopup;
