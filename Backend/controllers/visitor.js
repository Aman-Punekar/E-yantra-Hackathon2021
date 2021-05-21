const Donor = require("../models/Donor");

const donorQuerry = (req, res) => {
  Donor.find(
    {
      $and: [
        { 
          city: req.body.city 
        },
        {
          isAvailable: true,
        },
        {
          bloodGroup: req.body.bloodGroup,
        }
      ],
    },
    {
      firstName: 1,
      lastName: 1,
      mobileNo: 1,
      alternateNo: 1,
      address: {
        city: 1,
        district: 1,
      },
      _id: 0,
    }
  )
    .limit(50)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = { donorQuerry };
