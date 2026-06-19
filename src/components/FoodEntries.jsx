import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import FoodEntriesPopup from "./FoodEntriesPopup";
import Pagination from "./Pagination";

const FoodEntries = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {

    fetch("http://localhost:5000/food-entries")
      .then((response) => response.json())
      .then((data) => {
        setEntries(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSaveEntry = async (entryData) => {
    if (editingIndex !== null) {
      const editItem = entries[editingIndex];
      await fetch(`http://localhost:5000/food-entries/${editItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(entryData)
      });
      const updatedResponse = await fetch("http://localhost:5000/food-entries");
      const updatedData = await updatedResponse.json();
      setEntries(updatedData);
      setEditingIndex(null);
    } 
    
    
    else {
      await fetch("http://localhost:5000/food-entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(entryData)
      });
      const updatedResponse = await fetch("http://localhost:5000/food-entries");
      const updatedData = await updatedResponse.json();
      setEntries(updatedData);
    }
    setIsPopupOpen(false);
  };

  const deleteEntry = async (indexToDelete) => {
    const item = entries[indexToDelete];
    await fetch(`http://localhost:5000/food-entries/${item.id}`, { method: "DELETE" });
    const updatedResponse = await fetch("http://localhost:5000/food-entries");
    const updatedData = await updatedResponse.json();
    setEntries(updatedData);
  };

  
  return (
    <div className="page-container">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Food Entries</h2>
        <button className="btn-grey" onClick={() => {
          setEditingIndex(null);
          setIsPopupOpen(true);
        }}>
          Add Food Entry
        </button>
      </div>

      <div className="table-container">
        <table className="app-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Food Name</th>
              <th>Unit</th>
              <th>Quantity</th>
              <th>Calories</th>
              <th>Actions</th>
            </tr>
          </thead>



          <tbody>
            {entries.map((entri, index) => (
              <tr key={entri.id}>
                <td>{entri.created_at.split("T")[0]}</td>
                <td>{entri.food_name}</td>
                <td>{entri.unit}</td>
                <td>{entri.quantity}</td>
                <td>{entri.calories} kcal</td>
                <td>
                  <div className="action-buttons" style={{ display: "flex", gap: "10px" }}>
                    <Pencil
                      size={18}
                      className="action-icon"
                      style={{ cursor: "pointer", color: "gray" }}
                      onClick={() => {
                        setEditingIndex(index);
                        setIsPopupOpen(true);
                      }}
                    />
                    <Trash2
                      size={18}
                      className="action-icon"
                      style={{ cursor: "pointer", color: "gray" }}
                      onClick={() => deleteEntry(index)}
                    />
                  </div>
                </td>
              </tr>
            ))}

            
          </tbody>
        </table>
      </div>

      {isPopupOpen && (
        <FoodEntriesPopup
          onClose={() => {
            setIsPopupOpen(false);
            setEditingIndex(null);
          }}
          onSave={handleSaveEntry}
          editTaskData={editingIndex !== null ? entries[editingIndex] : null}
        />
      )}

      <Pagination />
    </div>
  );
};

export default FoodEntries;


