import React from "react";

export default function BloodForm() {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#b91c1c" }}>
        🩸 Blood Donation Form
      </h2>

      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSfm6ibLCxho95Xju-XmbvJY9zSpdyRVORQvwy07bX5GBr1hIA/viewform?embedded=true"
        width="100%"
        height="900"
        style={{ border: "none" }}
        title="Blood Donation Google Form"
      >
        Loading…
      </iframe>
    </div>
  );
}
