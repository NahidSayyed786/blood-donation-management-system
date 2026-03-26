import React, { useEffect, useState } from "react";
import "../../styles/index.css";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);

  /* ================= LOAD INVENTORY ================= */
  useEffect(() => {
  const stored = JSON.parse(localStorage.getItem("bloodInventory"));

  if (stored && stored.length > 0) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInventory(stored);
  } else {
    const defaultData = [
      { group: "A+", units: 20, city: "Mumbai" },
      { group: "B+", units: 10, city: "Pune" },
      { group: "O+", units: 30, city: "Delhi" },
    ];

    setInventory(defaultData);
    localStorage.setItem(
      "bloodInventory",
      JSON.stringify(defaultData)
    );
  }
}, []);

  return (
    <div className="container fade">
      <h2>🩸 Blood Availability</h2>

      {inventory.length === 0 ? (
        <p>No blood stock available</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Units Available</th>
              <th>City</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((b, i) => (
              <tr key={i}>
                <td>{b.group}</td>
                <td>{b.units}</td>
                <td>{b.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p style={{ marginTop: 10, color: "#777" }}>
        * Inventory updated by admin in real time
      </p>
    </div>
  );
}
