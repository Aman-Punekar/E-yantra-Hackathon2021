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
      city: req.body.address.city.toLowerCase(),
      district: req.body.address.district,
      state: req.body.address.state,
      pinCode: req.body.address.pinCode,
    },

    bloodGroup: req.body.bloodGroup.toLowerCase(),
    isAvailable: true,
  });

  newUser
    .save()
    .then((user) => {
      res.status(200).send({ msg: "User created Successfully" });
    })
    .catch((err) => {
      res.status(400).send({
        err: "Not able to save user in DB",
      });
    });
};

const updateDonorInfo = (req, res) => {
  Donor.updateOne(
    { mobileNo: req.uniqueMobileNo },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      gender: req.body.gender,
      mobileNo: req.body.mobileNo,
      alternateNo: req.body.alternateNo,
      address: {
        lane: req.body.address.lane,
        city: req.body.address.city.toLowerCase(),
        district: req.body.address.district,
        state: req.body.address.state,
        pinCode: req.body.address.pinCode,
      },

      bloodGroup: req.body.bloodGroup.toLowerCase(),
      isAvailable: req.body.isAvailable,
    }
  )
    .then((user) => {
      res.status(200).send({ msg: "Update Successful" });
    })
    .catch((err) => {
      res.status(400).send({
        err: err,
        msg: "No able to update",
      });
    });
};

const getDonorInfo = async (req, res) => {
  try {
    const donorInfo = await Donor.findOne({ mobileNo: req.uniqueMobileNo });
    res.status(200).send(donorInfo);
  } catch (err) {
    res.status(400).send({
      err: err,
    });
  }
};

module.exports = { addDonorInfo, updateDonorInfo, getDonorInfo };
