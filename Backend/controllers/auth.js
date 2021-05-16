//name the same name whatever the model is named with.

const User = require("../models/user");
const { check, validationResult } = require('express-validator');
//const { body, validationResult } = require('express-validator');


//json web token  
var jwt = require('jsonwebtoken');
//autenticate http requests using jwt (judge a use autenticated or not)
var expressJwt = require('express-jwt');


exports.signup =   (req, res) => {
  //signup work 
  //res.json({
  // message "signup works "});  
  
  //body parser middleware
  //console.log("req body",req.body)

  //binding up -express validator
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    // 422 - 422 Unprocessable Entity response status code 
   return res.status(422).json({
     error : errors.array()[0].msg
    // error : errors.array()[0].param

   });
  }
  //create a new object
  const user = new User(req.body);
  //two variablle
  user.save((err,user)=>{
    //if errors
    if(err)
    {
      // bad requests
      return res.status(400).json({
        err:"Not able to save user in DB"
      });
    }
    //returning few info

    //entire info
    //res.json(user)
    res.json({
     id: user._id, 
     email: user.email,
     name: user.name,
      });
    });
  };



exports.signin =  (req, res) => {
//destructuring 
const errors = validationResult(req); 
const { email, password} = req.body ; //email and password is extracted
  
//validation is similar like the signup
if(!errors.isEmpty()){
  return res.status(422).json({
    error : errors.array()[0].msg
  });
 }

 //database helpus to find the first one and pass a property to find 
User.findOne({email},(err,user)=> {
  if(err || !user){
    // 400 bad requests 
    return res.status(400).json({
      error:"User email doesn't exits"
    });
  }

  if (!user.autheticate(password)){
    return res.status(401).json({
      error: "email and password doesnt match"
    });
  }
  //create token using sign method
  const token = jwt.sign({_id: user.id}, process.env.SECRET)
  //put token in cookie 
  res.cookie("token", token,{expire: new Date() + 9999});

  //send response to front end
  const {_id,name ,email ,role } = user;
  return res.json({token, user: {_id, name, email, role} });
  });
};



exports.signout = (req, res) => {
  //clear the cookies
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};


//protected route 
//chehker for token
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  // autentication
  userProperty: "auth"
});



//custom middleware 
exports.isAuthenticated = (req, res, next) => {
  // var checker (frontend) re.auth by top middleware and profile - auth are equal then they can are correct
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied"
    });
  }
  next();
};
