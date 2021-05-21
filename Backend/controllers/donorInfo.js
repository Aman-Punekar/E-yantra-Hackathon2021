// Controllers require only the model
const Donor = require("../models/Donor");

const addDonorInfo = (req, res) => {
  const newUser = new Donor({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    gender: req.body.gender,
    mobileNo: req.body.mobileNo,
    alternateNo: req.body.alternateNo,
    address: {
      lane: req.body.address.lane,
      city: req.body.address.city,
      district: req.body.address.district,
      state: req.body.address.state,
      pinCode: req.body.address.pinCode,
    },

    bloodGroup: req.body.bloodGroup,
    isAvailable: true,
  });

  newUser
    .save()
    .then((user) => {
      console.log(user);
      res.status(200).send({ msg: "User created Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        err: "Not able to save user in DB",
      });
    });
};

const updateDonorInfo = (req, res) => {
  Donor.updateOne(
    { mobileNo: req.uniqueMobileNo },
    {
      $set: req.body,
    }
  )
    .then((user) => {
      // console.log(user);
      res.status(200).send({ msg: "Update Successful" });
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).send({
        err: err,
        msg: "No able to update",
      });
    });
};

module.exports = { addDonorInfo, updateDonorInfo };
