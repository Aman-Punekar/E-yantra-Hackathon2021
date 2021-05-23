require("dotenv").config();
const Donor = require("../models/Donor");
const jwt = require("jsonwebtoken");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

const authenticateUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
    if (phone) {
      req.uniqueMobileNo = phone.mobileNo;

      next();
    } else if (err.message === "TokenExpiredError") {
      return res
        .status(403)
        .send({ success: false, msg: "Access Token Expired" });
    } else {
      console.error(err);
      res.status(403).send({ err, msg: "User Not Authenticated" });
    }
  });
};

const isMemeber = (req, res, next) => {
  console.log(req.body.phone);

  Donor.find({ mobileNo: req.body.phone })
    .then((result) => {
      console.log(result);
      if (result.length !== 0) {
        res
          .status(409)
          .send({ msg: `${req.body.phone} already have an account` });
      } else {
        next();
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
};

module.exports = {
  authenticateUser,
  isMemeber,
};
