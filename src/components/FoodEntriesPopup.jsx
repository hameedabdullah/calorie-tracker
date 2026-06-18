import React, { useState, useEffect } from "react";

const FoodEntriesPopup = ({ onClose, onSave, editTaskData }) => {
  const [foods, setFoods] = useState([]);
  const [foodId, setFoodId] = useState("");
  const [unit, setUnit] = useState("g"); // Default option
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/food-master")
      .then((response) => response.json())
      .then((data) => {
        setFoods(data);
        if (!editTaskData && data.length > 0) { //dropdown automatically slect rice as default option
          setFoodId(data[0].id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [editTaskData]); 

  useEffect(() => {
    if (editTaskData) {
      setFoodId(editTaskData.food_id);
      setUnit(editTaskData.unit || "g");
      setQuantity(editTaskData.quantity);
    } else {
      setUnit("g");
      setQuantity("");
    }
  }, [editTaskData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!foodId) {
      alert("Select food name before clicking the save button");
      return;
    }
    if (!unit) {
      alert("Select unit before clicking the save button");
      return;
    }
    if (!quantity || parseFloat(quantity) <= 0) { 
      alert("Enter a valid quantity before clicking the save button");
      return;
    }

    onSave({
      food_id: parseInt(foodId),
      unit: unit,
      quantity: parseFloat(quantity)
    });
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>{editTaskData ? "EDIT FOOD ENTRY" : "ADD FOOD ENTRY"}</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "5px", padding: "0 15px", marginBottom: "15px" }}>
            <label style={{ fontWeight: "600", fontSize: "14px", color: "gray" }}>Food Name</label>
            <select
              value={foodId}
              onChange={(e) => setFoodId(e.target.value)}
              style={{ padding: "12px", border: "1px solid #ccc", borderRadius: "5px", background: "white", width: "100%" }}
            >
              {foods.map((food) => (
                <option key={food.id} value={food.id}>
                  {food.food_name}
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
              <option value="g">g</option>
              <option value="kg">kg</option>
              <option value="ml">ml</option>
              <option value="l">l</option>
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

export default FoodEntriesPopup;
