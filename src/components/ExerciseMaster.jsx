import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import ExercisePopup from "./ExercisePopup";
import Pagination from "./Pagination";

const ExerciseMaster = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [exercises, setExercises] = useState([]);

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {

    fetch("http://localhost:5000/exercise-master")

      .then((response) => response.json())
      .then((data) => {
        setExercises(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSaveExercise = async (exerciseData) => {

    if (editingIndex !== null) {
      const editItem = exercises[editingIndex];
      await fetch(`http://localhost:5000/exercise-master/${editItem.id}`, {

        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(exerciseData)
      });
      const updatedResponse = await fetch("http://localhost:5000/exercise-master");
      
      const updatedData = await updatedResponse.json();
      setExercises(updatedData);
      setEditingIndex(null);
      toast.success("Exercise updated successfully!");
    } else {
      await fetch("http://localhost:5000/exercise-master", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(exerciseData)
      });
      const updatedResponse = await fetch("http://localhost:5000/exercise-master");
      const updatedData = await updatedResponse.json();
      setExercises(updatedData);
      toast.success("Exercise added successfully!");
    }
    setIsPopupOpen(false);
  };

  const deleteExercise = async (indexToDelete) => {
    const item = exercises[indexToDelete];
    await fetch(`http://localhost:5000/exercise-master/${item.id}`, { method: "DELETE" });
    const updatedResponse = await fetch("http://localhost:5000/exercise-master");
    const updatedData = await updatedResponse.json();
    setExercises(updatedData);
    toast.success("Exercise deleted successfully!");
  };

  return (
    <div className="page-container">
      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Exercise Master</h2>
        <button className="btn-grey" onClick={() => {
          setEditingIndex(null);
          setIsPopupOpen(true);
        }}>
          Add Exercise
        </button>
      </div>

      <div className="table-container">
        <table className="app-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Exercise Name</th>
              <th>Unit</th>
              <th>Calorie Burn</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => (
              <tr key={exercise.id}>
                <td>
                  <img
                    src={exercise.image_url}
                    alt="food-image"
                    className="table-img"
                    style={{ width: "40px", height: "40px", borderRadius: "5px", objectFit: "cover" }}
                  />
                </td>
                <td>{exercise.exercise_name}</td>
                <td>{exercise.unit}</td>
                <td>{exercise.calories_per_unit} kcal</td>
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
                      onClick={() => deleteExercise(index)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {isPopupOpen && (
        <ExercisePopup
        onClose={() => {
          setIsPopupOpen(false);
          setEditingIndex(null);
        }}
        onSave={handleSaveExercise}
        editTaskData={editingIndex !== null ? exercises[editingIndex] : null}
        />
      )}
      <Pagination />
    </div>
  );
};

export default ExerciseMaster;
