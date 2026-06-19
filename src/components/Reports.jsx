import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const Reports = () => {

  const [reports, setReports] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/reports")
      .then((response) => response.json())
      .then((data) => {
        setReports(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <div className="page-container">
      <div className="page-header" style={{ marginBottom: "20px" }}>
        <h2>Reports</h2>
      </div>

      <div className="table-container">
        <table className="app-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Calories Consumed</th>
              <th>Calories Burned</th>
              <th>Net Calories</th>
              <th>Action</th>
            </tr>
          </thead>


          <tbody>
            {reports.map((row,) => (
              <tr key={row.date}>
                <td>{row.date.split('T')[0]}</td>
                <td>{row.calories_consumed} kcal</td>
                <td>{row.calories_burned} kcal</td>
                <td>{row.net_calories} kcal</td>
                <td>
                  <button 
                    className="btn-grey"                   >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          


        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default Reports;

