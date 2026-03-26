import Donor from "../models/Donor.js";

export const getDonors = async (req, res) => {
  const donors = await Donor.find();
  res.json(donors);
};

export const createDonor = async (req, res) => {
  const donor = new Donor(req.body);
  await donor.save();
  res.json(donor);
};