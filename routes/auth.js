const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// User Model
const User = require("../models/user-model");

const router = express.Router();

// Get route for auth page
router.get("/", (req, res) => {
    res.render("auth");
});

// Post route for login form
router.post("/login", (req, res, next) => {
    // console.log(req.body);
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth"
    })(req, res, next);
});

// Post route for signup form
router.post("/signup", (req, res) => {
    // console.log(req.body);
    const { name, email, password, password2, college, phone } = req.body;
    
    if (password !== password2) {
        return res.json({ error: "Passwords don't match" });
    }

    // Check if user already present
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.json({ error: "Email already registered" });
            }
            const newUser = new User({
                name,
                email,
                password,
                college,
                phone
            });

            // Hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        // throw err;
                        console.log(err.message);
                        
                    }
                    //  Set password to hashed
                    newUser.password = hash;
                    // Saving new user
                    newUser
                        .save()
                        .then(user => {
                            // res.json({
                            //     msg:
                            //         "Successfully registered. Now you can login"
                            // });
                            res.redirect("/auth");
                        })
                        .catch(err => {
                            console.log("Error saving to db: " + err);
                        });
                });
            });
        })
        .catch(err => {
            console.log("Error finding user in db: " + err);
        });
});

module.exports = router;
