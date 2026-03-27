import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./db.js";
import donorRoutes from "./routes/donorRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";

dotenv.config();

const app = express();

/* DATABASE */
connectDB();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ✅ ADD ROUTES FIRST */
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Blood Donation Backend is running 🚀",
  });
});

/* API ROUTES */
app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);

/* PORT */
const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;