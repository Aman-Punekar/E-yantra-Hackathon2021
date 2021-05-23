// routes require only express and Router
const express = require("express");
const router = express.Router();
const { addDonorInfo, updateDonorInfo } = require("../controllers/donorInfo");
const authenticateUser = require("./authMiddlewares").authenticateUser;

router.post("/postDonorInfo", authenticateUser, addDonorInfo);
router.post("/updateDonorInfo", authenticateUser, updateDonorInfo);

module.exports = router;
