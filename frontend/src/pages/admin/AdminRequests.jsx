import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/index.css";

export default function AdminRequests() {
  const [requests, setRequests] = useState([]);
  const [matchedDonors, setMatchedDonors] = useState([]);
  const [loadingMatch, setLoadingMatch] = useState(false);

  /* ================= LOAD REQUESTS ================= */
  const loadRequests = async () => {
    try {
      const res = await API.get("/api/requests");
      setRequests(res.data);
    } catch (err) {
      console.error("LOAD REQUEST ERROR:", err);
      alert("Failed to load requests");
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    try {
      await API.put(`/api/requests/${id}/status`, { status });
      loadRequests();
    } catch (err) {
      console.error("STATUS UPDATE ERROR:", err);
      alert("Failed to update status");
    }
  };

  /* ================= SEND WHATSAPP ================= */
  const sendWhatsApp = (phone, message) => {
    if (!phone) {
      alert("Phone number not found");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      alert("Invalid phone number");
      return;
    }

    const url = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  /* ================= MATCH DONORS ================= */
  const loadMatchedDonors = async (requestId) => {
    setLoadingMatch(true);
    setMatchedDonors([]);

    try {
      const res = await API.get(
        `/api/requests/${requestId}/match-donors`
      );
      setMatchedDonors(res.data);
    } catch (err) {
      console.error("MATCH ERROR:", err);
      alert("Failed to match donors");
    } finally {
      setLoadingMatch(false);
    }
  };

  return (
    <div className="container card">
      <h2>🧑‍💼 Admin – Blood Requests</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Blood</th>
            <th>Units</th>
            <th>Hospital</th>
            <th>Status</th>
            <th>Actions</th>
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
                  <span className={`status-badge ${r.status?.toLowerCase()}`}>
                    {r.status}
                  </span>
                </td>
                <td>
                  {r.status === "Pending" && (
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          updateStatus(r.id, "Approved");
                          sendWhatsApp(
                            r.phone,
                            `Hello ${r.patient_name},\n\n✅ Your blood request has been APPROVED.\n\n🩸 ${r.blood_group}\n🏥 ${r.hospital}\n\nBlood Donation System ❤️`
                          );
                        }}
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          updateStatus(r.id, "Rejected");
                          sendWhatsApp(
                            r.phone,
                            `Hello ${r.patient_name},\n\n❌ Your blood request was rejected.\n\nBlood Donation System`
                          );
                        }}
                      >
                        Reject
                      </button>

                      <button
                        className="btn"
                        onClick={() => loadMatchedDonors(r.id)}
                      >
                        Match Donors
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ================= MATCHED DONORS ================= */}
      <div style={{ marginTop: 30 }}>
        <h3>🧬 Matched Donors</h3>

        {loadingMatch ? (
          <p>Matching donors...</p>
        ) : matchedDonors.length === 0 ? (
          <p>No matched donors</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Blood</th>
                <th>Phone</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {matchedDonors.map((d) => (
                <tr key={d.id}>
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
