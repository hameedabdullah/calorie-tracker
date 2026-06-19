import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import FoodPopup from "./FoodPopup";
import Pagination from "./Pagination";

const FoodMaster = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [foods, setFoods] = useState([]);

  const [editingIndex, setEditingIndex] = useState(null);


  useEffect(() => {

    fetch("http://localhost:5000/food-master")

      .then((response) => response.json())
      .then((data) => {

        setFoods(data);

      })
      .catch((err) => {

        console.log(err);

      });
  }, []);

  const handleSaveFood = async (foodData) => {

    if (editingIndex !== null) {

      const editItem = foods[editingIndex];

      await fetch(`http://localhost:5000/food-master/${editItem.id}`, {

        method: "PUT",headers: { "Content-Type": "application/json"},
        body: JSON.stringify(foodData)
      
      });

      const updatedResponse = await fetch("http://localhost:5000/food-master");
      const updatedData = await updatedResponse.json();

      setFoods(updatedData);

      setEditingIndex(null);


    } else {
      await fetch("http://localhost:5000/food-master", {

        method: "POST",

        headers: { "Content-Type": "application/json"},body: JSON.stringify(foodData)
      });

      const updatedResponse = await fetch("http://localhost:5000/food-master");

      const updatedData = await updatedResponse.json();

      setFoods(updatedData);

    }
    setIsPopupOpen(false);
  };

  const deleteFood = async (indexToDelete) => {


    const item = foods[indexToDelete];

    await fetch(`http://localhost:5000/food-master/${item.id}`, { method: "DELETE" });

    const updatedResponse = await fetch("http://localhost:5000/food-master");

    const updatedData = await updatedResponse.json();

    setFoods(updatedData);

  };

  return (


    <div className="page-container">

      <div className="page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Food Master</h2>
        

        <button className="btn-grey" onClick={() => {

          setEditingIndex(null);
          setIsPopupOpen(true);
        }}>
          Add Food
        </button>
      </div>

      <div className="table-container">

        <table className="app-table">

          <thead>
            <tr>
              <th>Image</th>
                <th>Food Name</th>
                <th>Unit</th>
              <th>Calories Per Unit</th>
  <th>Actions</th>
            </tr>
          </thead>


          <tbody>
            {foods.map((food, index) => (

              <tr key={food.id}>
                <td>
                  <img
                    src={food.image_url}
                      alt="food-image"
                    className="table-img"
                   
                    style={{ width: "40px", height: "40px", borderRadius: "5px", objectFit: "cover" }}
                  />
                </td>
                <td>{food.food_name}</td>
                   <td>{food.unit}</td>
                <td>{food.calories_per_unit}/kcal</td>
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
                        onClick={() => deleteFood(index)}
                    />
                  </div>

                </td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>


      {isPopupOpen && (
        <FoodPopup
        onClose={() => {
       setIsPopupOpen(false);
          setEditingIndex(null);
        }}
           onSave={handleSaveFood}
        editTaskData={editingIndex !== null ? foods[editingIndex] : null}
        />
      )}

      <Pagination />
    </div>
  );
};

export default FoodMaster;



