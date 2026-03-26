import mongoose from "mongoose";

const requestSchema = new mongoose.Schema(
  {
    patient_name: String,
    phone: String,
    blood_group: String,
    city: String,
    units: Number,
    hospital: String,
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Approved", "Rejected"],
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);

/* ================= CREATE REQUEST ================= */
export const createRequest = async (data) => {
  const newRequest = new Request(data);
  return await newRequest.save();
};

/* ================= GET ALL REQUESTS ================= */
export const getAllRequests = async () => {
  return await Request.find().sort({ createdAt: -1 });
};

/* ================= GET REQUEST BY ID ================= */
export const getRequestById = async (id) => {
  return await Request.findById(id);
};

/* ================= UPDATE STATUS ================= */
export const updateRequestStatus = async (id, status) => {
  return await Request.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
};