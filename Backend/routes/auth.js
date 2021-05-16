const express = require("express");
var router = express.Router();

//express valaditor
const { check, validationResult } = require('express-validator');

//If exports of controller are not default and import it using {}
const {signin} = require("../controllers/auth");
const {signup} = require("../controllers/auth");
const {signout,isSignedIn} = require("../controllers/auth");

 


//validator is added between route and controller
router.post("/signup",
[
    check("name").isLength({min: 3 }).withMessage("Name should be atleast 3 character"),
    check("email").isEmail().withMessage("valid email is required"),
    //check("email","valid email is required").isEmail(),
    check("password","password with minimum 5 char is required").isLength({min: 5 })
],
signup);


//signin route
router.post("/signin",
    [
    // check("email","valid email is required").isEmail(),
    check("email").isEmail().withMessage("valid email is required"),
    check("password","password is required").isLength({min: 5 })
    ],
    signin
);

router.get("/signout",signout);

// router.get("/testroute",isSignedIn, (req, res) => {
//     res.json(req.auth);
//   });


//Export router instead of variable name.
module.exports = router;