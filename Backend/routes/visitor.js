const express = require("express");
const router = express.Router();
const { donorQuerry } = require("../controllers/visitor");

router.post("/visitorQerryOfDonor", donorQuerry);

module.exports = router;
