import React, { useState } from "react";
import "../styles/index.css";
import API from "../../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    blood: "A+",
    city: "",
  });

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");

    // ✅ Basic validation
    if (!form.name || !form.phone || !form.city) {
      setMessage("❌ Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      await API.post("/api/donors/add", {
        name: form.name,
        blood_group: form.blood,
        age: 25, 
        phone: form.phone,
        city: form.city,
      });

      setMessage("✅ Donor registered successfully");

      setForm({
        name: "",
        email: "",
        phone: "",
        blood: "A+",
        city: "",
      });
      setPhoto(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to register donor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register container split">
      {/* LEFT IMAGE */}
      <div className="left-illustration">
        <img src="/donor-form.png" alt="Donor" className="illus" />
      </div>

      {/* FORM CARD */}
      <div className="register-card">
        <h2>🩸 Donor Registration</h2>
        <p className="subtitle">
          Join thousands of donors who save lives every day.
        </p>

        <form className="form" onSubmit={submit}>
          <div className="row">
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              placeholder="Email (optional)"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="row">
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <select
              name="blood"
              value={form.blood}
              onChange={handleChange}
            >
              {["A+","A-","B+","B-","O+","O-","AB+","AB-"].map(b => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>

          <div className="row">
            <input
              name="city"
              placeholder="City / Location"
              value={form.city}
              onChange={handleChange}
              required
            />
          </div>

          {/* PHOTO UPLOAD */}
          <div className="photo-upload">
            <label>Upload Photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />

            {photo && (
              <img
                src={photo}
                alt="Preview"
                className="photo-preview"
              />
            )}
          </div>

          <div className="row actions">
            <button
              className="btn primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Saving..." : "Register"}
            </button>

            <button
              type="button"
              className="btn outline"
              onClick={() => {
                setForm({
                  name: "",
                  email: "",
                  phone: "",
                  blood: "A+",
                  city: "",
                });
                setPhoto(null);
                setMessage("");
              }}
            >
              Reset
            </button>
          </div>

          {message && (
            <p className="form-message">{message}</p>
          )}
        </form>

        {/* TIPS */}
        <div className="tips">
          <h4>Eligibility</h4>
          <ul>
            <li>Age 18–65</li>
            <li>Minimum weight 50kg</li>
            <li>Good general health</li>
            <li>No recent surgery</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
