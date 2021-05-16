const User = require("../models/user");

exports.getUserById =   (req, res,next,id) => {
    //mongo function (db call back will return error and object)
    User.findById(id).exec((err,user)=> {
        if(err || !user){
            return res.status(400).json({
                error: "No user was found in DB"
            });
        }
        req.profile = user;
        next();
    });
};

//grab a user
exports.getUser =   (req, res) => {
   // req.profile.salt=""
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile)
}

exports.updateUser=   (req, res) => {
    User.findByIdAndUpdate(
        //we are updating id
        {_id: req.profile._id},
        //by setting it from the frontend
        {$set: req.body},
        //docs
        {new: true, useFindAndModify:false},
        (err,user)=>{
            if(err){
                return res.status(400).json({
                    error: "Not Authorised to update the information"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
    );
};



exports.userPurchaseList = (req, res) => {
    Order.find({ user: req.profile._id })
      .populate("user", "_id name")
      .exec((err, order) => {
        if (err) {
          return res.status(400).json({
            error: "No Order in this account"
          });
        }
        return res.json(order);
      });
  };

// to get all users

//exports.getAllUser =   (req, res) => {
//     User.find().exec((err,user)=>{
//         if(err || !user){
//             return res.status(400).json({
//                 error: "No users found"
//             });
//         }
//         res.json(user);
//     })
//  }