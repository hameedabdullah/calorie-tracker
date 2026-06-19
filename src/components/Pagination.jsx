import React from "react";

const Pagination = () => {
  return (
    <div className="pagination-container" style={{ display: "flex", justifyContent: "start", alignItems: "center", gap: "5px", marginTop: "20px" }}>
      <button className="pagination-btn">&lt;</button>
      <span className="pagination-current" style={{ padding: "5px 12px", border: "1px solid #ccc", borderRadius: "4px" }}>1</span>
      <button className="pagination-btn">&gt;</button>
    </div>
  );
};

export default Pagination;
