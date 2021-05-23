const Donor = require("../models/Donor");

const addDonorInfo = (req, res) => {
  const newUser = new Donor({
    firstName: req.body.firstName.toLowerCase(),
    lastName: req.body.lastName.toLowerCase(),
    age: req.body.age,
    gender: req.body.gender.toLowerCase(),
    mobileNo: req.body.mobileNo,
    alternateNo: req.body.alternateNo,
    address: {
      lane: req.body.address.lane.toLowerCase(),
      city: req.body.address.city.toLowerCase(),
      district: req.body.address.district.toLowerCase(),
      state: req.body.address.state.toLowerCase(),
      pinCode: req.body.address.pinCode,
    },

    bloodGroup: req.body.bloodGroup.toLowerCase(),
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
      firstName: req.body.firstName.toLowerCase(),
      lastName: req.body.lastName.toLowerCase(),
      age: req.body.age,
      gender: req.body.gender.toLowerCase(),
      mobileNo: req.body.mobileNo,
      alternateNo: req.body.alternateNo,
      address: {
        lane: req.body.address.lane.toLowerCase(),
        city: req.body.address.city.toLowerCase(),
        district: req.body.address.district.toLowerCase(),
        state: req.body.address.state.toLowerCase(),
        pinCode: req.body.address.pinCode,
      },

      bloodGroup: req.body.bloodGroup.toLowerCase(),
      isAvailable: req.body.isAvailable,
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
