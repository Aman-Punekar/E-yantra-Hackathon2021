// Controllers require only the model
const Patient = require("../models/Patient");

const patientInfo = (req, res) => {
  const patient = new Patient({
    patientName: req.body.patientName,
    relativeName: req.body.relativeName,
    patientAge: req.body.patientAge,
    patientGender: req.body.patientGender,
    relativeMobileNo: req.body.relativeMobileNo,
    relativeAlternateNo: req.body.relativeAlternateNo,
    patientAddress: {
      lane: req.body.address.lane,
      city: req.body.address.city,
      district: req.body.address.district,
      state: req.body.address.state,
      pinCode: req.body.address.pinCode,
    },
    patientBloodGroup: req.body.patientBloodGroup,
  });

  const patient = new patient(req.body);
  patient
    .save()
    .then((item) => {
      res.send("patient saved to database");
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
};

module.exports = { patientInfo };
