const mongoose = require("mongoose");
const Bid = require("../models/Bid");
const Gig = require("../models/Gig");
const { getIO } = require("../config/socket");

/**
 * Submit Bid
 */
const submitBid = async (req, res) => {
  const bid = await Bid.create({
    ...req.body,
    freelancerId: req.user.id
  });
  res.json(bid);
};

/**
 * View Bids (Owner only should be enforced in prod)
 */
const getBidsForGig = async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId });
  res.json(bids);
};

/**
 * BONUS 1: TRANSACTION + RACE-CONDITION SAFE HIRING
 * BONUS 2: REAL-TIME SOCKET NOTIFICATION
 */
const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId).session(session);

    const gig = await Gig.findOneAndUpdate(
      { _id: bid.gigId, status: "open" },
      { status: "assigned" },
      { new: true, session }
    );

    if (!gig) throw new Error("Gig already assigned");

    await Bid.updateOne(
      { _id: bid._id },
      { status: "hired" },
      { session }
    );

    await Bid.updateMany(
      { gigId: bid.gigId, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();

    // 🔔 Socket notification
    getIO()
      .to(bid.freelancerId.toString())
      .emit("hired", {
        message: `You have been hired for this project!`
      });

    res.json({ success: true });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = {
  submitBid,
  getBidsForGig,
  hireBid
};
