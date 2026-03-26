import React, { useState } from "react";
import "../../styles/index.css";

export default function Donate() {
  const [form, setForm] = useState({
    bloodGroup: "A+",
    units: "",
    hospital: "",
    city: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();

    if (Number(form.units) <= 0) {
      alert("Units must be greater than 0");
      return;
    }

    const donations =
      JSON.parse(localStorage.getItem("donations")) || [];

    donations.push({
      ...form,
      units: Number(form.units),
      date: new Date().toLocaleString()
    });

    localStorage.setItem("donations", JSON.stringify(donations));
    alert("✅ Donation request submitted");

    setForm({ bloodGroup: "A+", units: "", hospital: "", city: "" });
  };

  return (
    <section className="container fade">
      <div className="card donate-card">
        <h2>🩸 Donate Blood</h2>
        <p>Submit blood donation availability</p>

        <div className="donate-info">
          <h4>Nearby Blood Banks</h4>
          <ul>
            <li>🩸 Red Cross – Mumbai</li>
            <li>🩸 Tata Memorial – Mumbai</li>
            <li>🩸 Government Blood Bank – Pune</li>
          </ul>
        </div>

        <form onSubmit={submit} className="form">
          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
          >
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>O+</option><option>O-</option>
            <option>AB+</option><option>AB-</option>
          </select>

          <input
            type="number"
            name="units"
            placeholder="Units Available"
            value={form.units}
            onChange={handleChange}
            min="1"
            required
          />

          <input
            name="hospital"
            placeholder="Hospital / Blood Bank"
            value={form.hospital}
            onChange={handleChange}
            required
          />

          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />

          <button className="btn primary">Submit</button>
        </form>
      </div>
    </section>
  );
}
