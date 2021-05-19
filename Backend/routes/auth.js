const express = require("express");
const router = express.Router();
const { sendOtp,
        verifyOtp,
        donorLogin,
        logout
      } = require('../controllers/auth');

const isMember = require('./authMiddlewares').isMemeber;



router.post('/sendOTP',isMember, sendOtp );
router.post('/verifyOTP', verifyOtp );
router.post('/donorLogin', donorLogin);
router.get('/logout', logout);


module.exports = router;




















