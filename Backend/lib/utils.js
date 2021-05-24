const donorCredentials = require("../models/donorCredentials");
const crypto = require("crypto");
const Donor = require("../models/Donor");
const ACCOUNT_SID = "ACe76bd995e206ab993cdbe06d22004e73";
const AUTH_TOKEN = "796ec1d88e088c5e177594f5e73ba789";
const smsKey = process.env.SMS_SECRET_KEY;
const client = require("twilio")(ACCOUNT_SID, AUTH_TOKEN); // configuring twilio

const deleteForgottenPassword = async (phone) => {
  try{
      let result = await donorCredentials.deleteOne({mobileNo:phone});
      return result.n;
  }catch(err){
    res.status(500).send({err:err});
  }
}

const genPasswordHash = async (password, phone) =>{

  try{
    var salt = crypto.randomBytes(32).toString("hex");
    var genHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
  
    const newCredentials = new donorCredentials({
      mobileNo: phone,
      salt: salt,
      hash: genHash,
    });
  
    const credentials = await newCredentials.save()
    return;
  }catch(err){
    console.log(err);
    res.status(400).send({
      err: err,
      msg: "Could not save credentials due to some error",
    });
  }
  
  
};

function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
};

function genAndSendOtp(phone) {
  const phoneTwilio = phone.toString() + "+91";

  const otp = Math.floor(100000 + Math.random() * 900000); // generating otp
  const ttl = 30 * 60 * 1000;
  const expires = Date.now() + ttl; // expiry time
  const data = `${phone}.${otp}.${expires}`;
  const hash = crypto.createHmac("sha256", smsKey).update(data).digest("hex");
  const fullhash = `${hash}.${expires}`;

  // the following setup is the twilio configuration

  // client.messages
  // 	.create({
  // 		body: `your otp is ${otp}`,
  // 		from: '+14793455072',
  // 		to: phoneTwilio
  // 	})
  // 	.then((message) => console.log('Success'))
  // 	.catch((err) => console.log(err));

  return {
    phone,
    hash: fullhash,
    otp,
  };
};


async function getUser(phone) {
  try {
    const userInfo= await Donor.find({ mobileNo: phone });
    console.log(userInfo[0]);
    // let data = userInfo[0];
    return userInfo[0] ;
  }
  catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

module.exports = { genPasswordHash, validPassword, genAndSendOtp, getUser, deleteForgottenPassword };
