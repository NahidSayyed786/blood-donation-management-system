import express from "express";
import {
  createRequest,
  getAllRequests,
  getRequestById,
  updateRequestStatus,
} from "../models/Request.js";
import { getAllDonors } from "../models/Donor.js";

const router = express.Router();

/* ================= CREATE BLOOD REQUEST ================= */
router.post("/add", async (req, res) => {
  try {
    const {
      patient_name,
      phone,
      blood_group,
      units,
      hospital,
      city,
    } = req.body;

    if (
      !patient_name?.trim() ||
      !phone?.trim() ||
      !blood_group?.trim() ||
      !hospital?.trim() ||
      !units ||
      units <= 0
    ) {
      return res.status(400).json({
        error: "All required fields must be filled",
      });
    }

    await createRequest({
      patient_name: patient_name.trim(),
      phone: phone.trim(),
      blood_group: blood_group.trim(),
      units: Number(units),
      hospital: hospital.trim(),
      city: city || null,
      status: "Pending",
    });

    res.status(201).json({
      message: "✅ Request submitted successfully",
    });
  } catch (err) {
    console.error("REQUEST ADD ERROR:", err);
    res.status(500).json({ error: "Failed to submit request" });
  }
});

/* ================= LIST REQUESTS ================= */
router.get("/", async (req, res) => {
  try {
    const requests = await getAllRequests();
    res.status(200).json(requests);
  } catch (err) {
    console.error("REQUEST LIST ERROR:", err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
});

/* ================= UPDATE REQUEST STATUS ================= */
router.put("/:id/status", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid request ID" });
    }

    // ✅ FINAL STATUS VALUES
    const allowedStatus = ["Pending", "Approved", "Rejected"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const request = await getRequestById(id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    await updateRequestStatus(id, status);

    res.json({ message: "✅ Status updated successfully" });
  } catch (err) {
    console.error("STATUS UPDATE ERROR:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});

/* ================= MATCH DONORS ================= */
router.get("/:id/match-donors", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid request ID" });
    }

    const request = await getRequestById(id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    const compatibility = {
      "O-": ["O-"],
      "O+": ["O+", "O-"],
      "A-": ["A-", "O-"],
      "A+": ["A+", "A-", "O+", "O-"],
      "B-": ["B-", "O-"],
      "B+": ["B+", "B-", "O+", "O-"],
      "AB-": ["AB-", "A-", "B-", "O-"],
      "AB+": ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"],
    };

    const allowedGroups = compatibility[request.blood_group] || [];
    const donors = await getAllDonors();

    const matchedDonors = donors.filter((d) =>
      allowedGroups.includes(d.blood_group)
    );

    res.json(matchedDonors);
  } catch (err) {
    console.error("MATCH ERROR:", err);
    res.status(500).json({ error: "Failed to match donors" });
  }
});

export default router;
