import React, { useEffect, useState } from "react";
import "../../styles/index.css";

export default function AdminInventory() {
  const [inventory, setInventory] = useState([]);

  /* ================= LOAD INVENTORY ================= */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bloodInventory"));

    if (stored && stored.length > 0) {
      setInventory(stored);
    } else {
      const defaultData = [
        { group: "A+", units: 20, city: "Mumbai" },
        { group: "B+", units: 10, city: "Pune" },
        { group: "O+", units: 30, city: "Delhi" },
      ];
      setInventory(defaultData);
      localStorage.setItem("bloodInventory", JSON.stringify(defaultData));
    }
  }, []);

  /* ================= UPDATE UNITS ================= */
  const updateUnits = (index, value) => {
    const units = Math.max(0, Number(value)); // prevent negative

    const updated = [...inventory];
    updated[index].units = units;

    setInventory(updated);
    localStorage.setItem("bloodInventory", JSON.stringify(updated));
  };

  /* ================= ADD NEW BLOOD ================= */
  const addBlood = () => {
    const group = prompt("Enter Blood Group (A+, O-)");
    const units = prompt("Enter Units");
    const city = prompt("Enter City");

    if (!group || !units || !city) {
      alert("All fields are required");
      return;
    }

    if (isNaN(units) || units < 0) {
      alert("Units must be a valid number");
      return;
    }

    const updated = [
      ...inventory,
      { group: group.toUpperCase(), units: Number(units), city },
    ];

    setInventory(updated);
    localStorage.setItem("bloodInventory", JSON.stringify(updated));
  };

  /* ================= DELETE BLOOD ================= */
  const deleteBlood = (index) => {
    if (!window.confirm("Delete this blood group?")) return;

    const updated = inventory.filter((_, i) => i !== index);
    setInventory(updated);
    localStorage.setItem("bloodInventory", JSON.stringify(updated));
  };

  return (
    <div className="container fade">
      <h2>🏥 Admin Blood Inventory</h2>

      <button className="btn primary" onClick={addBlood}>
        ➕ Add Blood Stock
      </button>

      {inventory.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No inventory data available</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Blood Group</th>
              <th>Units</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {inventory.map((b, i) => (
              <tr key={i}>
                <td>{b.group}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={b.units}
                    onChange={(e) =>
                      updateUnits(i, e.target.value)
                    }
                    className="unit-input"
                  />
                </td>
                <td>{b.city}</td>
                <td>
                  <button
                    className="btn tiny danger"
                    onClick={() => deleteBlood(i)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
