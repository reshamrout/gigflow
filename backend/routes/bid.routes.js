const express = require("express");
const { getGigs, createGig } = require("../controllers/gig.controller");
const { auth } = require("../middleware/auth.middleware");

const router = express.Router();
router.get("/", getGigs);
router.post("/", auth, createGig);

module.exports = router;
