// routes require only express and Router
const express = require("express");
const router = express.Router();
const {addDonorInfo} = require('../controllers/donorInfo');
const {authenticateUser} = require('./authMiddlewares');



router.post('/post',authenticateUser, addDonorInfo);

module.exports = router;