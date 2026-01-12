const Gig = require("../models/Gig");

const getGigs = async (req, res) => {
  const search = req.query.search || "";
  const gigs = await Gig.find({
    status: "open",
    title: { $regex: search, $options: "i" }
  });
  res.json(gigs);
};

const createGig = async (req, res) => {
  const gig = await Gig.create({
    ...req.body,
    ownerId: req.user.id
  });
  res.json(gig);
};

module.exports = { getGigs, createGig };
