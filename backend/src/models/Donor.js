import db from "../config/db.js";

/* ===============================
   DONOR MODEL (SQL)
================================ */

/* ADD DONOR */
export const createDonor = async (donor) => {
  const { name, blood_group, age, phone, city } = donor;

  const [result] = await db.query(
    `INSERT INTO donors (name, blood_group, age, phone, city)
     VALUES (?, ?, ?, ?, ?)`,
    [name, blood_group, age, phone, city]
  );

  return result;
};

/* GET ALL DONORS */
export const getAllDonors = async () => {
  try{
  const [rows] = await db.query("SELECT * FROM donors");
  return rows;
} catch (err) {
  console.error("MYSQL ERROR:", err);
  throw err;
}
};

/* GET DONOR BY ID */
export const getDonorById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM donors WHERE id = ?",
    [id]
  );
  return rows[0];
};

/* DELETE DONOR */
export const deleteDonor = async (id) => {
  const [result] = await db.query(
    "DELETE FROM donors WHERE id = ?",
    [id]
  );
  return result;
};
