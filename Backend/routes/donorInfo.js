// routes require only express and Router
const express = require("express");
const router = express.Router();
const {addDonorInfo} = require('../controllers/donorInfo');



router.post('/post', addDonorInfo);

module.exports = router;