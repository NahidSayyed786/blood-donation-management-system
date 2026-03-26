import { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/index.css";

export default function AdminDonors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const res = await API.get("/api/donors");
      setDonors(res.data);
    } catch (err) {
      console.error("FETCH DONORS ERROR:", err);
      alert("Failed to load donors");
    } finally {
      setLoading(false);
    }
  };

  const deleteDonor = async (id) => {
    if (!window.confirm("Delete this donor?")) return;

    try {
      await API.delete(`/api/donors/${id}`);
      fetchDonors();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Failed to delete donor");
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <div className="container card">
      <h2>🧑‍💼 Admin – Donor Management</h2>

      {loading ? (
        <p>Loading donors...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Blood</th>
              <th>Phone</th>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {donors.length === 0 ? (
              <tr>
                <td colSpan="5">No donors found</td>
              </tr>
            ) : (
              donors.map((d) => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.blood_group}</td>
                  <td>{d.phone}</td>
                  <td>{d.city}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteDonor(d.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
