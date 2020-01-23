const express = require("express");
const path = require("path");
const app = express();
const passport = require("passport");
const mongoose = require("mongoose");

// Passport config
require("./strategy/passport")(passport);

// Set view engine
app.set("view engine", "ejs");

// Express BodyParser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static files middleware:
app.use(express.static(path.join(__dirname, "/public")));

// Connection to MongoDB
mongoose
    .connect(
        "mongodb+srv://ureckon:b+qddHS2SgBt-*g@cluster0-g5yjl.mongodb.net/test?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log(err));

// Get route for index page
app.get("/", (req, res) => {
    res.render("index");
});

// Get route for gallery page
app.get("/gallery", (req, res) => {
    res.render("gallery");
});

// Get route for about page
app.get("/about", (req, res) => {
    res.render("about");
});

// Get route for sponsors page
app.get("/sponsors", (req, res) => {
    res.render("sponsors");
});

// Get route for team page
app.get("/team", (req, res) => {
    res.render("team");
});

// Auth page route
app.use("/auth", require("./routes/auth"));

// Events page route
app.use("/events", require("./routes/events"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
