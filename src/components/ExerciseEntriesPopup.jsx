import React, { useState, useEffect } from "react";

const ExerciseEntriesPopup = ({ onClose, onSave, editTaskData }) => {
  const [exercises, setExercises] = useState([]);
  const [exerciseId, setExerciseId] = useState("");
  const [unit, setUnit] = useState("min"); 
  const [quantity, setQuantity] = useState("");

  useEffect(() => {

    fetch("http://localhost:5000/exercise-master")

      .then((response) => response.json())
      .then((data) => {

        setExercises(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [editTaskData]);

  useEffect(() => {
    if (editTaskData) {

      setExerciseId(editTaskData.exercise_id);

      setUnit(editTaskData.unit);

      setQuantity(editTaskData.quantity);
    } else {

      setUnit("min");
      setQuantity("");
    }
  }, [editTaskData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!unit) {
      alert("Select unit then click add button ");
      return;
    }
    if (!quantity || parseFloat(quantity) <= 0) {
      alert("Enter a valid quantity ");
      return;
    }

    onSave({
        
      exercise_id: parseInt(exerciseId),
      unit: unit,
      quantity: parseFloat(quantity)
    });
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>{editTaskData ? "EDIT EXERCISE ENTRY" : "ADD EXERCISE ENTRY"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "0 15px", marginBottom: "15px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "gray" }}>Exercise Name</label>
            <select
              value={exerciseId}
              onChange={(e) => setExerciseId(e.target.value)}
              style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "5px", background: "white", width: "100%" }}
            >
              {exercises.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.exercise_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "0 15px", marginBottom: "15px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "gray" }}>Select Unit Type</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "5px", background: "white", width: "100%" }}
            >
              <option value="min">min</option>
              <option value="rep">rep</option>
            </select>
          </div>

          <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "0 15px", marginBottom: "15px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "gray" }}>Quantity</label>
            <input
              type="number"
              step="any"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "5px", width: "100%" }}
            />
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

export default ExerciseEntriesPopup;
