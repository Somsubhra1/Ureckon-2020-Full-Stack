const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const { ensureAuthenticated } = require("../strategy/auth");

// Event Model
const User = require("../models/event-model");

const router = express.Router();

// Get route for events page
router.get("/", (req, res) => {
    res.render("events");
});

module.exports = router;
