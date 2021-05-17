// Controllers require only the model
const Donor = require("../models/Donor");

const addDonorInfo = (req,res,) =>{
    const newUser = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        age: req.body.age,
        gender: req.body.gender,
        mobileNo: req.body.mobileNo,
        alternateNo: req.body.alternateNo,
        address:{
            lane: req.body.lane,
            city: req.body.city,
            district: req.body.district,
            state: req.body.state,
            pincode: req.body.pincode        
            
        },
        bloodGroup = req.body.bloodGroup,
        profile:req.file.filename  
    })

    newUser.save()
       .then((user) => {
           res.status(200).send({msg: 'User created Successfully'});
       })
       .catch((err) => {
        res.status(400).send({
            err:"Not able to save user in DB"
          });
       })
       
}

module.exports = {addDonorInfo};