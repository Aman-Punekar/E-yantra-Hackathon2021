const express = require("express");
const router = express.Router();
const { sendOtp,
        verifyOtp,
        refresh,
        logout
      } = require('../controllers/auth');

router.post('/sendOTP', sendOtp );
router.post('/verifyOTP', verifyOtp );
router.post('/refresh', refresh );
router.get('/logout', logout);


module.exports = router;




















