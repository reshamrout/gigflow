const Gig = require("../models/Gig");

const getGigs = async (req, res) => {
  const search = req.query.search || "";
  const gigs = await Gig.find({
    status: "open",
    title: { $regex: search, $options: "i" }
  });
  res.json(gigs);
};

const getGigById = async (req, res) => {
  const gig = await Gig.findById(req.params.id);

  if (!gig) {
    return res.status(404).json({ message: "Gig not found" });
  }

  res.status(200).json(gig);
};


const createGig = async (req, res) => {
  const gig = await Gig.create({
    ...req.body,
    ownerId: req.user.id
  });
  res.json(gig);
};

module.exports = { getGigs, createGig, getGigById };
