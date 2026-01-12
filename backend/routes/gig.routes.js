const express = require("express");
const {
  submitBid,
  getBidsForGig,
  hireBid
} = require("../controllers/bid.controller");
const { auth } = require("../middleware/auth.middleware");

const router = express.Router();
router.post("/", auth, submitBid);
router.get("/:gigId", auth, getBidsForGig);
router.patch("/:bidId/hire", auth, hireBid);

module.exports = router;
