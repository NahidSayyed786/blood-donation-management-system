import React, { useState } from "react";
import "../../styles/index.css";

export default function DonorRegister() {
  const [form, setForm] = useState({
    name: "",
    blood_group: "A+",
    age: "",
    phone: "",
    city: "",
  });

  const [message, setMessage] = useState("");

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    // ✅ Basic validation
    if (!form.name || !form.blood_group || !form.city) {
      setMessage("❌ Please fill all required fields");
      return;
    }

    const age = Number(form.age);
    if (age < 18 || age > 65) {
      setMessage("❌ Age must be between 18 and 65");
      return;
    }

    if (form.phone && !/^\d{10}$/.test(form.phone)) {
      setMessage("❌ Enter a valid 10-digit phone number");
      return;
    }

    // ✅ OPEN GOOGLE FORM (NO BACKEND)
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSfm6ibLCxho95Xju-XmbvJY9zSpdyRVORQvwy07bX5GBr1hIA/viewform",
      "_blank"
    );

    setMessage("✅ Please submit the form in the new tab");
  };

  return (
    <div className="container card">
      <h2>Register as Donor</h2>

      <form className="form" onSubmit={submit}>
        <label>Full Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handle}
          placeholder="Nahid Sayyed"
          required
        />

        <label>Blood Group</label>
        <select
          name="blood_group"
          value={form.blood_group}
          onChange={handle}
          required
        >
          {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <label>Age</label>
        <input
          type="number"
          name="age"
          min="18"
          max="65"
          value={form.age}
          onChange={handle}
          placeholder="18 - 65"
          required
        />

        <label>Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handle}
          placeholder="9876543210"
        />

        <label>City</label>
        <input
          name="city"
          value={form.city}
          onChange={handle}
          placeholder="Mumbai"
          required
        />

        <button className="btn btn-primary">
          Submit
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
}
