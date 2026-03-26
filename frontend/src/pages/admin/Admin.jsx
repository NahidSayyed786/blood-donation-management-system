import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/index.css";

export default function Admin() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRequests = async () => {
    try {
      const res = await API.get("/api/requests");
      setRequests(res.data);
    } catch (err) {
      console.error("LOAD ERROR:", err);
    }
  };

  const updateStatus = async (id, status) => {
    setLoading(true);
    try {
      await API.put(`/api/requests/${id}/status`, { status });
      await loadRequests();
    } catch (err) {
      console.error("UPDATE ERROR:", err);
      alert("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div className="container card">
      <h2>Admin – Blood Requests</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Group</th>
            <th>Units</th>
            <th>Hospital</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="6">No requests found</td>
            </tr>
          ) : (
            requests.map((r) => (
              <tr key={r.id}>
                <td>{r.patient_name}</td>
                <td>{r.blood_group}</td>
                <td>{r.units}</td>
                <td>{r.hospital}</td>
                <td>
                  <span className={`status ${r.status}`}>
                    {r.status}
                  </span>
                </td>
                <td>
                  {r.status === "pending" && (
                    <button
                      className="btn btn-success"
                      disabled={loading}
                      onClick={() => updateStatus(r.id, "fulfilled")}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
