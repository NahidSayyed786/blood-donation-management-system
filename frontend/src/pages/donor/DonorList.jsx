import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/index.css";

export default function DonorList() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDonors = async () => {
      try {
        const res = await API.get("/api/donors");
        setDonors(res.data);
      } catch (err) {
        console.error("Failed to load donors", err);
      } finally {
        setLoading(false);
      }
    };

    loadDonors();
  }, []);

  return (
    <div className="container">
      <h2>🩸 Donor List</h2>

      <div className="card" style={{ marginTop: 12 }}>
        {loading ? (
          <p style={{ textAlign: "center"}}>Loading donors...</p>
        ) : donors.length === 0 ? (
          <p>No donors found</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Phone</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((d) => (
                <tr key={d.id || d._id}>
                  <td>{d.name}</td>
                  <td>{d.blood_group}</td>
                  <td>{d.phone}</td>
                  <td>{d.city}</td>
                </tr>
              ))}
            </tbody>
            <tbody>
              {donors.map((d) => (
                <tr key={d.id || d._id}>
                  <td>{d.name}</td>
                  <td>{d.blood_group}</td>
                  <td>{d.phone}</td>
                  <td>{d.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
