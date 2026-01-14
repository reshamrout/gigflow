
const express = require("express");
const { getGigs, createGig, getGigById } = require("../controllers/gig.controller");
const { auth } = require("../middleware/auth.middleware");

const router = express.Router();
router.get("/", getGigs);
router.post("/", auth, createGig);
router.get("/:id",getGigById);

module.exports = router;
