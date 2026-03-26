import express from "express";
import fetch from "node-fetch";

const router = express.Router();

/* =========================================================
   GOOGLE SHEET (Form Responses 1)
========================================================= */
const SHEET_URL =
  "https://opensheet.elk.sh/1_YW7iPhVGGvdctclw_5jl4xbrQg8EK-WZ1rwuGDDSCY/Form%20Responses%201";

/* =========================================================
   GET ALL DONORS (LIVE FROM GOOGLE SHEET)
========================================================= */
router.get("/", async (req, res) => {
  try {
    const response = await fetch(SHEET_URL);
    const sheetData = await response.json();

    if (!Array.isArray(sheetData)) {
      return res.json([]);
    }

    const donors = sheetData
      .filter((row) => {
        const key = Object.keys(row).find((k) =>
          k.toLowerCase().includes("donor or requesting")
        );

        if (!key) return false;

        return row[key]?.toLowerCase().includes("donate");
      })
      .map((row, index) => {
        const find = (text) =>
          row[
            Object.keys(row).find((k) =>
              k.toLowerCase().includes(text)
            )
          ] || "";

        return {
          id: index + 1,
          name: find("full name"),
          blood_group: find("blood group"),
          phone: find("mobile"),
          city: find("city"),
          timestamp: find("timestamp"),
        };
      });

    res.status(200).json(donors);
  } catch (err) {
    console.error("GOOGLE SHEET FETCH ERROR:", err);
    res.status(500).json({ error: "Failed to fetch donors" });
  }
});

export default router;
