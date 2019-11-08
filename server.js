const express = require("express");
const path = require("path");
const app = express();
const passport = require("passport");

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

// Get route for index page
app.get("/", (req, res) => {
    res.render("index");
});

// Get route for gallery page
app.get("/gallery", (req, res) => {
    res.render("gallery");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.use("/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
