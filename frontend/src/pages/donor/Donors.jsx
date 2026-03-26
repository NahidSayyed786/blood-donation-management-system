import React, { useEffect, useState } from "react";
import "../styles/index.css";
import API from "../../services/api";

export default function Donors() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/donors")   // ✅ ONLY /donors
      .then((res) => {
        setDonors(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load donors");
        setLoading(false);
      });
  }, []);

  const filtered = donors.filter((d) =>
    `${d.name} ${d.city} ${d.blood_group}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container donors-page">
      <h1 className="title">Find Blood Donors</h1>

      <input
        className="search-box"
        placeholder="Search by name, blood group or city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading donors...</p>}
      {error && <p className="error">{error}</p>}

      <div className="donor-list">
        {!loading && filtered.length === 0 && <p>No donors found.</p>}

        {filtered.map((d, i) => (
          <div key={i} className="donor-card">
            <h3>{d.name}</h3>
            <p><strong>Blood:</strong> {d.blood_group}</p>
            <p><strong>City:</strong> {d.city}</p>
            <p><strong>Phone:</strong> {d.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
