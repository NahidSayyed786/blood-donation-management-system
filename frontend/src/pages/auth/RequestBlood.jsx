import React, { useState } from "react";
import API from "../../services/api";
import "../../styles/index.css";

export default function RequestBlood() {
  const [form, setForm] = useState({
    patient_name: "",
    blood_group: "",
    units: "",
    hospital: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/requests/add", {
        patient_name: form.patient_name,
        blood_group: form.blood_group,
        units: Number(form.units),
        hospital: form.hospital,
        city: form.city,
        phone: form.phone,
      });

      alert("✅ Blood request submitted successfully!");

      setForm({
        patient_name: "",
        blood_group: "",
        units: "",
        hospital: "",
        city: "",
        phone: "",
      });
    } catch (err) {
      console.error("REQUEST ERROR:", err);
      alert("❌ Failed to submit request");
    }
  };

  return (
    <div className="container fade">
      <h2>🩸 Blood Request Form</h2>

      <form className="form-card" onSubmit={handleSubmit}>
        <input
          name="patient_name"
          placeholder="Patient Name"
          value={form.patient_name}
          onChange={handleChange}
          required
        />

        <input
          name="blood_group"
          placeholder="Blood Group (A+, O-)"
          value={form.blood_group}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="units"
          placeholder="Units Required"
          value={form.units}
          onChange={handleChange}
          required
        />

        <input
          name="hospital"
          placeholder="Hospital Name"
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

        <input
          name="phone"
          placeholder="Contact Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <button className="btn primary" type="submit">
          Submit Request
        </button>
      </form>
    </div>
  );
}
